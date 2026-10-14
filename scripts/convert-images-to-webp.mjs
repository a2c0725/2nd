import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC_DIR = path.resolve(import.meta.dirname, '../assets/images/bg')
const OUT_DIR = path.resolve(import.meta.dirname, '../public/img/bg')

async function convert() {
  await mkdir(OUT_DIR, { recursive: true })
  const files = (await readdir(SRC_DIR)).filter((file) => file.endsWith('.jpg'))

  await Promise.all(
    files.map(async (file) => {
      const outFile = file.replace(/\.jpg$/, '.webp')
      await sharp(path.join(SRC_DIR, file))
        .webp({ quality: 80 })
        .toFile(path.join(OUT_DIR, outFile))
      console.log(`converted: ${file} -> ${outFile}`)
    }),
  )
}

convert()
