import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const VueApp = createApp(App)
VueApp.use(router)
VueApp.use(store)
VueApp.mount('#app')
