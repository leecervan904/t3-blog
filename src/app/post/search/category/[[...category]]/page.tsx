import clsx from "clsx"
import Link from "next/link"
import { api } from "~/trpc/server"
import { formatDateString } from "~/util"

export default async function CategoryPage({ params }: { params: { category?: string[] } }) {

  console.log(params.category)

  const categoryIds = params.category?.map(v => +v)
  const posts = await api.post.pages.query({ categoryIds })

  return (
    <div className="flex flex-col gap-5">
      {posts.map(({ id, title, abstract, content, categories, createdAt, updatedAt }) => (
        <div key={id} className={clsx(
          'px-3 py-5 bg-[#eee] hover:shadow-lg shadow-slate-500 rounded-lg transition-all',
          'dark:bg-[#20293a] dark:shadow-slate-100',
        )}>
          <h3 className="text-xl text-blue-600">
            <Link href={`/post/${id}`}>{title}</Link>
          </h3>

          <div>{content.slice(0, 30) + '...'}</div>

          <div className="flex justify-between text-slate-500 text-sm">
            <span>
              <span>Created Time:</span>
              <span>{formatDateString(createdAt)}</span>
            </span>
            <span>
              <span>Updated Time:</span>
              <span>{formatDateString(updatedAt)}</span>
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span>Category:</span>
            {categories.map(v => (
              <span className="badge badge-secondary badge-sm">
                <Link href={`/post/search/category/${v.id}`}>{v.name}</Link>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
