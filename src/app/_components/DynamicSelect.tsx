'use client'

import { useState } from 'react'
import { Form, Input, Select, Divider, Button, Popconfirm } from 'antd'
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons'

export interface ISelectOption {
  label: string | number
  value: string | number
}

export interface IDynamicSelectProps {
  items: ISelectOption[]
  onAddItem: (item: ISelectOption) => Promise<void>
  onDeleteItem: (id: number) => Promise<void>
  onGetItems: () => void
  onSelectionChange: (val: number[]) => void
}

export default function DynamicSelect({
  items,
  onAddItem,
  onDeleteItem,
  onGetItems,
  onSelectionChange,
}: IDynamicSelectProps) {
  // const [items, setItems] = useState<ISelectOption[]>([])
  const [value, setValue] = useState<number[]>([])

  const onDropdownVisibleChange = async (open: boolean) => {
    if (open && onGetItems) {
      onGetItems()
    }
  }

  const onFinish = (item: ISelectOption) => {
    onAddItem(item)
      .then(() => {
        onGetItems()
      })
      .catch(console.log)
  }

  const onDelete = async (id: number) => {
    // e.stopPropagation()
    console.log('will delete item', id);
    await onDeleteItem(id)
    onGetItems()
  }

  const onChange = (val: number[]) => {
    setValue(val)
    onSelectionChange(val)
  }

  return (
    <Select
      placeholder="选择分类"
      mode="multiple"
      open={true}
      value={value}
      onDropdownVisibleChange={onDropdownVisibleChange}
      options={items}
      onChange={onChange}
      optionRender={option => (
        <div className="flex justify-between">
          <span>{option.label}</span>
          <Popconfirm
            title="删除分类"
            description="删除后，所属文章的分类归纳为未分类"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => onDelete(option.value as number)}
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
            <Form.Item<ISelectOption>
              name="label"
              label="label"
              rules={[{ required: true, message: '必须填写 label' }]}
            >
              <Input
                placeholder="Please enter label"
              />
            </Form.Item>

            <Form.Item<ISelectOption>
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
