const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { SerialPort, ReadlineParser } = require('serialport');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 5000;


app.use(cors());
app.use('/client', express.static(__dirname + '/public'));
app.use(express.json());

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


// Create a port
const port = new SerialPort({
    path: 'COM5',
    baudRate: 9600,
});

// Create a parser: eso es pa eso de los saltos de línea que se envían desde el Arduino
const parser = new ReadlineParser({ delimiter: '\r\n' });
port.pipe(parser);

let counter = 0;


parser.on('data', (data) => {
    console.log('Data:', data);

    if (String(data).includes('COUNTER')) {
        const number = parseInt(data.split(':')[1]);
        console.log('Number: ' + number);
        counter = number;
    }
});


app.get('/counter', (req, res) => {    
    res.json({ response: counter });
});


// detect errors
port.on('error', (err) => {
    console.log('Error: ', err.message);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});