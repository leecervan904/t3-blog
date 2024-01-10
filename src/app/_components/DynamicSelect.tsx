'use client'

import { useState } from 'react'
import { Form, Input, Select, Divider, Button, Popconfirm } from 'antd'
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons'

import { type IKeyValueOption } from '~/hooks/useKeyValueData'

export interface IDynamicSelectProps {
  items: IKeyValueOption[]
  initialValue?: string[]
  onGetData: () => void
  onCreateItem: (item: IKeyValueOption) => Promise<void>
  onDeleteItem: (id: number) => Promise<void>
  onSelectionChange: (val: number[]) => void
}

export default function DynamicSelect({
  items,
  initialValue,
  onCreateItem,
  onDeleteItem,
  onGetData,
  onSelectionChange,
}: IDynamicSelectProps) {
  const [value, setValue] = useState<string[]>(initialValue ?? [])

  const onDropdownVisibleChange = async (open: boolean) => {
    open && onGetData()
  }

  const onFinish = (item: IKeyValueOption) => {
    onCreateItem(item)
      .then(() => {
        onGetData()
      })
      .catch(console.log)
  }

  const onDelete = async (id: string) => {
    console.log('will delete item', id);
    await onDeleteItem(+id)
    onGetData()
  }

  const onChange = (val: string[]) => {
    setValue(val)
    onSelectionChange(val.map(v => +v))
  }

  return (
    <Select
      placeholder="选择分类"
      mode="multiple"
      // open={true}
      options={items}
      defaultValue={initialValue}
      value={value}
      onDropdownVisibleChange={onDropdownVisibleChange}
      onChange={onChange}
      optionRender={option => (
        <div className="flex justify-between">
          <span>{option.label}</span>
          <Popconfirm
            title="删除分类"
            description="删除后，所属文章的分类归纳为未分类"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => onDelete(option.value as string)}
          >
            <CloseOutlined />
          </Popconfirm>
        </div>
      )}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
            layout="inline"
          >
            <Form.Item<IKeyValueOption>
              name="label"
              label="label"
              rules={[{ required: true, message: '必须填写 label' }]}
            >
              <Input
                placeholder="Please enter label"
              />
            </Form.Item>

            <Form.Item<IKeyValueOption>
              name="value"
              label="value"
              rules={[{ required: true, message: '必须填写 value' }]}
            >
              <Input
                placeholder="Please enter value"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">添加</Button>
            </Form.Item>
          </Form>
        </>
      )}
    />
  )
}
