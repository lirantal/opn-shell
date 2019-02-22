'use strict'
const getTerminals = require('./get-terminals')
const debug = require('debug')('opn-shell')

class TerminalLauncher {
  static launchTerminal({path} = {}) {
    if (!path) {
      throw new Error('no program path provided to launch')
    }

    debug('executing: %s', path)

    const shellLauncher = getTerminals(path).reduce(
      (promise, nextPromise) => promise.catch(nextPromise),
      Promise.reject()
    ) /* eslint prefer-promise-reject-errors: "off" */

    return shellLauncher
  }
}

module.exports = TerminalLauncher
