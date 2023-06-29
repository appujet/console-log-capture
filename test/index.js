import {ConsoleLogCapture} from '../dist/index.js'


const logCapture = new ConsoleLogCapture()

logCapture.start()

console.log('Hello')

console.log('Namaste')

console.log('Hola')

console.log('Bonjour')

console.log('Ciao')

console.log('Zdravstvuyte')

console.log('Konnichiwa')

console.log('Guten Tag')

console.log('Olá')

console.log('Anyoung haseyo')

console.log('Salam')

console.log('Merhaba')

console.log('Szia')

console.log('Hallo')



logCapture.stop()


const timeFormat = new Date();
const start = "2023-6-30-3:00"; // date format: yyyy-mm-dd-hh:mm
const end = timeFormat.getFullYear() + '-' + (timeFormat.getMonth() + 1) + '-' + timeFormat.getDate() + '-' + timeFormat.getHours() + ':' + timeFormat.getMinutes();
console.log(logCapture.getCapturedLogs(start, end));
