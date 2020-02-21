<template>
  <v-container>
    <v-row
      justify="center"
      align="start"
      class="text-center"
    >
      <v-col
        v-for="(workout, index) in workoutList"
        :key="index"
        class="text-center"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          color="accent lighten-4"
          link
          @click="$store.dispatch('updateBikeWorkout', workout);navTo(BIKE_WORKOUT_ROUTE_NAME)"
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
import { APIService } from '@/services/api-service.js'
const apiService = new APIService()
const BIKE_WORKOUT_ROUTE_NAME = 'bike-workout'
export default {
  name: 'recipe-list',
  data: () => ({
    BIKE_WORKOUT_ROUTE_NAME,
    workoutList: [],
    show: [],
    loading: [],
    offsetTop: 0,
    showMobileMenu: false
  }),
  mounted () {
    apiService.getBikeWorkouts().then(res => {
      this.workoutList = res
    })
  },
  methods: {
    navTo (path, id) {
      let self = this
      this.$store.dispatch('navTo', { path, internal: true, self })
    },
    getImage (name) {
      return require('../../../../public/img/' + name + '.jpg')
    }
  }
}
</script>
