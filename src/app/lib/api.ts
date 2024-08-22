// lib/api.ts
import Asciidoctor from 'asciidoctor'
import { register } from '@djencks/asciidoctor-mathjax'

const asciidoctor = Asciidoctor()
const registry = register(asciidoctor.Extensions.create())

export const ad2Html: (ad: string) => string = (ad: string) => {
  const html = asciidoctor.convert(ad, {
    safe: 'safe',
    standalone: false,
    extension_registry: registry,
  })
  return html as string
}
