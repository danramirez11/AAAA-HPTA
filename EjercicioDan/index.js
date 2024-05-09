const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { SerialPort, ReadlineParser } = require('serialport');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

const PORT = 3000;
let counter = 0;

app.get('/counter', (req, res) => {
    res.json({ counter });
});
// SOCKET ****************************************************

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

// SERIAL PORT ***********************************************
const port = new SerialPort({
    path: 'COM5',
    baudRate: 9600,
});

const parser = new ReadlineParser({ delimiter: '\r\n' });
port.pipe(parser);

parser.on('data', (data) => {
    if (String(data).includes('COUNTER')) {
        const number = parseInt(data.split(':')[1]);
        counter = number;
        console.log('Counter:', counter);

        io.emit('counter', counter);
    }
});

port.on('error', (err) => {
    console.log('Error: ', err.message);
});


// SERVER ***************************************************

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});