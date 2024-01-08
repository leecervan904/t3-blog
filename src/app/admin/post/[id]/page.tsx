// 'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
// import { Icon } from '@iconify/react';

import { api } from "~/trpc/server"
import { MarkdownViewer } from "~/app/_components/markdown";

export default async function Page({ params }: { params: { id: string }}) {
  const { id } = params
  const post = await api.post.find.query({ id: +id })
  const { title, content, user, categories, tags, published, createdAt, updatedAt } = post!

  if (!categories.some(v => v.id === 0)) {
    categories.unshift({
      id: 0,
      name: '全部',
      slug: 'all',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  if (!tags.some(v => v.id === 0)) {
    tags.unshift({
      id: 0,
      name: '全部',
      slug: 'all',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  return (
    <div className="p-3">
      <h2 className="my-2 font-bold text-3xl text-blue-500 text-center">{title}</h2>

      <div className="my-2 flex justify-center gap-5 text-slate-500 text-sm">
        <span className="flex items-center justify-center gap-2 my-2 text-center">
          {/* <Icon icon="carbon:user-avatar" /> */}
          <span>{user?.name}</span>
        </span>

        <span className={`flex items-center justify-center gap-2 my-2 text-center text-${published ? 'blue' : 'red'}-500`}>
          {published ? '已发布' : '未发布'}
        </span>

        <span className="flex items-center justify-center gap-2">
          {/* <Icon icon="carbon:edit" /> */}
          <span>{dayjs(createdAt).format('YYYY-MM-DD hh:mm:ss')}</span>
        </span>
        <span className="flex items-center justify-center gap-2">
          {/* <Icon icon="carbon:edit" /> */}
          <span>{dayjs(updatedAt).format('YYYY-MM-DD hh:mm:ss')}</span>
        </span>
      </div>

      <div className="flex justify-center gap-3 text-sm">
        <div className="text-red-500 hover:text-red-300">
          {categories.map(({ id, name }) => (
            <Link
              key={id}
              className="flex items-center justify-center gap-2"
              href={`/admin/post?category=${id}`}
            >
              <span>{name}</span>
            </Link>
          ))}
        </div>

        <div className="text-blue-500 hover:text-blue-300">
          {tags.map(({ id, name}) => (
            <Link
              key={id}
              className="flex items-center justify-center gap-2"
              href={`/admin/post?tag=${id}`}
            >
              {/* <Icon icon="carbon:tag" /> */}
              <span>#{name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="my-3">
        <MarkdownViewer content={content} />
      </div>
    </div>
  )
}
