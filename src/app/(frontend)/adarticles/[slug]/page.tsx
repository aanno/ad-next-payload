import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'

import type { AdArticle } from '../../../../payload-types'

import { PostHero } from '../../../heros/PostHero'
import { generateMeta } from '../../../utilities/generateMeta'
import PageClient from './page.client'
import Ad from '@/mycomponents/ad'
import AdClient from '@/mycomponents/ad/index.client'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const posts = await payload.find({
    collection: 'adArticles',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return posts.docs?.map(({ slug }) => slug)
}

// TODO: rename?
export default async function Post({ params: { slug = '' } }) {
  const url = '/adarticles/' + slug
  const article = await queryAdArticleBySlug({ slug })

  if (!article) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <PostHero post={article} />

      <div className="flex flex-col gap-4 pt-8">
        <div className="container lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <Ad content={article.content} />
        </div>
        <div className="container lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <AdClient content={article.content} />
        </div>

        <RelatedPosts
          className="mt-12"
          docs={article.relatedPosts.filter((post) => typeof post === 'object')}
        />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const ad = await queryAdArticleBySlug({ slug })

  // TODO: fix meta for AdArticles
  // return generateMeta({ doc: ad })
  return {
    title: ad?.title || 'no-title',
  }
}

const queryAdArticleBySlug: (string) => Promise<AdArticle> = cache(
  async ({ slug }: { slug: string }) => {
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
  },
)
