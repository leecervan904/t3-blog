'use client'

import { memo, useCallback, useState } from "react";
import clsx from "clsx";
import { Input } from "antd";
import Link from 'next/link'
import { SearchOutlined, GithubOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

// import ThemeModeIcon from "~/app/_components/ThemeModeIcon";

const navList = [
  { label: '首页', href: '/' },
  { label: '博客', href: '/post/search' },
  { label: '时间轴', href: '/post/timeline' },
]

function NavbarMobile() {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => setOpen(pre => !pre), [])

  return (
    <>
      <div className={clsx(
        'z-50 absolute overflow-hidden w-full h-0 top-10 bg-white transition-all dark:bg-[#121728]',
        {
          'h-[calc(100vh-2.5rem)]': open,
        },
      )}>
        <h2>123</h2>
      </div>

      <div className={clsx(
        'box-border h-10 flex items-center justify-between py-3 px-5 bg-white shadow border-b',
        'dark:text-white dark:bg-[#212936] dark:border-b-[#20293a]'
      )}>
        <h2 className="text-xl">
          <Link href="/">T3</Link>
        </h2>

        <span className="flex items-center gap-3">
          <SearchOutlined />
          {open ? <MenuFoldOutlined onClick={toggle} /> : <MenuUnfoldOutlined onClick={toggle} />}
        </span>
      </div>
    </>
  )
}


export default memo(NavbarMobile)
