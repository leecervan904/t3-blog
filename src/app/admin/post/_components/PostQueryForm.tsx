'use client'

import React, { useCallback, useState } from 'react'
import {
  Form,
  Input,
  Radio,
  Select,
  type SelectProps,
} from 'antd'

import { api } from '~/trpc/react'

type SizeType = Parameters<typeof Form>[0]['size']

export interface IPostPageParams {
  tag?: string
  category?: string
  keywords?: string
}

export interface IPostQueryFormProps {
  defaultForm?: IPostPageParams
}

export function getCategories() {
  const { data } = api.category.findAll.useQuery()
  return data
}

const PostQueryForm: React.FC<IPostQueryFormProps> = ({ defaultForm = {} }) => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default')

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const {
    isLoading: isLoadingCategories,
    data: categories = [],
    refetch: getCategories,
  } = api.category.findAll.useQuery(undefined)

  const getCategoriesWrapper = useCallback<Required<SelectProps>['onDropdownVisibleChange']>(
    (open) => open && getCategories().catch(console.log),
    []
  )

  return (
    <>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ ...defaultForm, size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="关键字" name="keywords">
          <Input />
        </Form.Item>

        <Form.Item label="分类" name="category">
          <Select
            loading={isLoadingCategories}
            onDropdownVisibleChange={getCategoriesWrapper}
            options={categories.map(({ id, name }) => ({ label: name, value: `${id}` }))}
          />
        </Form.Item>

        <Form.Item label="标签" name="tag">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </>
  )
}

export default  PostQueryForm
