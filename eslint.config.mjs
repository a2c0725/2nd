// ESLint 9 (flat config) — Next.js 16
// `next lint` は Next 16 で廃止されたため、ESLint CLI を直接使う。
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
]

export default config
