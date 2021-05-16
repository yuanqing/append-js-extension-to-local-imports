import globby from 'globby'
import fs from 'fs-extra'

export async function appendJsExtensionToLocalImports (globPatterns) {
  const files = await globby(globPatterns)
  for (const file of files) {
    const contents = await fs.readFile(file, 'utf8')
    await fs.outputFile(file, replace(contents))
  }
}

const localImportRegex = /(import {?[^}'"]+}? from )(['"])(\.\.?\/[^'"]+)(\2\n)/g

export function replace (string) {
  return string.replace(localImportRegex, '$1$2$3.js$4')
}
