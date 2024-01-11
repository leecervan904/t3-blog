import z from 'zod'

import { createTRPCRouter, publicProcedure } from "../trpc";
import { BaseQueryDto } from '../inputs';
import { sleep } from '~/util';

export const CreateCategoryDto = z.object({
  name: z.string().min(1),
  slug: z.optional(z.string()),
})

export const UpdateCategoryDto = CreateCategoryDto
  .partial()
  .merge(z.object({ id: z.number() }))

export const categoryRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateCategoryDto)
    .mutation(async ({ ctx, input }) => {
      const { name, slug = name } = input

      return ctx.db.category.create({
        data: { name, slug }
      })
    }),

  find: publicProcedure
    .input(BaseQueryDto)
    .query(async ({ ctx, input }) => {
      const { ids, keywords } = input

      if (ids) {
        return ctx.db.category.findMany({
          where: { id: { in: ids } }
        })
      }

      if (keywords) {
        return ctx.db.category.findMany({
          where: {
            name: {
              contains: keywords,
            },
          }
        })
      }

      return {
        status: 'FAIL',
        message: '必须传入 ids 或 keywords 来查询 category',
      }
    }),

  findAll: publicProcedure
    .query(async ({ ctx, input }) => {
      return ctx.db.category.findMany({
        orderBy: {
          name: 'asc'
        }
      })
    }),

  update: publicProcedure
    .input(UpdateCategoryDto)
    .mutation(async ({ ctx, input }) => {
      const { id, name, slug } = input

      return ctx.db.category.update({
        where: { id },
        data: { name, slug }
      })
    }),

  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input: id }) => {
      return ctx.db.category.delete({
        where: { id }
      })
    })
})