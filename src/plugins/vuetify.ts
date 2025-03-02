import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          background: '#181818',
          primary: '#9B51E0',
          secondary: '#03a9f4',
        },
      },
    },
  },
})
