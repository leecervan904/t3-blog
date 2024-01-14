import { redirect } from 'next/navigation'
import React from 'react'

export default async function CategoryPage({ children }: { children: React.ReactNode }) {
  redirect('/post/search/category')

  return (
    <>
      {children}
    </>
  )
}
