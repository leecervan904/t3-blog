import Link from 'next/link'
import dayjs from 'dayjs'

import { api } from "~/trpc/server"

export default async function Page({ searchParams }: {
  searchParams: {
    tag: string,
    category: string,
  }
}) {
  const posts = await api.post.pages.query({})

  return (
    <>
      <h2 className="my-5">
        <div>post list</div>
        <pre>{JSON.stringify(searchParams, null, 2)}</pre>
      </h2>

      <div className="flex flex-col gap-3">
        {posts.map(post => (
          <Link
            key={post.id}
            href={`/admin/post/${post.id}`}
          >
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
                  <span>{dayjs(post.createdAt).format('YYYY-MM-DD hh:mm:ss')}</span>
                </span>
                <span>
                  <span>Updated Time:</span>
                  <span>{dayjs(post.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
