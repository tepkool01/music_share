import { createStore, createLogger } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
	state () {
		return {
			roomID: 0,
			songs: [
				{name: 'asdf', URL: 'music.mp3'},
				{name: 'asdf2', URL: 'https://archive.org/download/calexico2006-12-02..flac16/calexico2006-12-02d1t02.mp3'},
			]
		}
	},
	actions: {
		changeRoom ({ commit }, roomID) {
			commit('setRoom', roomID)
		},
	},
	mutations: {
		setRoom (state, ID) { state.roomID = ID },
	},

	strict: debug,
	plugins: debug ? [createLogger()] : []
})
