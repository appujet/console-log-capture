# console-log-capture

### A library for capturing console logs

[![Build Status](https://travis-ci.org/brblacky/console-log-capture.svg?branch=master)](https://travis-ci.org/brblacky/console-log-capture)
[![Coverage Status](https://coveralls.io/repos/github/brblacky/console-log-capture/badge.svg?branch=master)](https://coveralls.io/github/brblacky/console-log-capture?branch=master)
[![npm version](https://badge.fury.io/js/console-log-capture.svg)](https://badge.fury.io/js/console-log-capture)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Installation

```bash
npm install console-log-capture
```
# Usage
```typescript
import ConsoleLogCapture from 'console-log-capture';

const consoleLogCapture = new ConsoleLogCapture();
consoleLogCapture.start();
console.log('Hello World!');
console.log('Hello World! Again!');
console.log('Hello World! Again! Again!');
console.log('Hello World! Again! Again! Again!');

// get all logs
console.log(consoleLogCapture.getCapturedLogs());
consoleLogCapture.stop();

// with date range
const timeFormat = new Date();
const start = "2023-6-30-3:00"; // date format: yyyy-mm-dd-hh:mm
const end = timeFormat.getFullYear() + '-' + (timeFormat.getMonth() + 1) + '-' + timeFormat.getDate() + '-' + timeFormat.getHours() + ':' + timeFormat.getMinutes();
console.log(consoleLogCapture.getCapturedLogs(start, end));

```

# Options

```typescript
import ConsoleLogCapture from 'console-log-capture';

const consoleLogCapture = new ConsoleLogCapture({
  fileName: 'my-logs.txt',
  location: './logs/'
});
consoleLogCapture.start();

```
