import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface IMarkdownViewer {
  content: string
}

export default function MarkdownViewer({ content }: IMarkdownViewer) {
  return (
    <div className="markdown">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  )
}
