'use client'

import { memo } from "react";
import clsx from "clsx";
import { Input } from "antd";
import Link from 'next/link'
import { SearchOutlined, GithubOutlined } from '@ant-design/icons'

import { useBreakpoint } from "~/hooks/useBreakPoint";
import ThemeModeIcon from "~/app/_components/ThemeModeIcon";
import { usePathname } from "next/navigation";

const navList = [
  { label: '首页', href: '/' },
  { label: '博客', href: '/post/search' },
  { label: '时间轴', href: '/post/timeline' },
]

function Navbar() {
  const { isSm } = useBreakpoint()
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) {
    return null
  }

  // if (isSm) {
    return (
      <div className={clsx(
        'flex items-center justify-between py-3 px-10 bg-white shadow border-b',
        'dark:text-white dark:bg-[#212936] dark:border-b-[#20293a]'
      )}>
        <div className="flex gap-10">
          <h2 className="text-2xl">
            <Link href="/">T3</Link>
          </h2>

          <div>
            <Input prefix={<SearchOutlined />} suffix="⌘K" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            {navList.map(({ label, href }) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeModeIcon />
            <Link href="https://github.com/leecervan904/t3-blog" target="_blank"><GithubOutlined /></Link>
          </div>
        </div>
      </div>
    )
  // }

  // return <NavbarMobile />
}

export default memo(Navbar)
