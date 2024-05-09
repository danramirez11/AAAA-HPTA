const PORT = 3000;

const socket = io(`http://localhost:${PORT}`);

const div = document.querySelector('.div');

socket.on('counter', (counter) => {
    div.innerHTML = `<h2>Counter: ${counter}</h2>`;
});