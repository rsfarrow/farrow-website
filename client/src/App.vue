<template>
  <v-app>
    <app-bar />
    <!-- TODO: Create the navigation bar component -->
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/app-bar'

export default {
  name: 'Farrow-Website',
  components: { AppBar },

  data: () => ({
    //
  })
}

</script>
