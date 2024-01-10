'use client'

import React, { useCallback } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { type FormProps, useForm } from 'antd/es/form/Form'

import Markdown from '~/app/_components/markdown'
import DynamicSelect from '~/app/_components/DynamicSelect'
import { useCategory } from '~/hooks/useKeyValueData'

export interface IPostForm {
  title: string;
  abstract?: string;
  published?: boolean;
  content: string;
  categoryIds?: string[];
  tagIds?: number[];
}

export interface IPostFormProps {
  defaultForm?: IPostForm
  confirmText?: string
  onConfirm?: (form: IPostForm) => void
}

export default function PostForm({
  defaultForm,
  confirmText = '提交',
  onConfirm,
}: IPostFormProps) {
  const {
    data: categories,
    onCreateItem: onCreateCategory,
    onDeleteItem: onDeleteCategory,
    onGetData: onGetCategories,
  } = useCategory()

  const [form] = useForm()

  const setFormContent = useCallback((val: string) => {
    form.setFieldValue('content', val)
  }, [])

  const setFormCategory = useCallback((val: number[]) => {
    form.setFieldValue('categoryIds', val)
  }, [])

  const onFinish = useCallback((form: IPostForm) => {
    console.log('Success:', form)
    onConfirm && onConfirm(form)
  }, [])

  const onFinishFailed = useCallback<Required<FormProps>['onFinishFailed']>((errorInfo) => {
    // console.log('form', form.getFieldValue('content'));
    console.log('Failed:', errorInfo);
  }, [])

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
            items={categories}
            initialValue={defaultForm?.categoryIds}
            onGetData={onGetCategories}
            onCreateItem={onCreateCategory}
            onDeleteItem={onDeleteCategory}
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
            { confirmText }
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
