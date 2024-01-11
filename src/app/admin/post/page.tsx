'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Button, Modal, Space, Table, Tag, Tooltip } from 'antd'

import { api } from "~/trpc/react"
import { formatDateString } from '~/util'
import PostQueryForm, { type IPostPageParams } from './_components/PostQueryForm'
import { MarkdownViewer } from '~/app/_components/markdown'

export interface IPostPageProps {
  searchParams: IPostPageParams
}

export default function Page({ searchParams }: IPostPageProps) {
  const { category } = searchParams

  const { data: posts = [], refetch } = api.post.pages.useQuery({
    categoryIds: category ? [+category] : []
  })
  const updatePostAction = api.post.update.useMutation()
  const deletePostAction = api.post.delete.useMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [content, setContent] = useState('')

  const onPreview = (s: string) => {
    setContent(s)
    setIsModalOpen(true)
  }

  const onPublish = async (id: number, toPublish: boolean) => {
    await updatePostAction.mutateAsync({
      id,
      published: toPublish
    })
    await refetch()
  }

  const onDelete = async (id: number) => {
    await deletePostAction.mutateAsync(id)
    await refetch()
  }

  const columns = useMemo(() => {
    return [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '摘要',
        dataIndex: 'title',
        key: 'abstract',
      },
      {
        title: '正文',
        dataIndex: 'content',
        key: 'content',
        render: (content: string) => (
          <Tooltip title="点击阅览" placement="topLeft">
            <div className="cursor-pointer" onClick={() => onPreview(content)}>
              {`${content.slice(0, 60)}${content.length > 60 ? '...' : ''}`}
            </div>
          </Tooltip>
        ),
      },
      {
        title: '发布状态',
        dataIndex: 'published',
        key: 'published',
        render: (published: boolean) => <Tag color={published ? '#5bb4ef' : '#ec622b'}>{published ? '已发布' : '未发布'}</Tag>
      },
      {
        title: '分类',
        dataIndex: 'categories',
        key: 'categories',
        render: (categories: typeof posts[number]['categories']) => (
          <Space>
            {categories.map(category => <Tag key={category.id} color="#5bb4ef">{category.name}</Tag>)}
          </Space>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createAt: Date) => formatDateString(createAt),
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (createAt: Date) => formatDateString(createAt),
      },
      {
        title: '操作',
        key: 'action',
        render: (_: unknown, record: typeof posts[number]) => (
          <Space>
            <Button size="small" type="primary" onClick={() => onPublish(record.id, !record.published)}>
              {record.published ? '停止发布' : '发布'}
            </Button>
            <Button size="small" type="primary" danger onClick={() => onDelete(record.id)}>删除</Button>
            <Button size="small">
              <Link href={`/admin/post/edit?id=${record.id}`}>编辑</Link>
            </Button>
          </Space>
        ),
      },
    ]
  }, [posts])

  return (
    <>
      <PostQueryForm defaultForm={searchParams} />

      <Table
        dataSource={posts}
        columns={columns}
      />

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <MarkdownViewer content={content} />
      </Modal>
    </>
  )
}
