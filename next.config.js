import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  redirects,
  // https://www.highlight.io/blog/lw5-next-js-server-sourcemaps
  // https://webpack.js.org/configuration/devtool/
  // https://github.com/vercel/next.js/issues/918
  // https://github.com/vercel/next.js/issues/1903
  // https://nextjs.org/docs/messages/improper-devtool
  // https://github.com/vercel/next.js/discussions/66960
  /*
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      config.mode = 'development'
      // config.devtool = 'source-map'
      config.devtool = 'eval-source-map'
      // config.output['sourceMapFilename'] = '[file].map[query]'
      // console.log(JSON.stringify(config.devtool))
      // console.log(JSON.stringify(config.output))
    }
    return config
  },
  */
}

export default withPayload(nextConfig)
