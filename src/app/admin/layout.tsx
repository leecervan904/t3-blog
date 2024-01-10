'use client'

import React, { useState } from 'react';
import Link from 'next/link'
import {
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { usePathname } from 'next/navigation';

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
  getItem(<Link href='/admin'>仪表板</Link>, '/admin', <MailOutlined />),
  getItem(<Link href='/admin/post'>文章列表</Link>, '/admin/post', <CalendarOutlined />),
  getItem(<Link href='/admin/post/create'>写文章</Link>, '/admin/post/create', <CalendarOutlined />),
  getItem('分类', '4', <CalendarOutlined />),
  getItem('用户管理', '5', <CalendarOutlined />),
  getItem(
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      博客首页
    </a>,
    'link',
    <LinkOutlined />,
  ),
];

export default function Page({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [current, setCurrent] = useState(pathname)

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
  }

  return (
    <div className="flex h-[100vh]">
      <div className='w-[256px] px-3 pt-20 bg-[#001525]'>
        <Menu
          theme="dark"
          items={items}
          selectedKeys={[current]}
          onClick={onClick}
        />
      </div>

      <div className='relative flex-1 p-3 overflow-auto'>
        {children}
      </div>
    </div>
  );
}
