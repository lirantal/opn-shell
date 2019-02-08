'use strict'

function getTerminals(executablePath) {
  const module = /^win/i.test(process.platform)
    ? './get-terminals-windows'
    : './get-terminals-linux'
  return require(module)(executablePath)
}

module.exports = getTerminals
