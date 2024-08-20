// lib/api.ts
import Asciidoctor from 'asciidoctor'

const asciidoctor = Asciidoctor()

export const ad2Html: (ad: string) => string = (ad: string) => {
  const html = asciidoctor.convert(ad, {
    safe: 'safe',
    standalone: false,
  })
  return html as string
}
