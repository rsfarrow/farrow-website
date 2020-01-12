<template>
  <div v-if="$store.getters.showAppBar">
    <v-app-bar
      color="secondary"
      dense
      app
    >
      <v-app-bar-nav-icon
        @click="$store.dispatch('updateShowSideMenu', !$store.getters.showSideMenu)"
      />
      <v-toolbar-title>{{ $store.getters.globalTitle }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: 'App-Bar',
  computed: {
    showAppBar () {
      return this.$store.getters.showAppBar
    }
  },
  watch: {
    showAppBar () {
      // console.log('ShowAppBar, ', this.showAppBar)
    }
  }
}
</script>
