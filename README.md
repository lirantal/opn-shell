<p align="center"><h1 align="center">
  opn-shell
</h1>

<p align="center">
  Execute shell commands and detect cross-platform terminal emulators
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/opn-shell"><img src="https://badgen.net/npm/v/opn-shell"alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/opn-shell"><img src="https://badgen.net/npm/license/opn-shell"alt="license"/></a>
  <a href="https://www.npmjs.org/package/opn-shell"><img src="https://badgen.net/npm/dt/opn-shell"alt="downloads"/></a>
  <a href="https://travis-ci.org/lirantal/opn-shell"><img src="https://badgen.net/travis/lirantal/opn-shell" alt="build"/></a>
  <a href="https://codecov.io/gh/lirantal/opn-shell"><img src="https://badgen.net/codecov/c/github/lirantal/opn-shell" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/lirantal/opn-shell"><img src="https://snyk.io/test/github/lirantal/opn-shell/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Security Responsible Disclosure" /></a>
</p>

# About

`opn-shell` allows you to execute shell commands in a terminal emulator window that opens either as a tab or a new window (depending on your terminal emulator) configuration.

It will automatically detect the available terminal emulators that exist in your OS and supports both MacOS and Linux, with a fallback to the associated program on Windows.

# Install

```bash
npm install --save opn-shell
```

# Usage

Call `opn-shell()` with a full path to an executable that will be launched in a terminal window.

If the promise returned by `opn-shell()` rejects then it failed to detect and open a terminal window.

```js
// @TODO
const TerminalLauncher = require('opn-shell')

const executable = '/usr/local/bin/my-shell-program.sh'
TerminalLauncher.launchTerminal({ path: executable }).catch(err => {
  console.log(err)
})
```

## CLI

```shell
npx opn-shell my-shell-program.sh
```

# Contributing

Please consult [CONTIRBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**opn-shell** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.
