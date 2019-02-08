/* eslint-disable security/detect-child-process */
const TerminalLauncher = require('../index')
const getTerminals = require('../lib/get-terminals')

const opn = require('opn')
const childProcess = require('child_process')

jest.mock('opn')

describe('Terminal Launcher', () => {
  test('launching a terminal requires a path to be provided', () => {
    expect(() => {
      TerminalLauncher.launchTerminal()
    }).toThrow()
  })

  describe('Linux', () => {
    beforeAll(() => {
      Object.defineProperty(process, 'platform', {
        value: 'linux'
      })
    })

    test('launching a terminal calls opn with the correct params when running on linux', async () => {
      const path = '/usr/local/bin/non-existent.sh'

      await TerminalLauncher.launchTerminal({path})
      expect(opn).toHaveBeenCalled()

      const calledWithFirstArgument = opn.mock.calls[0][0]
      expect(calledWithFirstArgument).toEqual(path)
    })

    describe('get-terminals returns array of functions', () => {
      test('terminals are a list of functions', () => {
        const terminals = getTerminals('mock.ext')
        expect(Array.isArray(terminals)).toBeTruthy()
        expect(terminals.length).toBeTruthy()
        expect(typeof terminals[0] === 'function').toBeTruthy()
      })
    })
  })

  describe('Windows', () => {
    beforeAll(() => {
      Object.defineProperty(process, 'platform', {
        value: 'win32'
      })
    })

    beforeEach(() => {
      childProcess.exec = jest.fn(() => ({once: (type, c) => type === 'close' && c(0)}))
    })

    describe('launching a terminal calls child_process.exec with the correct command', () => {
      test('for powershell scripts', async () => {
        const path = 'C:\\script.ps1'
        const expectedCommand = 'start powershell "C:\\script.ps1"'

        await TerminalLauncher.launchTerminal({path})
        expect(childProcess.exec).toHaveBeenCalled()

        const calledWithFirstArgument = childProcess.exec.mock.calls[0][0]
        expect(calledWithFirstArgument).toEqual(expectedCommand)
      })

      test('for bat scripts', async () => {
        const path = 'C:\\script.bat'
        const expectedCommand = 'start cmd /c "C:\\script.bat"'

        await TerminalLauncher.launchTerminal({path})
        expect(childProcess.exec).toHaveBeenCalled()

        const calledWithFirstArgument = childProcess.exec.mock.calls[0][0]
        expect(calledWithFirstArgument).toEqual(expectedCommand)
      })
    })

    describe('get-terminals returns array of functions', () => {
      test('terminals are a list of functions', () => {
        const terminals = getTerminals('mock.ext')
        expect(Array.isArray(terminals)).toBeTruthy()
        expect(terminals.length).toBeTruthy()
        expect(typeof terminals[0] === 'function').toBeTruthy()
      })
    })
  })
})
