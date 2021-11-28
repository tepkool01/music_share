import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-3-socket.io'

const VueApp = createApp(App)
VueApp.use(router)

VueApp.use(
	new VueSocketIO({
		debug: true, // debug debugging, production recommended to close
		connection: "http://localhost:5000"
	})
);

VueApp.mount('#app')
