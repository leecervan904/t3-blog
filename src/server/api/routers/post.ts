import { z } from 'zod'
import { type Prisma } from '@prisma/client'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { BasePageInfo, BaseFilterInfo, BaseOrderInfo, BaseQueryDto } from '~/server/api/inputs'
import dayjs from 'dayjs'
import { fillOverDaysData } from '~/util'

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

      return ctx.db.post.findMany({
        where: {
          id: { in: ids }
        },
        include: {
          user: true,
          categories: true,
          tags: true,
        }
      })

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
          DATE_FORMAT( createdAt, '%Y-%m-%d' ) AS postDate,
          COUNT(*) AS postCount
        FROM Post
        WHERE
          createdAt >= DATE_SUB( CURDATE(), INTERVAL 7 DAY )
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
        dailyPosts: fillOverDaysData(dailyPosts.map(v => ({ date: v.postDate, count: Number(v.postCount) })), 7),
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
