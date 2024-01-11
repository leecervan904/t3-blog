'use client'

import { memo, useState } from 'react'
import { Form, Input, Select, Divider, Button, Popconfirm, Tooltip } from 'antd'
import { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons'
import clsx from 'clsx'

import { type IKeyValueOption } from '~/hooks/useKeyValueData'

export interface IDynamicSelectProps {
  items: IKeyValueOption[]
  initialValue?: string[]
  onGetData: () => void
  onCreateItem: (item: IKeyValueOption) => Promise<void>
  onDeleteItem: (id: number) => Promise<void>
  onSelectionChange: (val: number[]) => void
}

function DynamicSelect({
  items,
  initialValue,
  onCreateItem,
  onDeleteItem,
  onGetData,
  onSelectionChange,
}: IDynamicSelectProps) {
  const [open, setOpen] = useState(false)
  // const [hoverItem, setHoverItem] = useState<string | number | undefined>('1')

  const onDropdownVisibleChange = async (open: boolean) => {
    // open && onGetData()
    // setOpen(open)
  }

  const onFinish = (item: IKeyValueOption) => {
    onCreateItem(item)
      .then(() => {
        setTimeout(() => {
          onGetData()
        }, 100)
      })
      .catch(console.log)
  }

  const onDelete = async (id?: string | number) => {
    console.log('will delete item', id);
    if (id !== undefined) {
      onDeleteItem(+id)
        .then(() => {
          setTimeout(() => {
            onGetData()
          }, 100);
        })
        .catch(console.log)
    }
  }

  const onChange = (val: string[]) => {
    // setOpen(false)
    onSelectionChange(val.map(v => +v))
  }

  // const onOptionHover = (item?: string | number) => {
  //   setHoverItem(item)
  // }

  return (
    <Select
      placeholder="选择分类"
      mode="multiple"
      // open={open}
      // onClick={() => setOpen(true)}
      options={items}
      defaultValue={initialValue}
      onDropdownVisibleChange={onDropdownVisibleChange}
      onChange={onChange}
      menuItemSelectedIcon={null}
      optionRender={option => (
        <div className="flex justify-between"
          // onMouseEnter={() => onOptionHover(option.value)}
          // onMouseLeave={() => onOptionHover()}
        >
          <span>{option.label}</span>
          <Popconfirm
            title="删除分类"
            description="确定后会删除该分类，但不会删除分类所属的文章。"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => onDelete(option.value as string)}
          >
            <DeleteFilled onClick={e => e.stopPropagation() } />
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

export default memo(DynamicSelect)
