import Link from 'next/link'
import React from 'react'
import { api } from '~/trpc/server'

export default async function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="box-border overflow-auto h-full py-5 bg-white dark:bg-[#111729]">
      <h2 className="py-5 text-center text-2xl">search page</h2>

      <div className="flex gap-5 w-4/5 m-auto">
        <div className="flex-1">
          <div>{children}</div>
        </div>

        <div className="sticky top-3 box-border w-[300px] px-3 py-5 shadow-lg border dark:border-[#252334]">
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
          className="px-2 bg-red-400 rounded"
          href={`/post/search/category/${id}`}
        >{name}</Link>
      ))}
    </div>
  )
}
