import { ad2Html } from '@/lib/api'
import { createElement } from 'react'
import { unified } from 'unified';
import rehypeReact from 'rehype-react';
import rehypeParse from 'rehype-parse';
import * as prod from 'react/jsx-runtime';

export async function AdOld({ content = '' }) {
  const ad = ad2Html(content)
  console.log('data:', JSON.stringify(ad))

  // return <main></main>
  return <div dangerouslySetInnerHTML={{ __html: ad }} />
}

const production = {createElement: createElement, Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs}

export default async function Ad({ content = '' }) {
  const html = ad2Html(content)
  console.log('html:', JSON.stringify(html))
  const pipe = await unified()
    .use(rehypeParse , {fragment: true})
    .use(rehypeReact, production)
    .process(html)
    .then((res) => res.toString())
  console.log('pipe:', JSON.stringify(pipe))

  return <div dangerouslySetInnerHTML={{ __html: pipe }} />
  // return (<>{pipe}</>)
}
