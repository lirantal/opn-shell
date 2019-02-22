/* eslint-disable security/detect-child-process */
'use strict'

const debug = require('debug')('opn-shell')
const path = require('path')
const childProcess = require('child_process')

function getWindowsTerminalHandlers(scriptPath) {
  const extension = path.extname(scriptPath).toLowerCase()
  const logAddedTerminal = terminal => debug(`'adding terminal configuration: ${terminal}'`)

  let command
  if (getCmdSupportedExtensions().includes(extension)) {
    command = `start cmd /c "${scriptPath}"`
    logAddedTerminal('cmd')
  } else {
    command = `start powershell "${scriptPath}"`
    logAddedTerminal('powershell')
  }

  const handler = () =>
    new Promise((resolve, reject) => {
      const cp = childProcess.exec(command)

      cp.once('error', reject)
      cp.once(
        'close',
        code => (code === 0 ? resolve(cp) : reject(new Error('Exited with code ' + code)))
      )
    })

  return [handler]
}

function getCmdSupportedExtensions() {
  // PATHEXT contains semicolon separated list of file extensions which are considered to be executable by Windows
  // (runnable by cmd)
  const extensions = process.env.PATHEXT.toLowerCase().split(';')
  return extensions
}

module.exports = getWindowsTerminalHandlers
