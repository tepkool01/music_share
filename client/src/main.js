import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { io } from 'socket.io-client'

const socket = io("http://localhost:5000")

const VueApp = createApp(App)
VueApp.use(router)
VueApp.use(store)
VueApp.provide('socket', socket)
VueApp.mount('#app')
