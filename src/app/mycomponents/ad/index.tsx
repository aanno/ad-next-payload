import { ad2Html } from '@/lib/api'

export default async function Ad({ content = '' }) {
  const ad = ad2Html(content)
  console.log('data:', JSON.stringify(ad))

  // return <main></main>
  return <div dangerouslySetInnerHTML={{ __html: ad }} />
}
