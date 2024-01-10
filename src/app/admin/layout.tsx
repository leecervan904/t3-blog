import React from 'react'
import AdminMenu from '../_components/AdminMenu'

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[100vh]">
      <div className='w-[256px] px-3 pt-20 bg-[#001525]'>
        <AdminMenu />
      </div>

      <div className='relative flex-1 p-3 overflow-auto'>
        {children}
      </div>
    </div>
  );
}
