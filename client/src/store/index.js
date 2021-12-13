import { createStore, createLogger } from 'vuex'

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
			isPlaying: false
		}
	},
	actions: {
		changeRoom ({ commit }, roomID) {
			commit('setRoom', roomID)
		},
		changePlayState ({ commit }, isPlaying) {
			commit('setPlayState', isPlaying)
		},
	},
	mutations: {
		setRoom (state, ID) { state.roomID = ID },
		setPlayState (state, newPlayState ) { state.isPlaying = newPlayState }
	},

	strict: debug,
	plugins: debug ? [createLogger()] : []
})
