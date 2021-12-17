module.exports = (io, socket) => {
	const changeKing = (payload) => {
		console.log(">>changeKing - changing king to:" + JSON.stringify(payload));
		socket.broadcast.to(payload.roomID).emit('broadcasted:king:change', payload);
	};

	socket.on("king:change", changeKing);
};
