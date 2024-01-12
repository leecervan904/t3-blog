import React from 'react'
import clsx from 'clsx'

import { api } from "~/trpc/server"
import { formatDateString } from '~/util'
import LinkTag from '~/app/_components/LinkTag'
import { MarkdownViewer } from "~/app/_components/markdown"

export default async function PostItemPage({ params }: { params: { id: string }}) {
  const post = await api.post.find.query({ ids: [+params.id] })

  const { title, content, user, categories, createdAt } = post[0]!

  return (
    <div className={clsx(
      'flex flex-col gap-3 m-auto my-3 px-3',
      'md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl',
    )}>
      <h2 className="my-5 text-2xl text-center font-bold">{title}</h2>

      <div className="flex items-center justify-center gap-5 text-sm">
        <span>{formatDateString(createdAt)}</span>
        <span>{user.name}</span>
      </div>

      <div className="flex items-center justify-center gap-3 text-sm">
        {categories.map(({ id, name }) => (
          <LinkTag key={id} href={`/search/category/${id}`}>#{name}</LinkTag>
        ))}
      </div>

      <MarkdownViewer content={content} />
    </div>
  )
}


