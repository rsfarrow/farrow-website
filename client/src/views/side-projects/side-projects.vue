<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="12" sm="4">
        <v-card
          link
          @click="navTo('digital-cookbook-list')"
        >
          <v-img
            :src="cookbookImg"
          />
          <v-card-title>
            Digital Cookbook
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card
          link
          @click="navTo('whack-a-mole')"
        >
          <v-img
            :src="gameImg"
          />
          <v-card-title>
            Whack-A-Mole
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card
          link
          disabled
        >
          <v-img
            :src="tttImg"
          />
          <v-card-title>
            Tic-Tac-Toe
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card
          link
          disabled
        >
          <v-img
            :src="soonImg"
          />
          <v-card-title>
            Boxing Timer
          </v-card-title>
        </v-card>
      </v-col><v-col cols="12" sm="4">
        <v-card
          link
          @click="navTo('bike-workout-list')"
        >
          <v-img
            :src="soonImg"
          />
          <v-card-title>
            Bike Workouts
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  computed: {
    backgroundImg () {
      return require('../../../../public/img/side-projects.jpg')
    },
    cookbookImg () {
      return require('../../../../public/img/cookbook.jpeg')
    },
    gameImg () {
      return require('../../../../public/img/game.jpeg')
    },
    tttImg () {
      return require('../../../../public/img/soon.png')
      // return require('../../../../public/img/ttt.jpg')
    },
    soonImg () {
      return require('../../../../public/img/soon.png')
    }
  },
  methods: {
    navTo (path, internal) {
      let self = this
      this.$store.dispatch('navTo', { path, internal, self })
    }
  }
}
</script>
