/**
 * JUMPLIST
 */

import fs from 'fs'
import path from 'path'
import { app } from 'electron'

console.log('Jumplist')

const settings = app.getJumpListSettings()

console.log(settings)

const location = path.join(process.resourcesPath, 'out', 'JumpList.json')

if (fs.existsSync(location)) {
  const file = fs.readFileSync(location).toString()

  try {
    app.setJumpList(JSON.parse(file))
  } catch {
    console.log("Couldn't set the Jumplist.")
  }
}

app.setUserTasks([
  {
    title: 'New Window',
    description: 'Create a new window',
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0
  },
  {
    title: 'New Private Window',
    description: 'Create a new Private window',
    program: process.execPath,
    arguments: '--new-window --private',
    iconPath: process.execPath,
    iconIndex: 0
  }
])
