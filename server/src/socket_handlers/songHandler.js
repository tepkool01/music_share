module.exports = (io, socket) => {
	const changeSong = (payload) => {
		console.log(">>changeSong - changing song to:" + JSON.stringify(payload));
		socket.broadcast.to(payload.roomID).emit('broadcasted:song:change', payload.song);
	};
	const pauseSong = (payload) => {
		console.log(">>pauseSong - pausing song:" + JSON.stringify(payload));
		socket.broadcast.to(payload.roomID).emit('broadcasted:song:pause', payload.roomID);
	};
	const playSong = (payload) => {
		console.log(">>playSong - playing song:" + JSON.stringify(payload));
		socket.broadcast.to(payload.roomID).emit('broadcasted:song:play', payload.roomID);
	};
	const seekSong = (payload) => {
		console.log(">>seekSong - seeking to:" + JSON.stringify(payload));
		socket.broadcast.to(payload.roomID).emit('broadcasted:song:seek', payload.songTime)
	}
	const syncSong = (payload) => {
		console.log(">>syncSong - syncing to:" + JSON.stringify(payload));
		socket.broadcast.to(payload.roomID).emit('broadcasted:song:sync', payload)
	}

	socket.on("song:change", changeSong);
	socket.on("song:pause", pauseSong);
	socket.on("song:play", playSong);
	socket.on("song:seek", seekSong);
	socket.on("song:sync", syncSong);
};