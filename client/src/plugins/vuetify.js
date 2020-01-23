import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Touch, Scroll } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  directives: {
    Touch,
    Scroll
  }
})

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#018191',
        secondary: '#2f6ced',
        accent: '#fce181',
        background: '#e0dece',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
})
