/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // /test 配下での検証用(本番デプロイ前に必ず外すこと)
  basePath: '/test',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/test',
  },
}

export default nextConfig
