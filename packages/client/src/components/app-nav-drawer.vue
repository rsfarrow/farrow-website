<template>
  <v-navigation-drawer
    v-if="showMenu"
    app
    permanent
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="'https://farrow-website.s3.amazonaws.com/it-me.png'" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Farrow Website</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list>
      <template v-for="item in navItems">
        <template v-if="!item.group">
          <v-list-item
            :key="item.title"
            @click="navTo(item.path, item.internal)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-group
            :key="item.title"
            :prepend-icon="item.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subItem in item.group"
              :key="subItem.title"
              :disabled="subItem.disabled"
              @click="navTo(subItem.path, subItem.internal)"
            >
              <!-- <v-list-item-content> -->
              <v-list-item-title
                v-text="subItem.title"
              />
              <v-list-item-icon>
                <v-icon :disabled="subItem.disabled" v-text="subItem.icon" />
              </v-list-item-icon>
              <!-- </v-list-item-content> -->
            </v-list-item>
          </v-list-group>
        </template>
      </template>
    </v-list>
    <!-- <v-spacer /> -->
    <!-- class="ml-auto mt-auto px-0" -->
    <v-footer
      absolute
      align-end
      color="transparent"
    >
      <v-spacer />
      <v-switch
        v-model="internalDarkMode"
        append-icon="mdi-theme-light-dark"
        @change="changeDarkMode()"
      />
    </v-footer>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'

const GITHUB_PROFILE = 'https://github.com/rsfarrow'
const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/sam-farrow/'
const EMAIL_LINK = 'mailto: rsfarrow@ncsu.edu'
export default {
  data () {
    return {
      navItems: [
        { title: 'Home', icon: 'mdi-home', path: 'landing', internal: true },
        { title: 'Side Projects',
          icon: 'mdi-code-tags',
          path: 'side-projects',
          internal: true,
          group: [
            { title: 'View All', icon: 'mdi-view-list', disabled: false, path: 'side-projects', internal: true },
            { title: 'Digital Cookbook', icon: 'mdi-book', disabled: false, path: 'digital-cookbook-list', internal: true },
            { title: 'Whack-a-Mole', icon: 'mdi-hammer', disabled: false, path: 'whack-a-mole', internal: true },
            { title: 'Tic Tac Toe', icon: 'mdi-alpha-x-box-outline', disabled: false, path: 'tic-tac-toe', internal: true },
            { title: 'Boxing Timer', icon: 'mdi-boxing-glove', disabled: false, path: 'boxing-timer-list', internal: true },
            { title: 'Bike Workouts', icon: 'mdi-bike', disabled: false, path: 'bike-workout-list', internal: true }

          ] },
        { title: 'Github', icon: 'mdi-github', path: GITHUB_PROFILE, internal: false },
        { title: 'Email', icon: 'mdi-email', path: EMAIL_LINK, internal: false },
        { title: 'LinkedIn', icon: 'mdi-linkedin', path: LINKEDIN_PROFILE, internal: false },
        { title: 'About', icon: 'mdi-face-profile', path: 'about', internal: true }
      ],
      internalDarkMode: false
    }
  },
  computed: {
    showMenu () {
      return this.$store.getters.showSideMenu
    },
    ...mapGetters(['darkMode'])
  },
  watch: {
    darkMode () {
      this.internalDarkMode = this.darkMode
    }
  },
  mounted () {
    this.internalDarkMode = this.darkMode
  },
  methods: {
    navTo (path, internal) {
      let self = this
      this.$store.dispatch('navTo', { path, internal, self })
    },
    changeDarkMode () {
      this.$store.dispatch(this.darkMode ? 'turnOffDarkMode' : 'turnOnDarkMode')
      this.$vuetify.theme.dark = this.darkMode
    }
  }
}
</script>
<style lang="scss" scoped>
#app > div > nav > div.v-navigation-drawer__content > div.v-list.v-sheet.v-sheet--tile.theme--light > div:nth-child(2) > div > div.v-list-group__header.v-list-item.v-list-item--active.v-list-item--link.theme--light {
  padding-left: 0 !important;
}
</style>
