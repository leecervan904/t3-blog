'use client'

import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'

import { api } from '~/trpc/react'
import Markdown from '~/app/_components/markdown'
import DynamicSelect, { type ISelectOption } from '~/app/_components/DynamicSelect'

export interface IPostForm {
  title: string;
  abstract?: string;
  published?: boolean;
  content: string;
  categoryIds?: number[];
  tagIds?: number[];
}

function useCategory() {
  const { data: categories, refetch } = api.category.findAll.useQuery()
  const createAction = api.category.create.useMutation()
  const updateAction = api.category.update.useMutation()
  const deleteAction = api.category.delete.useMutation()

  const onGetItems = (categories ?? []).map(v => ({ label: v.name, value: v.slug }))

  const onAddItem = async (item: ISelectOption) => {
    return createAction.mutate({
      name: `${item.label}`,
      slug: `${item.value}`,
    })
  }

  const onUpdateItem = (id: number, item: Partial<ISelectOption>) => {
    return updateAction.mutate({
      id,
      name: `${item.label}`,
      slug: `${item.value}`,
    })
  }

  const onDeleteItem = (id: number) => {
    return deleteAction.mutate(id)
  }

  return {
    categories,
    onGetItems,
    refetchItems: refetch,
    onAddItem,
    onUpdateItem,
    onDeleteItem,
  }
}

export interface IPostFormProps {
  type: 'create' | 'edit'
  defaultForm?: IPostForm
  onCreate?: (form: IPostForm) => void
  onSave?: (form: IPostForm) => void
}

export default function PostForm({ type, defaultForm, onCreate, onSave }: IPostFormProps) {
  const { onAddItem: onAddCategory, onDeleteItem, refetchItems, categories } = useCategory()

  const [form] = useForm()

  const setFormContent = (val: string) => {
    form.setFieldValue('content', val)
  }

  const setFormCategory = (val: number[]) => {
    form.setFieldValue('categoryIds', val)
  }

  const onFinish = (form: IPostForm) => {
    console.log('Success:', form)
    type === 'create' && onCreate?.(form)
    type === 'edit' && onSave?.(form)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('form', form.getFieldValue('content'));
    console.log('Failed:', errorInfo);
  }

  return (
    <div className="py-5">
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
        initialValues={defaultForm ?? {}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<IPostForm>
          label="标题"
          name="title"
          rules={[{ required: true, message: '必须填写标题' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IPostForm>
          label="摘要"
          name="abstract"
        >
          <Input />
        </Form.Item>

        <Form.Item<IPostForm>
          label="分类"
          name="categoryIds"
        >
          <DynamicSelect
            items={(categories ?? []).map(v => ({ label: v.name, value: v.id }))}
            onAddItem={onAddCategory}
            onDeleteItem={onDeleteItem}
            onGetItems={refetchItems}
            onSelectionChange={setFormCategory}
          />
        </Form.Item>

        <Form.Item<IPostForm>
          name="published"
          valuePropName="checked"
          wrapperCol={{ offset: 2 }}
        >
          <Checkbox>直接发布</Checkbox>
        </Form.Item>

        <Form.Item<IPostForm>
          name="content"
          label="内容"
          rules={[{ required: true, message: '必须填写内容' }]}
        >
          <Markdown content={defaultForm?.content} onContentChange={setFormContent} />
        </Form.Item>

        <Form.Item className="text-center" wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
