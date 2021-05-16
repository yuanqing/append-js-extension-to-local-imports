import globby from 'globby'
import fs from 'fs-extra'

export async function appendJsExtensionToLocalImports (globPatterns) {
  const files = await globby(globPatterns)
  for (const file of files) {
    const contents = await fs.readFile(file, 'utf8')
    await fs.outputFile(file, replace(contents))
  }
}

const localImportRegex = /(import {?[^'"}]+}? from )(['"])(\.\.?\/[^'"]+)(\2\n)/g
const jsExtensionRegex = /\.js$/

export function replace (string) {
  return string.replace(localImportRegex, function (match, m1, m2, m3, m4) {
    if (jsExtensionRegex.test(m3) === true) {
      // already has the `.js` extension
      return match
    }
    return `${m1}${m2}${m3}.js${m4}`
  })
}
