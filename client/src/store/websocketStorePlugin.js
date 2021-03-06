// broadcasted: true/false is the most important part here, as it allows us to communicate with the backend server and
// manage the 'state'. If user A sends an isKing request, this is what will happen:
// 1. User sends isKing request, which modifies the local state of isKing to true
// 2. isKing state being set to true automatically fires a socket emit event to notify all the users
// 3. Users receive the event, which disables their king status (updates their state)
// To prevent the audience from triggering their own event in an infinite loop, we must have 'broadcasted' set to true or false
// to determine where the message is coming from
const SONG_DRIFT = 5 // max amount of seconds allowed for song 'drift' between the king and the listeners

export default function createWebSocketPlugin (socket) {
  return (store) => {
    // Receiving events from the DJ
    socket.on('broadcasted:song:play', (msg) => {
      console.log("NOTIFICATION: Play song");
      store.commit('SET_PLAY_STATE', { broadcasted: true, playState: true })
    });
    socket.on('broadcasted:song:pause', (msg) => {
      console.log("NOTIFICATION: Pause song");
      store.commit('SET_PLAY_STATE', { broadcasted: true, playState: false })
    });
    socket.on('broadcasted:song:change', (songIndex) => {
      console.log("NOTIFICATION: Change song", songIndex);
      store.commit('SET_CURRENT_SONG_INDEX', { broadcasted: true, songIndex: songIndex })
    });
    socket.on('broadcasted:song:seek', (seekTime) => {
      console.log("NOTIFICATION: Seek song", seekTime)
      store.commit('SET_SONG_TIME', seekTime)
    })
    socket.on('broadcasted:king:change', (msg) => { // notified that someone else took control
      console.log("NOTIFICATION: Change ownership");
      store.commit('SET_KING', { broadcasted: true, isKing: false })
    });
    socket.on('broadcasted:song:sync', (payload) => { // notified of a sync event from the king to match up songs and times
      console.log("NOTIFICATION: Verifying music synced", payload);
      if (payload.songIndex !== store.state.currentSongIndex) {
        console.log("SONG INDEX WRONG")
        store.commit('SET_CURRENT_SONG_INDEX', { broadcasted: true, songIndex: payload.songIndex })
      }
      if (Math.abs(payload.songTime - store.state.currentSongTime) > SONG_DRIFT) {
        console.log("SONG DRIFT DETECTED")
        store.commit('SET_SONG_TIME', payload.songTime)
      }
      store.commit('SYNC_SONG', { broadcasted: true, isSync: true })
    });
    socket.on('broadcasted:playlist:change', (msg) => { // notified that someone else took control
      console.log("NOTIFICATION: Change ownership");
      store.commit('SET_KING', { broadcasted: true, isKing: false })
    });
    // todo does this work?
    socket.on('disconnect', () => {
      console.log("Disconnect")
      socket.removeAllListeners()
    })

    // User (king) sending messages to listeners
    store.subscribe(mutation => {
      // ignore broadcasted events
      if (mutation.payload.broadcasted === true) return

      // Toggling the playing state, notify the listeners
      if (mutation.type === 'SET_PLAY_STATE') {
        if (mutation.payload.playState === true) {
          socket.emit('song:play', {roomID: store.state.roomID})
        } else {
          socket.emit('song:pause', {roomID: store.state.roomID})
        }
      }
      // User changes the song, notify all listeners of new index
      if (mutation.type === 'SET_CURRENT_SONG_INDEX') {
        socket.emit('song:change', {
          roomID: store.state.roomID,
          song: mutation.payload.songIndex,
        });
      }
      // User changes their room
      if (mutation.type === 'SET_ROOM') {
        socket.emit('room:change', mutation.payload)
      }
      // User becomes KING
      if (mutation.type === 'SET_KING') {
        socket.emit('king:change', {
          roomID: store.state.roomID,
          isKing: mutation.payload.isKing,
        })
      }
      // User uses the seek option on the song
      if (mutation.type === 'SEEK_SONG') {
        socket.emit('song:seek', {
          roomID: store.state.roomID,
          songTime: mutation.payload,
        })
      }
      // Routine checks to see if the listener is on the same song/same song time as the king
      if (mutation.type === 'SYNC_SONG') {
        socket.emit('song:sync', {
          roomID: store.state.roomID,
          songTime: store.state.currentSongTime,
          songIndex: store.state.currentSongIndex,
        })
      }
      // Routine checks to see if the listener is on the same song/same song time as the king
      if (mutation.type === 'SET_PLAYLIST') {
        socket.emit('playlist:change', {
          roomID: store.state.roomID,
          playlist: store.state.currentSongTime,
        })
      }
    })
  }
}