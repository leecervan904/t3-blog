## 查询

### groupBy

Prisma 对于 `groupBy` 的支持不够好（甚至没有 TypeORM 支持度那么广），太部分情况下需要依赖 `db.$queryRaw(sql)` 去查询。


#### Demo1

示例：查询统计最近一周中每天创建的 post 的数量，根据 `createAt` 字段分组。（以今天日期是 '2024-01-11' 为例）

方法一：
```sql
SELECT
  DATE_FORMAT( createdAt, '%Y-%m-%d' ) AS postDate,
  COUNT(*) AS postCount
FROM Post
WHERE
  createdAt >= DATE_SUB( CURDATE(), INTERVAL 7 DAY )
GROUP BY postDate
ORDER BY postDate;

-- 查询结果
-- postDate  postDate
-- 2024-01-07	1
-- 2024-01-09	5
-- 2024-01-10	1
```

明显，上述查询忽略了部分日期 - “没有创建 post 的日期”。


方法二：
```sql
SELECT
  DATE_FORMAT(date_range.date, '%Y-%m-%d') AS postDate,
  COALESCE(COUNT(Post.id), 0) AS postCount
FROM (
  SELECT
    DATE_ADD(CURDATE(), INTERVAL -6 DAY) AS date
  UNION ALL
  SELECT
    DATE_ADD(CURDATE(), INTERVAL -5 DAY) AS date
  UNION ALL
  SELECT
    DATE_ADD(CURDATE(), INTERVAL -4 DAY) AS date
  UNION ALL
  SELECT
    DATE_ADD(CURDATE(), INTERVAL -3 DAY) AS date
  UNION ALL
  SELECT
    DATE_ADD(CURDATE(), INTERVAL -2 DAY) AS date
  UNION ALL
  SELECT
    DATE_ADD(CURDATE(), INTERVAL -1 DAY) AS date
  UNION ALL
  SELECT
    CURDATE() AS date
) AS date_range
LEFT JOIN Post ON DATE_FORMAT(Post.createdAt, '%Y-%m-%d') = date_range.date
GROUP BY postDate
ORDER BY postDate;


-- 查询结果
-- postDate  postDate
-- 2024-01-05	0
-- 2024-01-06	0
-- 2024-01-07	1
-- 2024-01-08	0
-- 2024-01-09	5
-- 2024-01-10	1
-- 2024-01-11	0
```
f
使用一个子表来临时存储数据，其中使用了 `UNION ALL`, `DATE_ADD()`, `DATE_FORMAT()` 等平时没用过的语法。在平时编写代码中，如将一周改为一个月，那么 SQL 语句会很长，可以讲重复部分语句使用字符串拼接起来，但是要使用 `$queryRawUnsafe()` 这个方法，需要自行规避 SQL 注入的风险。
```ts
export function genSQLLatestDayRange(latest: number) {
  return new Array(latest)
    .fill(0)
    .map((_, i) => `SELECT DATE_ADD(CURDATE(), INTERVAL -${i} DAY) AS date`)
    .join('UNION ALL')
}

const sql = `
SELECT
  DATE_FORMAT(date_range.date, '%Y-%m-%d') AS postDate,
  COALESCE(COUNT(Post.id), 0) AS postCount
FROM (
  ${genSQLLatestDayRange(30)}
) AS date_range
LEFT JOIN Post ON DATE_FORMAT(Post.createdAt, '%Y-%m-%d') = date_range.date
GROUP BY postDate
ORDER BY postDate;
`
```

> 在使用方法二时，ChatGPT 一开始给出的是临时表的方法，但是只要将临时表作为子表查询也能正常运行。回想一下 sql 引擎的优化器是会自行选择优化方案，来决定是否使用临时表来存储查询结果，这也就说得过去了。
