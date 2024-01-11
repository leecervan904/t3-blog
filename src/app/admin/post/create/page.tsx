'use client'

import { api } from '~/trpc/react'
import PostForm, { type IPostForm } from '~/app/admin/post/_components/PostForm'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const createAction = api.post.create.useMutation({
    onSuccess(createdPost, _postForm) {
      console.log(createdPost, _postForm);
      router.push(`/admin/post/${createdPost.id}`)
    }
  })

  const onConfirm = (form: IPostForm) => {
    createAction.mutate({
      ...form,
      categoryIds: form.categoryIds?.map(id => +id),
    })
  }

  return (
    <>
      <PostForm onConfirm={onConfirm} />
    </>
  )
}
