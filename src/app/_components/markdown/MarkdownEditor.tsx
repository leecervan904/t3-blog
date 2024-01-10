import { useCallback } from 'react'
import { type editor } from 'monaco-editor'
// import MonacoEditor, { type ChangeHandler } from 'react-monaco-editor'
import MonacoEditor, { type ChangeHandler } from './Editor'

// import Editor from '@monaco-editor/react'
// import { loader } from '@monaco-editor/react'

// loader.config({
//   paths: {
//     vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/esm/vs'
//   }
// })

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
    // <Editor
    //   height="400px"
    //   // defaultLanguage="markdown"
    //   // defaultValue="// some comment"
    //   language="markdown"
    //   theme="vs-dark"
    //   value={content}
    //   onChange={onChange}
    //   // onMount={handleEditorDidMount}
    // />
    <MonacoEditor
      width={width ?? '100%'}
      height={height ?? '400'}
      theme="vs-dark"
      value={content}
      language="markdown"
      options={{
        lineNumbers: 'off',
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
      }}
      onChange={onChange}
    />
  )
}
