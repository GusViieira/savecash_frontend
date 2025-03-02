import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { registerPlugins } from '@/plugins'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(vuetify)
registerPlugins(app)

app.mount('#app')
