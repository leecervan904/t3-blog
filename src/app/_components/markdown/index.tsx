'use client'

import { useState } from 'react'

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
  const [value, setValue] = useState(content ?? '')

  const setContent = ((val?: string) => {
    onContentChange(val ?? '')
    setValue(val ?? '')
  })

  return (
    <div className="flex">
      <div className="w-1/2">
        <MarkdownEditor
          height="600"
          content={content ?? ''}
          onContentChange={setContent}
        />
      </div>

      <div className="w-1/2 px-2">
        <MarkdownViewer content={value} />
      </div>
    </div>
  )
}
