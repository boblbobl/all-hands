const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;
const CONNECTION_KEY = 'allhands'; // Simple key for client connections

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'server.html'));
});

app.get('/client', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client.html'));
});

// Track connected clients
let connectedClients = 0;

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('New socket connection:', socket.id);

  // Handle client authentication
  socket.on('authenticate', (key) => {
    if (key === CONNECTION_KEY) {
      socket.authenticated = true;
      connectedClients++;
      
      // Notify all sockets about the new client count
      io.emit('clientCount', connectedClients);
      
      socket.emit('authSuccess', { message: 'Connected successfully!' });
      console.log(`Client authenticated. Total clients: ${connectedClients}`);
    } else {
      socket.emit('authError', { message: 'Invalid connection key' });
    }
  });

  // Handle button click from client
  socket.on('buttonClick', (data) => {
    if (socket.authenticated) {
      console.log(`Animation triggered by client ${socket.id}: ${data.animationType}`);
      // Broadcast animation trigger to all connected sockets (including server dashboard)
      io.emit('triggerAnimation', {
        clientId: socket.id,
        timestamp: Date.now(),
        animationType: data.animationType
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (socket.authenticated) {
      connectedClients--;
      io.emit('clientCount', connectedClients);
      console.log(`Client disconnected. Total clients: ${connectedClients}`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Client page: http://localhost:${PORT}/client`);
  console.log(`Connection key: ${CONNECTION_KEY}`);
});
