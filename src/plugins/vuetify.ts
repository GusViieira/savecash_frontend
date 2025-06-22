import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#9B51E0',
          secondary: '#424242',
          lightGrey: '#3E3E3E',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#9B51E0',
          secondary: '#333333',
          third: '#3E3E3E',
          lightGrey: '#3E3E3E',
          purple: '#4E0A8E',
          lightGreen: '#27AE60',
          deepGreen: '#005725',
          lightRed: '#EB5757',
          deepRed: '#961F1F',
        },
      },
    },
  },
})
