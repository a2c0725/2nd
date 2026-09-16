/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // test2016/ 配下での検証用(本番デプロイ前に必ず外すこと)
  basePath: '/test2016',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/test2016',
  },
}

export default nextConfig
