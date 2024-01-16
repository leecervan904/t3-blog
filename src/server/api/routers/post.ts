import { z } from 'zod'
import { type Prisma } from '@prisma/client'
import { remark } from 'remark'
import headings, { type HeadingItem } from '@sveltinio/remark-headings'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { BasePageInfo, BaseFilterInfo, BaseOrderInfo, BaseQueryDto } from '~/server/api/inputs'

const generateToc = (rawMarkdown: string) => {
  return new Promise(resolve => {
    remark()
      .use(headings)
      .process(rawMarkdown)
      .then(res => {
        resolve(res)
      })
      .catch(console.log)
  })
}

// mapped to prisma's schema
export const CreatePostDto = z.object({
  title: z.string().min(1),
  abstract: z.optional(z.string()).default(''),
  content: z.string().min(1),
  categoryIds: z.optional(z.array(z.number())).default([]),
  tagIds: z.optional(z.array(z.number())).default([]),
  published: z.optional(z.boolean()).default(false),
})

export const UpdatePostDto = CreatePostDto
  .partial()
  .merge(z.object({ id: z.number() }))

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreatePostDto)
    .mutation(async ({ ctx, input }) => {
      const { title, abstract, content, categoryIds, tagIds, published } = input

      const superAdmin = await ctx.db.user.findFirst({
        where: {
          role: 'SUPER_ADMIN'
        },
      })

      return ctx.db.post.create({
        data: {
          title,
          abstract,
          published,
          content,
          userId: superAdmin!.id,
          categories: {
            connect: categoryIds.map(id => ({ id }))
          },
          tags: {
            connect: tagIds.map(id => ({ id }))
          },
        },
      });
    }),

  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input: id }) => {
      return ctx.db.post.delete({
        where: { id }
      })
    }),

  update: publicProcedure
    .input(UpdatePostDto)
    .mutation(async ({ ctx, input }) => {
      const { id, categoryIds = [], tagIds = [], ...post } = input

      return ctx.db.post.update({
        where: { id },
        data: {
          ...post,
          categories: {
            connect: categoryIds.map(id => ({ id })),
          },
          tags: {
            connect: tagIds.map(id => ({ id })),
          },
        },
      })
    }),

  find: publicProcedure
    .input(BaseQueryDto)
    .query(async ({ ctx, input }) => {
      const { ids, keywords } = input
      const where: Prisma.PostWhereInput = {}

      if (ids) {
        where.id = { in: ids }
      } else if (keywords) {
        where.title = {
          contains: keywords,
        }
      }

      const posts = await ctx.db.post.findMany({
        where: {
          id: { in: ids }
        },
        include: {
          user: true,
          categories: true,
          tags: true,
        }
      })

      const postsWithToc = await Promise.all(
        posts.map(async post => {
          const res = await generateToc(post.content)

          return {
            ...post,
            content: res.value as string,
            toc: res.data.fm.headings as HeadingItem[],
          }
        })
      )

      return postsWithToc

      // return {
      //   status: 'FAIL',
      //   message: '必须传入 ids 或 keywords 来查询 category',
      // }
    }),

  pages: publicProcedure
    .input(
      BasePageInfo
        .merge(BaseFilterInfo)
        .merge(BaseOrderInfo)
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, keywords, categoryIds } = input

      const where: Prisma.PostWhereInput = {}

      if (keywords) {
        where.title = {
          contains: keywords,
        }
      }

      if (categoryIds.length) {
        where.categories = {
          some: {
            id: { in: categoryIds }
          }
        }
      }

      return ctx.db.post.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
          tags: true,
          categories: true,
        }
      })
    }),

  getSummarize: publicProcedure
    .query(async ({ ctx }) => {
      const dailyPostsQuery = ctx.db.$queryRaw<Array<{ postDate: string, postCount: number }>>`
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
      `;

      const [postCount, categoryCount, dailyPosts] = await Promise.all([
        ctx.db.post.count(),
        ctx.db.category.count(),
        dailyPostsQuery,
      ])

      return {
        postCount,
        categoryCount,
        dailyPosts: dailyPosts.map(v => ({ date: v.postDate, count: Number(v.postCount) })),
      }
    }),

  hello: publicProcedure
    .input(z.object({
      text: z.string()
    }))
    .query(({ input }) => {
      const { text } = input

      return {
        status: 'ok',
        greeting: text,
      }
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
