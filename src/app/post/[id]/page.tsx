import React from 'react'
import clsx from 'clsx'
import { remark } from 'remark'

import { api } from "~/trpc/server"
import { formatDateString } from '~/util'
import LinkTag from '~/app/_components/LinkTag'
import { MarkdownViewer } from "~/app/_components/markdown"

import remarkHeadingToc, { type HeadingTocItem } from './remark-headings'

import Toc from './Toc'

async function genToc(content: string) {
  const res = remark()
    .use(remarkHeadingToc)
    .process(content)

  return res
}

export default async function PostItemPage({ params }: { params: { id: string }}) {
  const post = await api.post.find.query({ ids: [+params.id] })

  const { title, content, user, categories, createdAt } = post[0]!

  const res = await genToc(content)

  return (
    <div className={clsx(
      'flex flex-col gap-3 m-auto px-3 scroll-smooth',
      'md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl',
    )}>

      <h2 className="my-5 text-2xl text-center font-bold">{title}</h2>

      <div className="flex items-center justify-center gap-5 text-sm">
        <span>{formatDateString(createdAt)}</span>
        <span>{user.name}</span>
      </div>

      <div className="flex items-center justify-center gap-3 text-sm">
        {categories.map(({ id, name }) => (
          <LinkTag key={id} href={`/post/search/category/${id}`}>#{name}</LinkTag>
        ))}
      </div>

      <div className="flex flex-row">
        <div className="flex-1">
          <MarkdownViewer content={res.value as string} />
        </div>

        <div className="overflow-hidden box-border sticky top-0 w-0 h-[calc(100vh-64px)] pl-5 py-6 text-sm md:w-60 lg:80 border-l">
          <Toc toc={res.data.remarkHeadingToc as HeadingTocItem[]} depth={3} />
        </div>
      </div>
    </div>
  )
}


