import clsx from "clsx"
import Link from "next/link"
import Image from 'next/image'

import { api } from "~/trpc/server"
import { formatDateString } from "~/util"

export default async function CategoryPage({ params }: { params: { category?: string[] } }) {
  const categoryIds = params.category?.map(v => +v)
  const posts = await api.post.pages.query({ categoryIds })

  return (
    <div className="flex flex-col gap-5">
      {posts.map(({ id, title, abstract, content, categories, updatedAt }, i) => (
        <div key={id} className={clsx(
          'group',
          'flex lg:h-36 xl:h-48',
          'rounded-lg',
          'shadow-primary hover:shadow-lg',
          'bg-base-200',
          'text-base-content',
        )}>
          <div className="hidden overflow-hidden box-border flex-grow-0 w-0 lg:block lg:w-36 xl:w-48">
            <div className="overflow-hidden w-full h-0 pb-[100%] scale-100 group-hover:scale-[1.35] transition-transform">
              <Image
                src={`/imgs/food-${i % 3 + 1}.jpeg`}
                alt=""
                loading="lazy"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className={clsx(
            'overflow-y-auto flex-1 flex flex-col gap-1 px-3 py-5  transition-all',
          )}>
            <h3 className="text-xl text-primary">
              <Link href={`/post/${id}`}>{title}</Link>
            </h3>

            <div>{content.slice(0, 100) + '...'}</div>

            {abstract && <div className="text-sm">摘要: {abstract}</div>}

            <div className="flex justify-between text-neutral text-xs">
              <span>
                <span>最近更新: </span>
                <span>{formatDateString(updatedAt)}</span>
              </span>
            </div>

            <div className="flex gap-2 items-center text-sm">
              <span>分类: </span>
              {categories.map(v => (
                <span className="badge badge-secondary badge-sm">
                  <Link href={`/post/search/category/${v.id}`}>{v.name}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
