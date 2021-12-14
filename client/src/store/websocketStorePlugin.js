export default function createWebSocketPlugin (socket) {
  return (store) => {
    // Receiving events from the DJ
    socket.on('broadcasted:song:play', (msg) => {
      console.log("NOTIFICATION: Play song");
      store.commit('SET_PLAY_STATE', true)
    });
    socket.on('broadcasted:song:pause', (msg) => {
      console.log("NOTIFICATION: Pause song");
      store.commit('SET_PLAY_STATE', false)
    });
    socket.on('broadcasted:song:change', (songIndex) => {
      console.log("NOTIFICATION: Change song", songIndex);
      store.commit('SET_CURRENT_SONG_INDEX', songIndex)
    });

    // User (king) sending messages to listeners
    store.subscribe(mutation => {
      // Toggling the playing state, notify the listeners
      if (mutation.type === 'SET_PLAY_STATE') {
        if (mutation.payload === true) {
          socket.emit('song:play', {'room': store.state.roomID})
        } else {
          socket.emit('song:pause', {'room': store.state.roomID})
        }
      }
      // User changes the song, notify all listeners of new index
      if (mutation.type === 'SET_CURRENT_SONG_INDEX') {
        socket.emit('song:change', {
          'room': store.state.roomID,
          'song': mutation.payload
        });
      }
    })
  }
}