'use client'

import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import { api } from '~/trpc/react';
import Markdown from '~/app/_components/markdown'
import DynamicSelect from '~/app/_components/DynamicSelect';
import { useForm } from 'antd/es/form/Form';

type FieldType = {
  title?: string;
  abstract?: string;
  published?: string;
  content?: string;
  category?: string;
  tag?: string;
};

export default function PostPage() {
  const mutation = api.post.create.useMutation()

  const [form] = useForm()

  const setFormContent = (val: string) => {
    form.setFieldValue('content', val)
  }

  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
    // return
    mutation.mutate({
      title: values.title!,
      content: values.content!,
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('form', form.getFieldValue('content'));
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="标题"
          name="title"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="摘要"
          name="abstract"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="分类"
          name="category"
        >
          <DynamicSelect />
        </Form.Item>

        <Form.Item<FieldType>
          name="published"
          valuePropName="checked"
          wrapperCol={{ offset: 2 }}
        >
          <Checkbox>直接发布</Checkbox>
        </Form.Item>

        <Form.Item<FieldType>
          name="content"
          label="内容"
          rules={[{ required: true, message: 'Please input your content!' }]}
        >
          <Markdown onContentChange={setFormContent} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
