'use client'

import React, { useState } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import {
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href='/admin/dashboard' >仪表板</Link>, '/admin/dashboard', <MailOutlined />),
  getItem(<Link href='/admin/post'>文章列表</Link>, '/admin/post', <CalendarOutlined />),
  getItem(<Link href='/admin/post/create'>写文章</Link>, '/admin/post/create', <CalendarOutlined />),
  getItem(
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      博客首页
    </a>,
    'link',
    <LinkOutlined />,
  ),
];

export default function AdminMenu() {
  const pathname = usePathname()
  const [current, setCurrent] = useState(pathname)

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
  }

  return (
    <Menu
      theme="dark"
      items={items}
      selectedKeys={[current]}
      onClick={onClick}
    />
  )
}
