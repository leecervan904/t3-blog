'use client'

import { useRef, useState } from 'react'
import { type InputRef} from 'antd'
// import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
// import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

import MarkdownEditor from './MarkdownEditor'
import MarkdownViewer from './MarkdownViewer'

export { MarkdownEditor, MarkdownViewer }

// InnerMarkdown.MarkdownEditor = MarkdownEditor
// InnerMarkdown.MarkdownViewer = MarkdownViewer

export interface MarkdownProps {
  content?: string
  onContentChange: (content: string) => void
}

export default function InnerMarkdown({ content, onContentChange }: MarkdownProps) {
  const inputRef = useRef<InputRef>(null)
  const [value, setValue] = useState(inputRef.current?.input?.value ?? '')

  const setContent = ((val: string) => {
    onContentChange(val)
    setValue(val)
  })

  return (
    <div className="flex gap-2">
      <div className="w-1/2">
        <MarkdownEditor
          ref={inputRef}
          content={content ?? ''}
          onContentChange={setContent}
        />
      </div>

      <div className="w-1/2">
        <MarkdownViewer content={value} />
      </div>
    </div>
  )
}
