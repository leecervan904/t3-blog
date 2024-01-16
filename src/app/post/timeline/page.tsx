import clsx from "clsx"
import Link from 'next/link'

import { api } from "~/trpc/server"
import { formatDateString } from "~/util"

const getLimitText = (text: string, limit?: number) => {
  return limit ? text.slice(0, limit) : text
}

export default async function TimelinePage() {
  const posts = await api.post.pages.query({})

  return (
    <div className="overflow-auto py-10">
      <ul className="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
        {posts.map(({ id, title, abstract, content, createdAt }, i) => (
          <li>
            <div className="timeline-middle text-[#767ffe] dark:text-[#fe62d4]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
            </div>

            <div className={clsx(
              'timeline-start text-end mb-10',
              {
                'timeline-end': i & 1,
                '!text-start': i & 1,
              },
            )}>
              <div className="italic">{formatDateString(createdAt, 'YYYY-MM-DD')}</div>
              <div className="my-1 font-bold">
                <Link href={`/post/${id}`}>{title}</Link>
              </div>
              <div className="text-sm text-gray-600">{abstract}</div>
              <div className="text-sm">{getLimitText(content, 200)}</div>
            </div>

            <hr className="bg-primary dark:bg-secondary" />
          </li>
        ))}
      </ul>
    </div>
  )
}
