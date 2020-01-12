<template>
  <v-navigation-drawer
    v-if="showMenu"
    app
    permanent
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="face" />
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
          <!-- <v-list-group
            :key="item.title"
            :prepend-icon="item.icon"
            subgroup
            value="true"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="(subgroup, i) in item.group"
              :key="i"
              link
            >
              <v-list-item-content>
                <v-list-item-title v-text="subgroup.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group> -->
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
  </v-navigation-drawer>
</template>
<script>

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
            { title: 'Tic Tac Toe', icon: 'mdi-alpha-x-box-outline', disabled: true, path: '', internal: true },
            { title: 'Boxing Timer', icon: 'mdi-boxing-glove', disabled: true, path: '', internal: true }

          ] },
        { title: 'Github', icon: 'mdi-github-box', path: GITHUB_PROFILE, internal: false },
        { title: 'Email', icon: 'mdi-email', path: EMAIL_LINK, internal: false },
        { title: 'LinkedIn', icon: 'mdi-linkedin-box', path: LINKEDIN_PROFILE, internal: false },
        { title: 'About', icon: 'mdi-face-profile', path: 'about', internal: true }
      ]
    }
  },
  computed: {
    showMenu () {
      return this.$store.getters.showSideMenu
    },
    face () {
      return require('../../../public/img/it-me.png')
    }
  },
  methods: {
    navTo (path, internal) {
      console.log('app-nav-drawer: ', path)
      let self = this
      this.$store.dispatch('navTo', { path, internal, self })
    }
  }
}
</script>
<style lang="scss" scoped>
#app > div > nav > div.v-navigation-drawer__content > div.v-list.v-sheet.v-sheet--tile.theme--light > div:nth-child(2) > div > div.v-list-group__header.v-list-item.v-list-item--active.v-list-item--link.theme--light {
  padding-left: 0 !important;
}
</style>
