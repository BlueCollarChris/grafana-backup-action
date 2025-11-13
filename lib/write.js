'use strict'

import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { outputFolder, overwriteFiles } from '../config.js'

const datePrefix = new Date().toISOString().split('T')[0]
const backupDir = overwriteFiles
  ? join(process.cwd(), outputFolder)
  : join(process.cwd(), outputFolder, datePrefix)

let backupDirExists = {}

export const write = async (directory, filename, data) => {
  console.log(`writing: ${directory}/${filename}`)

  if (!backupDirExists[directory]) {
    await mkdir(join(backupDir, directory), { recursive: true })
    backupDirExists[directory] = true
  }

  const file = join(backupDir, directory, filename)
  await writeFile(file, JSON.stringify(data, null, 2))
}
