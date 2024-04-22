const express = require('express');
const http = require('http');
const { SerialPort, ReadlineParser } = require('serialport');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
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

    if (String(data).includes('VALUES')) {
        const numbers = data.split(':')[1];
        const X = parseInt(numbers.split(',')[0]);
        const Y = parseInt(numbers.split(',')[1]);
        console.log(`X: ${X}, Y: ${Y}`);
    }
});


port.on('error', (err) => {
    console.log('Error: ', err.message);
});

io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado`);

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
})

app.get('/socket.io/socket.io.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    // Serve the socket.io.js file (replace with the actual path)
    res.sendFile('/node_modules/socket.io/socket.io.js');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});