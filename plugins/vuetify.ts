import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, ThemeDefinition } from 'vuetify'
import { VApp, VAlert, VBtn, VCard, VCheckbox, VContainer, VForm, VIcon, VTable, VTextField } from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
      background: '#F5F5F5',
      surface: '#FFF',
      primary: '#6200EE',
      'primary-darken-1': '#3700B3',
      secondary: '#03DAC6',
      'secondary-darken-1': '#018786',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00'
    }
  }
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme
      }
    },
    components: {
      VAlert,
      VApp,
      VBtn,
      VCard,
      VCheckbox,
      VContainer,
      VForm,
      VIcon,
      VTable,
      VTextField
    },
    directives
  })

  nuxtApp.vueApp.use(vuetify)
})
