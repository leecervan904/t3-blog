import { Input, type InputRef } from 'antd'
import React, { type ChangeEvent, useCallback } from 'react'
// import { Icon } from '@iconify/react';

export interface IMarkdownEditorProps {
  content: string,
  onContentChange: (val: string) => void
}

export default React.forwardRef((
  { content, onContentChange }: IMarkdownEditorProps,
  ref: React.Ref<InputRef>,
  ) => {
  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value)
  }, [])

  return (
    <div>
      {/* <Icon icon="mdi-light:home" /> */}

      <Input.TextArea
        ref={ref}
        rows={20}
        cols={20}
        defaultValue={content}
        styles={{
          textarea: {
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
          }
        }}
        onChange={onChange}
      />
    </div>
  )
})
