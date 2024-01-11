'use client'

import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import AdminMenu from '../_components/AdminMenu'
import clsx from 'clsx';

export default function Page({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex h-[100vh]">
      <div className={clsx(
        'w-[256px] px-3 pt-20 bg-[#001525] transition',
        {
          'w-auto': !open
        }
      )}>
        <AdminMenu open={open} />
      </div>

      <div className='flex-1 flex flex-col'>
        <div className="px-3 py-2 shadow">
          <span onClick={() => setOpen(!open)}>
            {open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </span>
        </div>

        <div className="relative flex-1 overflow-auto p-3">
          {children}
        </div>
      </div>
    </div>
  );
}
