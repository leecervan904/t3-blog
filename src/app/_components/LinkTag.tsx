import Link from 'next/link'

export interface ILinkTagProps {
  href: string
  children: React.ReactNode
}

export default function LinkTag({ href, children }: ILinkTagProps) {
  return (
    <Link href={href}>
      <span className="px-2 py-1 rounded bg-red-400 hover:bg-red-300">{children}</span>
    </Link>
  )
}
