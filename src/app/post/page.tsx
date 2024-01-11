import Link from 'next/link'

import { api } from "~/trpc/server"
import { formatDateString } from '~/util'

export default async function Page() {
  const posts = await api.post.pages.query({})

  return (
    <>
      <div className="flex flex-col gap-3">
        {posts.map(post => (
          <Link key={post.id} href={`/admin/post/${post.id}`}>
            <div className="
              px-2 py-3 shadow rounded
              transition-all
              hover:shadow-2xl hover:bg-slate-300
            ">
              <h2 className="font-bold text-2xl text-blue-500 hover:text-blue-800">{post.title}</h2>
              <p>{post.content.slice(0, 30) + '...'}</p>
              <div className="flex justify-between text-slate-500 text-sm">
                <span>
                  <span>published: </span>
                  <span>{post.published ? 'Yes' : 'No'}</span>
                </span>
                <span>
                  <span>Created Time:</span>
                  <span>{formatDateString(post.createdAt)}</span>
                </span>
                <span>
                  <span>Updated Time:</span>
                  <span>{formatDateString(post.updatedAt)}</span>
                </span>
              </div>
              <div className="flex gap-1">
                <span>category id:</span>
                {post.categories.map(v => (<span>{v.id}</span>))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
