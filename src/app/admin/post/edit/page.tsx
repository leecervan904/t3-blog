'use client'

import { Spin } from "antd"
import { api } from "~/trpc/react"
import PostForm, { type IPostForm } from "../_components/PostForm"
import { pick } from "lodash-es"

export interface IEditPageProps {
  searchParams: {
    id: string
  }
}

export default function Page({ searchParams }: IEditPageProps) {
  const { id } = searchParams
  const { data, isLoading } = api.post.find.useQuery({ ids: [+id] })
  const updateAction = api.post.update.useMutation()

  const onConfirm = (form: IPostForm) => {
    updateAction.mutate({
      id: +id,
      ...form,
      categoryIds: form.categoryIds?.map(id => +id)
    })
  }

  if (isLoading) {
    return <Spin />
  }

  if (!data?.length) {
    return <div>no data!</div>
  }

  const post = data[0]!
  const defaultForm: IPostForm = pick(post, [
    'title',
    'published',
    'abstract',
    'content',
  ])
  defaultForm.categoryIds = post.categories.map(v => `${v.id}`)
  defaultForm.tagIds = post.tags.map(v => +v.id)

  return (
    <>
      <PostForm defaultForm={defaultForm} onConfirm={onConfirm} />
    </>
  )
}
