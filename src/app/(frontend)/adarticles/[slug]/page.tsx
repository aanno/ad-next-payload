import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import { generateMeta } from '../../../utilities/generateMeta'

async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const posts = await payload.find({
    collection: 'adArticles',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return posts.docs?.map(({ slug }) => slug)
}

export default async function AdArticle({ params: { slug = '' } }) {
  const url = '/adarticles/' + slug
  const article = await queryAdArticleBySlug({ slug })

  if (!article) return <PayloadRedirects url={url} />

  return <article className="pt-16 pb-16"></article>
}

async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const post = await queryAdArticleBySlug({ slug })

  // return generateMeta({ doc: post })
  return {
    title: post.title,
  }
}

const queryAdArticleBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'adArticles',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
