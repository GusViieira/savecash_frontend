import vuetify from './vuetify'
import router from '../router'
import type { App } from 'vue'
import { mask } from 'vue-the-mask'

export function registerPlugins(app: App) {
  app.use(vuetify)
  app.use(router)
  app.directive('mask', mask) // Registrando a diretiva manualmente
}
