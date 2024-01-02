'use client'

import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { api } from '~/trpc/react';

type FieldType = {
  title?: string;
  abstract?: string;
  published?: string;
  content?: string;
};

export default function PostPage() {
  const mutation = api.post.create.useMutation()

  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
    // return
    mutation.mutate({
      title: values.title!,
      content: values.content!,
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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
          label="内容"
          name="content"
          rules={[{ required: true, message: 'Please input your content!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          name="published"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>直接发布</Checkbox>
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
