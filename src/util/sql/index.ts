export function genSQLLatestDayRange(latest: number) {
  return new Array(latest)
    .fill(0)
    .map((_, i) => `SELECT DATE_ADD(CURDATE(), INTERVAL -${i} DAY) AS date`)
    .reverse()
    .join(' UNION ALL ')
}
