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
    // TODO: probably update this more later
    themes: {
      light: {
        primary: '#018191',
        secondary: '#fce181',
        accent: '#9fedd7',
        background: '#BCD6ED',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
})
