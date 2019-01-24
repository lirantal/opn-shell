const TerminalLauncher = require('../index')
const opn = require('opn')
jest.mock('opn')

describe('Terminal Launcher', () => {
  test('launching a terminal requires a path to be provided', () => {
    expect(() => {
      TerminalLauncher.launchTerminal()
    }).toThrow()
  })

  test('launching a terminal calls opn with the correct params', async () => {
    const path = '/usr/local/bin/non-existent.sh'

    await TerminalLauncher.launchTerminal({path})
    expect(opn).toHaveBeenCalled()

    const calledWithFirstArgument = opn.mock.calls[0][0]
    expect(calledWithFirstArgument).toEqual(path)
  })

  test('terminals are a list of functions', () => {
    const terminals = TerminalLauncher.getTerminals()
    expect(Array.isArray(terminals)).toBeTruthy()
    expect(terminals.length).toBeTruthy()
    expect(typeof terminals[0] === 'function').toBeTruthy()
  })
})
