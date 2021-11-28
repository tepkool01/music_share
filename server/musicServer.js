// const os = require('os');
// import os from 'os'

const http = require('http');
// const { Server } = require("socket.io");
// import http from 'http'
// import { Server } from 'socket.io'
// Create express and port
const port = process.env.PORT || 5000;

// Web Socket / Long polling with socket.io
const server = http.createServer();
const io = require("socket.io")(server, {
	allowEIO3: true,
	cors: {
		origin: "http://localhost:8080",
		methods: ["GET", "POST"],
		credentials: true
	}
});

// Socket handlers [imports]-- files that are used as 'listeners' for data from the client (front-end javascript)
// these socket handlers respond back to the client application in real time, as the client is listening
const registerInitHandlers = require('./socket_handlers/initHandler');
const registerRoomHandlers = require('./socket_handlers/roomHandler');
const registerSongHandlers = require('./socket_handlers/songHandler');
const registerKingHandlers = require('./socket_handlers/kingHandler');

// Socket events
io.on('connection', (socket) => {
	console.log("connect");
	registerInitHandlers(io, socket); // user connect, disconnect, etc
	registerRoomHandlers(io, socket); // user changes a room
	registerSongHandlers(io, socket); // user changes a song
	registerKingHandlers(io, socket);
});

// Start server
server.listen(port, () => {
	// let privateIP = getPrivateIP();
	// console.log('Private Network IP: http://' + privateIP + ':' + port)
	// console.log('listening on *:' + port);
	console.log('Server started at http://localhost:' + port);
});


// Static Routes
// app.use(express.static(__dirname + '/public'));
// app.get('/', function(req, res) {
// 	res.sendFile(path.join(__dirname, '/index.html'));
// });



// function getPrivateIP() {
// 	// Get local network IP address
// 	let networkInterfaces = os.networkInterfaces();
// 	let privateIP = '';
// 	if (networkInterfaces.hasOwnProperty('Wi-Fi')) {
// 		privateIP = networkInterfaces['Wi-Fi'][4]['address'];
// 	} else if (networkInterfaces.hasOwnProperty('Ethernet')) {
// 		privateIP = networkInterfaces['Ethernet'][4]['address'];
// 	} else {
// 		console.log(networkInterfaces);
// 	}
// 	return privateIP;
// }
