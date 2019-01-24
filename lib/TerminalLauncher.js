'use strict'
const opn = require('opn')
const debug = require('debug')('opn-shell')

const terminalAppsInfo = [
  // MacOS variations of terminal apps
  'Hyper',
  'iTerm',
  'terminal.app',
  // Linux variations of terminal apps
  ['x-terminal-emulator', '-e'],
  ['gnome-terminal', '-e'],
  ['konsole', '-e'],
  ['xterm', '-e'],
  ['urxvt', '-e'],
  [process.env.COLORTERM, '-e'],
  [process.env.XTERM, '-e']
]

class TerminalLauncher {
  static launchTerminal({path} = {}) {
    if (!path) {
      throw new Error('no program path provided to launch')
    }

    debug('executing: %s', path)
    const shellLauncher = TerminalLauncher.getTerminals(path).reduce((promise, nextPromise) => {
      return promise.catch(nextPromise)
    }, Promise.reject()) /* eslint prefer-promise-reject-errors: "off" */

    return shellLauncher
  }

  static getTerminals(path) {
    const terminalApps = terminalAppsInfo.map(appInfo => {
      debug('adding terminal configuration: %s', appInfo.toString())
      return () => opn(path, {app: appInfo})
    })

    terminalApps.push(() => opn(path))
    return terminalApps
  }
}

module.exports = TerminalLauncher
