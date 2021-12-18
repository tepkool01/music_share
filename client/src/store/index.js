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
			currentSongTime: 0,
			songs: [
				{name: 'It\'s Raining Tacos', URL: 'music.mp3'},
				{name: 'The Ultimate Showdown', URL: 'https://archive.org/download/calexico2006-12-02..flac16/calexico2006-12-02d1t02.mp3'},
				{name: 'Dragostea din tei', URL: '9-03 Dragostea din tei.mp3'},
				{name: 'i dont know', URL: 'https://archive.org/download/ra2007-07-21/ra2007-07-21d1t05_64kb.mp3'},
			],
			isPlaying: false,
			isKing: false,
			inSync: true,
		}
	},
	// Actions are ASYNCHRONOUS
	actions: {
		changeRoom ({ commit }, payload) {
			// todo: make API call to notify of person leaving?
			commit('SET_ROOM', payload)
		},
		changePlayState ({ commit }, payload) {
			commit('SET_PLAY_STATE', payload)
		},
		changeSong ({ commit }, payload) {
			commit('SET_CURRENT_SONG_INDEX', payload)
		},
		changeKing ({ commit }, payload) {
			commit('SET_KING', payload)
		},
		seekSong ({ commit }, payload) {
			commit('SEEK_SONG', payload)
		},
		syncSong ({ commit }, payload) {
			commit('SYNC_SONG', payload)
		}
	},
	// Mutations are SYNCHRONOUS
	mutations: {
		SET_ROOM: (state, payload) => state.roomID = payload,
		SET_PLAY_STATE: (state, payload) => state.isPlaying = payload.playState,
		SET_CURRENT_SONG_INDEX: (state, payload) => state.currentSongIndex = payload.songIndex,
		SET_KING: (state, payload) => state.isKing = payload.isKing,
		SET_SONG_TIME: (state, payload) => state.currentSongTime = payload, // i know these are duplicates, one is for general song time updates, SEEK song is a deliberate action
		SEEK_SONG: (state, payload) => state.currentSongTime = payload,
		SYNC_SONG: (state, payload) => state.inSync = payload.isSync,
	},

	strict: debug,
	plugins: debug ? [createLogger(), websocketPlugin] : [websocketPlugin],
})
