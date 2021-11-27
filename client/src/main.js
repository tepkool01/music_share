import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io';

const VueApp = createApp(App)
VueApp.use(router)
VueApp.use(new VueSocketIO({
	debug: true,
	connection: 'http://localhost:3333',
}));
VueApp.mount('#app')
