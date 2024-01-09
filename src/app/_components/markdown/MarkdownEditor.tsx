import { useCallback } from 'react'
import { type editor } from 'monaco-editor'
import MonacoEditor, { type ChangeHandler } from 'react-monaco-editor'

export interface IMarkdownEditorProps {
  width?: string,
  height?: string,
  content: string,
  options?: editor.IStandaloneEditorConstructionOptions,
  onContentChange: (val?: string) => void
}

export default function MarkdownEditor({
  width,
  height,
  content,
  onContentChange,
  options,
}: IMarkdownEditorProps) {
  const onChange = useCallback<ChangeHandler>((val) => {
    onContentChange(val)
  }, [])

  return (
    <MonacoEditor
      width={width ?? '100%'}
      height={height ?? '400'}
      theme="vs-dark"
      value={content}
      options={{
        language: 'markdown',
        lineNumbers: 'off',
        minimap: {
          enabled: false,
        },
      }}
      onChange={onChange}
    />
  )
}
