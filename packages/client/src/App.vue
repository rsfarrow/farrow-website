<template>
  <v-app>
    <app-bar />
    <app-nav />
    <!-- TODO: Create the navigation bar component -->
    <v-content>
      <v-sheet color="background lighten-2" class="background">
        <router-view />
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/app-bar'
import AppNav from '@/components/app-nav-drawer'

export default {
  name: 'Farrow-Website',
  components: { AppBar, AppNav },

  data: () => ({
    //
  })
}
</script>
<style lang="scss" scoped>
.background {
  height: 100%;
}
</style>
