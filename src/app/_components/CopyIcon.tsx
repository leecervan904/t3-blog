'use client'

import { useCallback, useState } from 'react'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'

import { useClipboard } from '~/hooks/browser/useClipbpard'

export default function CopyIcon({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const { copy } = useClipboard()

  const onCopy = useCallback(() => {
    copy(text)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000);
  }, [])

  return (
    <span className="z-10 absolute p-1 top-2 right-2 rounded">
      {!copied ? (
        <CopyOutlined onClick={onCopy} />
      ) : (
        <span className="tooltip tooltip-open tooltip-left tooltip-primary text-gray-500" data-tip="Copied!">
          <CheckOutlined />
        </span>
      )}
    </span>
  )
}
