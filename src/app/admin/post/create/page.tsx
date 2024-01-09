'use client'

import { api } from '~/trpc/react'
import PostForm, { type IPostForm } from '~/app/admin/post/_components/PostForm'
import { useRouter } from 'next/navigation'

export default function CreatePostPage() {
  const router = useRouter()
  const createAction = api.post.create.useMutation({
    onSuccess(createdPost, _postForm) {
      console.log(createdPost, _postForm);
      router.push(`/admin/post/${createdPost.id}`)
    }
  })

  const onCreate = (form: IPostForm) => {
    createAction.mutate(form)
  }

  return (
    <>
      <PostForm
        type="create"
        onCreate={onCreate}
      />
    </>
  )
}
