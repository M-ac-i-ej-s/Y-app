import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css' 
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }, // This is already the default value - only for display purposes
  },
})

createApp(App).use(Vuex).use(vuetify).use(router).mount('#app')