import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkHeadingId from 'remark-heading-id'
import rehypeKatex from 'rehype-katex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import 'katex/dist/katex.min.css'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

import CopyIcon from '../CopyIcon'

export interface IMarkdownViewerProps {
  content: string
}

export default function MarkdownViewer({ content }: IMarkdownViewerProps) {
  const renderers: Components = {
    code(props) {
      const { ref, children, className, ...rest } = props
      const match = /language-(\w+)/.exec(className ?? '')
      const rawCodeString = String(children).replace(/\n$/, '')

      const CodeBlock = match ? (
        <SyntaxHighlighter
          {...rest}
          PreTag="div"
          children={rawCodeString}
          language={match[1]}
          style={ dracula }
          showLineNumbers
        />
      ) : (
        <code {...rest} className={className}>
          {children}
        </code>
      )

      return (
        <div className="relative">
          <CopyIcon text={rawCodeString} />
          {CodeBlock}
        </div>
      )
    },
  }

  return (
    <div className="markdown">
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath, remarkHeadingId]}
        rehypePlugins={[rehypeKatex, rehypeAutolinkHeadings]}
        components={renderers}
      >{content}</Markdown>
    </div>
  )
}
