'use client'

import { useState, useRef } from 'react'
import { Input, Select, Divider, Space, Button, type InputRef} from 'antd'

export default function DynamicSelect() {
  const inputRef = useRef<InputRef>(null)
  const [name, setName] = useState('')
  const [items, setItems] = useState(['jack', 'lucy'])

  const addItem = () => {
    console.log();
  }

  const onNameChange = () => {
    console.log();
  }

  return (
    <Select
      placeholder="custom dropdown render"
      mode="multiple"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  )
}
