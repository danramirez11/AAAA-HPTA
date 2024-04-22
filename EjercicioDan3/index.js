const express = require('express');
const http = require('http');
const { SerialPort, ReadlineParser } = require('serialport');
const cors = require('cors');
const taskService = require('./services/lightServices');

const app = express();
const server = http.createServer(app);
const PORT = 3000;

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const port = new SerialPort({
    path: 'COM5',
    baudRate: 9600,
});
const parser = new ReadlineParser({ delimiter: '\r\n' });
port.pipe(parser);


parser.on('data', (data) => {
    console.log(`Data received: ${data}`);

    if (String(data).includes('LIGHTLEVEL')) {
        const level = data.split(':')[2];
        console.log(`nivel de luz: ${level}`);

        taskService.createTask({ "nivel": String(level) });
    }
});


port.on('error', (err) => {
    console.log('Error: ', err.message);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});