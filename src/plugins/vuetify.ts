import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

// export default createVuetify({
//   theme: {
//     themes: {
//       light: {
//         colors: {
//           background: '#181818',
//           primary: '#9B51E0',
//           secondary: '#03a9f4',
//         },
//       },
//     },
//   },
// })

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#9B51E0',
          secondary: '#424242',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#9B51E0',
          secondary: '#121212',
        },
      },
    },
  },
})
