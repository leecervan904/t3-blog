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
  getItem(<Link href='/admin'>仪表板</Link>, '1', <MailOutlined />),
  getItem(<Link href='/admin/post'>文章列表</Link>, '3', <CalendarOutlined />),
  getItem(<Link href='/admin/post/create'>写文章</Link>, '2', <CalendarOutlined />),
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
  return (
    <div className="flex h-[100vh]">
      <div className='w-[256px] px-3 pt-20 bg-[#001525]'>
        <Menu
          defaultSelectedKeys={['1']}
          theme="dark"
          items={items}
        />
      </div>

      <div className='flex-1 p-3 overflow-auto'>
        {children}
      </div>
    </div>
  );
}
