import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Touch } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  directives: {
    Touch
  }
})

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    }
    // TODO: Work on a theme once we have a little more done
    // themes: {
    //   light: {
    //     primary: '#ee44aa',
    //     secondary: '#424242',
    //     accent: '#82B1FF',
    //     error: '#FF5252',
    //     info: '#2196F3',
    //     success: '#4CAF50',
    //     warning: '#FFC107'
    //   }
    // }
  }
})
