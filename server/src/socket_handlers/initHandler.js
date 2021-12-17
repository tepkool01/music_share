module.exports = (io, socket) => {
	const connections = new Set()

	const connectUser = () => {
		console.log(">>connectUser", socket.id);
		connections.add(socket.id)
		console.log("current connections: ", connections)
	};

	const disconnectUser = () => {
		console.log(">>disconnectUser");
	};

	io.once('connect', connectUser);
	socket.once('disconnect', disconnectUser);
};