import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

import CopyIcon from '../CopyIcon'

export interface IMarkdownViewer {
  content: string
}
export default function MarkdownViewer({ content }: IMarkdownViewer) {
  return (
    <div className="markdown">
      <Markdown
        rehypePlugins={[rehypeKatex]}
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
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
          }
        }}
      >{content}</Markdown>
    </div>
  )
}
