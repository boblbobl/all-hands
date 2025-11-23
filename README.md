# Server-Client Interaction Project

A real-time web application featuring a server dashboard and multiple client controllers connected via WebSockets. Clients can trigger animations on the server dashboard by clicking a button.

## Features

- 🖥️ **Server Dashboard**: Displays connection instructions, real-time client count, button click statistics, and animated effects
- 🎮 **Client Control Panel**: Connect using a simple key and trigger animations on the server
- 🔄 **Real-time Communication**: WebSocket-based instant updates across all connected clients
- 🎨 **Animated Effects**: Colorful pulse animations triggered by client button clicks
- 📊 **Activity Logging**: Live activity feed showing all client interactions

## Project Structure

```
all-hands/
├── server.js           # Node.js server with Express and Socket.IO
├── package.json        # Project dependencies
├── public/
│   ├── server.html    # Server dashboard interface
│   └── client.html    # Client control interface
└── README.md          # This file
```

## Installation

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **Install dependencies**
   ```bash
   npm install
   ```

## Usage

### Starting the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

You should see output like:
```
Server running on http://localhost:3000
Client page: http://localhost:3000/client
Connection key: allhands2024
```

### Accessing the Dashboard

Open your browser and navigate to:
```
http://localhost:3000
```

This is the server dashboard that displays:
- Connection instructions
- Number of connected clients
- Button click count
- Animated effects when clients interact
- Activity log

### Connecting Clients

1. Open the client page in a new browser tab or on another device:
   ```
   http://localhost:3000/client
   ```

2. Enter the connection key: `allhands2024`

3. Click "Connect to Server"

4. Once connected, click the "🎯 Trigger Animation" button to create animated effects on the server dashboard

### Multiple Clients

You can open multiple client pages simultaneously:
- In different browser tabs
- In different browsers
- On different devices (make sure they're on the same network)

Each client connection will be tracked on the server dashboard, and any client can trigger animations that all viewers will see.

## Configuration

### Changing the Connection Key

Edit `server.js` and modify the `CONNECTION_KEY` constant:

```javascript
const CONNECTION_KEY = 'your-new-key-here';
```

### Changing the Port

Set the `PORT` environment variable or edit `server.js`:

```javascript
const PORT = process.env.PORT || 3000;
```

Or run with a custom port:
```bash
PORT=8080 npm start
```

## Technology Stack

- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.IO
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Modern CSS with gradients and animations

## How It Works

1. **Server Setup**: Express server serves static HTML files and establishes WebSocket connections via Socket.IO

2. **Client Authentication**: Clients must provide the correct key to authenticate and establish a connection

3. **Real-time Updates**: 
   - Client count updates are broadcast to all connected sockets
   - Button clicks from any client trigger animations on all viewing dashboards
   - Activity logs update in real-time

4. **WebSocket Events**:
   - `authenticate`: Client sends connection key
   - `authSuccess`/`authError`: Server responds to authentication attempt
   - `buttonClick`: Client triggers an animation
   - `triggerAnimation`: Server broadcasts animation to all clients
   - `clientCount`: Server broadcasts updated client count

## Troubleshooting

**Port already in use:**
```bash
# Find and kill the process using port 3000
lsof -ti:3000 | xargs kill
# Or use a different port
PORT=8080 npm start
```

**Cannot connect from another device:**
- Ensure devices are on the same network
- Use your computer's IP address instead of localhost
- Check firewall settings

**Authentication fails:**
- Verify the connection key matches the one in `server.js`
- Check browser console for error messages

## License

MIT
