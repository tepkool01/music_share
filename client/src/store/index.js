import { createStore, createLogger } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
	state () {
		return {
			roomID: 0,
		}
	},
	mutations: {
		setRoom (state, ID) { state.roomID = ID },
	},

	strict: debug,
	plugins: debug ? [createLogger()] : []
})