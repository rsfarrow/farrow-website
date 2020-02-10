<template>
  <v-container>
    <v-row
      justify="center"
      align="start"
      class="text-center"
    >
      <v-col
        v-for="(workout, index) in workoutList"
        :key="workout.length"
        class="text-center"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          color="accent lighten-4"
          link
          :disabled="index !== 0"
          @click="navTo('bike-workout')"
        >
          <v-card-title>
            {{ workout.length }}
            <v-spacer />
            <v-avatar
              class="profile"
              color="grey"
              size="64"
              tile
            >
              <v-img :src="getImage(workout.img)" />
            </v-avatar>
          </v-card-title>
          <v-card-text>
            {{ workout.desc }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import { APIService } from '@/services/api-service.js'
// const apiService = new APIService()
const BIKE_WORKOUT_ROUTE_NAME = 'digital-cookbook-recipe'
export default {
  name: 'recipe-list',
  data: () => ({
    BIKE_WORKOUT_ROUTE_NAME,
    tab: 4,
    items: [
      'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'All'
    ],
    item: null,
    workoutList: [
      {
        length: '30 min',
        desc: 'A quick in and out bike workout to get you sweaty',
        img: 'warmup'
      },
      {
        length: '44 min',
        desc: 'Turn up the heat a little and really get a good workout in under an hour',
        img: 'workout'
      },
      {
        length: '51 min',
        desc: 'Have a little time to kill? Try and do this see if you survive!',
        img: 'death'
      }
    ],
    show: [],
    loading: [],
    offsetTop: 0,
    showMobileMenu: false
  }),
  methods: {
    navTo (path, id) {
      // if (id) this.$store.dispatch('updateRecipeId', id)
      let self = this
      this.$store.dispatch('navTo', { path, internal: true, self })
    },
    getImage (name) {
      return require('../../../../public/img/' + name + '.jpg')
    }
  }
}
</script>
