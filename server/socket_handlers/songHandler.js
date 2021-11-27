module.exports = (io, socket) => {
	const changeSong = (payload) => {
		console.log(">>changeSong - changing song to:" + JSON.stringify(payload));
		socket.to(payload.room).emit('broadcasted:song:change', payload.song);
	};
	const pauseSong = (payload) => {
		console.log(">>pauseSong - pausing song:" + JSON.stringify(payload));
		socket.to(payload.room).emit('broadcasted:song:pause', payload.room);
	};
	const playSong = (payload) => {
		console.log(">>playSong - playing song:" + JSON.stringify(payload));
		socket.to(payload.room).emit('broadcasted:song:play', payload.room);
	};

	socket.on("song:change", changeSong);
	socket.on("song:pause", pauseSong);
	socket.on("song:play", playSong);
};