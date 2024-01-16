import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { read } from 'to-vfile'
import { unified } from 'unified'
import remark2rehype from 'remark-rehype'
import stringify from 'rehype-stringify'
import remarkParser from 'remark-parse'
import remarkHeadings from '@sveltinio/remark-headings'

const file = await unified()
  // .data('settings', { fragment: true })
  .use(remarkParser)
  .use(remarkHeadings)
  .use(stringify)
  .use(remark2rehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  // .process('## 123 $a^2$')
  .process(await read('./example.md'))

// export function 
