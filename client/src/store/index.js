import { createStore, createLogger } from 'vuex'
import createWebSocketPlugin from './websocketStorePlugin'
import { io } from 'socket.io-client'

const socket = io("http://localhost:5000")
const websocketPlugin = createWebSocketPlugin(socket)
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
	state () {
		return {
			roomID: 0,
			currentSongIndex: 0,
			songs: [
				{name: 'It\'s Raining Tacos', URL: 'music.mp3'},
				{name: 'The Ultimate Showdown', URL: 'https://archive.org/download/calexico2006-12-02..flac16/calexico2006-12-02d1t02.mp3'},
			],
			isPlaying: false,
			isKing: false,
		}
	},
	// Actions are ASYNCHRONOUS
	actions: {
		changeRoom ({ commit }, roomID) {
			// todo: make API call to notify of person leaving?
			commit('SET_ROOM', roomID)
		},
		changePlayState ({ commit }, isPlaying) {
			commit('SET_PLAY_STATE', isPlaying)
		},
		changeSong ({ commit }, songIndex) {
			commit('SET_CURRENT_SONG_INDEX', songIndex)
		}
	},
	// Mutations are SYNCHRONOUS
	mutations: {
		SET_ROOM: (state, ID) => state.roomID = ID,
		SET_PLAY_STATE: (state, newPlayState) => state.isPlaying = newPlayState,
		SET_CURRENT_SONG_INDEX: (state, songIndex) => state.currentSongIndex = songIndex,
	},

	strict: debug,
	plugins: debug ? [createLogger(), websocketPlugin] : [websocketPlugin],
})
