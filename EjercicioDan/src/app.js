
const { SerialPort, ReadlineParser } = require('serialport');

// Create a port
const port = new SerialPort({
    path: 'COM5',
    baudRate: 9600,
});

// Create a parser: eso es pa eso de los saltos de línea que se envían desde el Arduino
const parser = new ReadlineParser({ delimiter: '\r\n' });
port.pipe(parser);
// Creating the parser and piping can be shortened to:
// const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))

// Write data to the port

let counter = 0;

parser.write("START\n");

parser.on('data', (data) => {
    console.log('Data:', data);
});

// detect errors
port.on('error', (err) => {
    console.log('Error: ', err.message);
});
