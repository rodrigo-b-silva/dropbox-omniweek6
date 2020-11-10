const port = process.env.port || 3333;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const socket = require('socket.io');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/dropbox', { useNewUrlParser: true });

const app = express();
app.use(cors());

const server = require('http').Server(app);

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('connectRoom', (box) => {
    socket.join(box);
  });
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(port, () => {
  console.log(`App running on port ${port}`);
});
