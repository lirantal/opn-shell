'use strict'

const opn = require('opn')
const debug = require('debug')('opn-shell')

function getLinuxTerminalHandlers(path) {
  const terminalApps = [
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

  const handlers = terminalApps.map(appInfo => {
    debug('adding terminal configuration: %s', appInfo.toString())
    return () => opn(path, {app: appInfo})
  })

  handlers.push(() => opn(path))
  return handlers
}

module.exports = getLinuxTerminalHandlers
