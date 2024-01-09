'use client'

import { Spin } from "antd"
import { api } from "~/trpc/react"

export interface IEditPageProps {
  searchParams: {
    id: string
  }
}

export default function Page({ searchParams }: IEditPageProps) {
  const { id } = searchParams

  const { data, isLoading } = api.post.find.useQuery({ ids: [+id] })

  if (isLoading) {
    return (
      <Spin />
    )
  }

  if (!data?.length) {
    return <div>no data!</div>
  }

  const { title, tags, categories } = data[0]!

  return (
    <div>
      <pre>{JSON.stringify(data[0], null, 2)}</pre>
    </div>
  )
}
