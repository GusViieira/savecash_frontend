import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'

import App from './App.vue'
import router from './router'
import { registerPlugins } from '@/plugins'

const app = createApp(App)
registerPlugins(app)
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
