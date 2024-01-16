'use client'

import Link from 'next/link'
import { type HeadingTocItem } from './remark-headings'
import clsx from 'clsx'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const useHash = () => {
  const params = useParams()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "")
    setHash(currentHash)
  }, [params])

  return hash
}

export interface ITocProps {
  toc: HeadingTocItem[],
  depth?: 1 | 2 | 3 | 4 | 5 | 6,
}

function TocItem({ toc, depth = 4 }: ITocProps) {
  const hash = useHash()

  return (
    <div>
      {toc.map(item => (
        <ul key={item.id} className="list-none">
          <li className={clsx(
              'my-2 text-xs',
            )}>
            <Link href={`#${item.id}`} data-depth={item.depth}>
              <span
                className={clsx(
                  { 'text-blue-600':decodeURIComponent (hash) === item.id ?? '' },
                )}
              >
                {item.value}
              </span>
            </Link>
            {item.depth < depth && item.children?.length && <TocItem toc={item.children} depth={depth} />}
          </li>
        </ul>
      ))}
    </div>
  )
}

function Toc(props: ITocProps) {
  // todo: remove
  const activeHash = useHash()

  return (
    <>
      <div className="my-3 text-primary">Hash: {decodeURIComponent(activeHash)}</div>

      <TocItem {...props} />
    </>
  )
}

export default Toc
