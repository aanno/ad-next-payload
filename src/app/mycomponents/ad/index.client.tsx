'use client'

import { ad2Html } from "@/lib/api"
import rehypeParse from "node_modules/rehype-parse/lib"
import rehypeReact from "node_modules/rehype-react/lib"
import { createElement } from "react"
import { unified } from "unified"
import * as prod from 'react/jsx-runtime';

const production = {createElement: createElement, Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs}

export default async function AdClient({ content = '' }) {
  const html = ad2Html(content)
  console.log('html:', JSON.stringify(html))
  // hint: Promise in next.js client is not allowed
  const pipe = await unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeReact, production)
    .processSync(html).result

  return (<>{pipe}</>)
}
