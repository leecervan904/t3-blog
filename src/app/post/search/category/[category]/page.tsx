import clsx from "clsx"
import Link from "next/link"
import { api } from "~/trpc/server"
import { formatDateString } from "~/util"

export default async function CategoryPage({ params }: { params: { category: string } }) {

  const posts = await api.post.pages.query({ categoryIds: [+params.category] })

  return (
    <div className="flex flex-col gap-5">
      {posts.map(({ id, title, abstract, content, categories, createdAt, updatedAt }) => (
        <div key={id} className={clsx(
          'px-3 py-5 bg-[#eee] hover:shadow-lg shadow-slate-500 rounded-lg',
          'dark:bg-[#20293a] dark:shadow-slate-100',
        )}>
          <Link href={`/post/${id}`}>
            <h3 className="text-xl text-blue-600">{title}</h3>
          </Link>

          <p>{content.slice(0, 30) + '...'}</p>
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
          <div className="flex gap-1">
            <span>category id:</span>
            {categories.map(v => (<span>{v.id}</span>))}
          </div>
        </div>
      ))}
    </div>
  )
}
