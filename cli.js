#!/usr/bin/env node
import { appendJsExtensionToLocalImports } from './index.js'

async function main () {
  await appendJsExtensionToLocalImports(process.argv.slice(2))
}
main()
