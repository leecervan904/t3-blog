import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Salsa } from "next/font/google";

import { api } from '~/trpc/server'
import clsx from 'clsx';

const salsa = Salsa({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default async function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="box-border overflow-auto h-full py-5 bg-white dark:bg-[#111729]">
      <h2 className={clsx(
        `${salsa.className}`,
        'py-20 text-center text-5xl',
      )}>
        Talk is cheap, show me your code.
      </h2>

      <div className="flex gap-5 w-4/5 m-auto">
        <div className="flex-1">
          <div>{children}</div>
        </div>

        <div className="card dark:card-bordered px-3 py-5 shadow-xl dark:shadow-none dark:border-blue-500">
          <div className="avatar justify-center">
            <div className="w-24 rounded-full">
              <Image width="100" height="100" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="avatar" />
            </div>
          </div>

          <div className="my-3 py-2 text-center">Profile</div>

          <Categories />
        </div>
      </div>
    </div>
  )
}

async function Categories() {
  const categories = await api.category.findAll.query()

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ id, name }) => (
        <Link
          key={id}
          // className="px-2 bg-red-400 rounded"
          href={`/post/search/category/${id}`}
        >
          <button className="badge badge-primary">{name}</button>
        </Link>
      ))}
    </div>
  )
}
