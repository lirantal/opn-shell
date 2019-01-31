#!/usr/bin/env node

'use strict'

const TerminalLauncher = require('./lib/TerminalLauncher')
const scriptPath = process.argv[2]
const {resolve} = require('path')

if (scriptPath) {
  const path = resolve(scriptPath)
  TerminalLauncher.launchTerminal({path}).catch(err => {
    console.log(err)
    throw err
  })
}
