<template>
  <v-container>
    <v-row
      justify="center"
      align="start"
    >
      <v-col
        v-for="(workout, index) in workoutList"
        :key="index"
        class=""
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          color="accent lighten-4"
          link
          @click="showWorkoutDialog(workout, index)"
        >
          <v-card-title>
            {{ workout.title }}
            <v-spacer />
            {{ workout.workoutLength }}
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              icon
              @click.stop="expand(index)"
            >
              <v-icon>{{ show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show[index]">
              <v-divider />

              <v-card-text>
                <v-container class="py-0 px-0">
                  <v-row justify="start">
                    <v-col class="subtitle-1">
                      {{ workout.desc }}
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          color="accent lighten-4"
          link
          @click="showCustomWorkout()"
        >
          <!-- @click="$store.dispatch('updateBikeWorkout', workout);navTo(BIKE_WORKOUT_ROUTE_NAME)" -->
          <v-card-title>
            Custom Workout
          </v-card-title>
          <v-card-text>
            Build your own!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-bottom-sheet v-model="showWorkout"
                    scrollable
                    :inset="$vuetify.breakpoint.mdAndUp"
    >
      <v-sheet v-if="showCustom" class="text-center">
        <v-btn
          class="mt-6"
          color="primary darken-2"
          @click="goToWorkout(true)"
        >
          Start
        </v-btn>
        <v-row align="center">
          <v-col cols="6">
            Number of Rounds
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="customWorkout.numOfRounds"
              outlined
              solo
              flat
              hide-details
              readonly
              single-line
              height="16px"
              type="number"
              prepend-icon="mdi-minus-circle"
              append-outer-icon="mdi-plus-circle"
              class="mr-2"
              @click:prepend="changeRoundCount(false)"
              @click:append-outer="changeRoundCount(true)"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="6">
            Round Length
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="customWorkout.formattedRoundLength"
              outlined
              solo
              flat
              hide-details
              readonly
              single-line
              height="16px"
              prepend-icon="mdi-minus-circle"
              append-outer-icon="mdi-plus-circle"
              class="mr-2"
              @click:prepend="changeTimer('roundLength', 'formattedRoundLength', false, 15)"
              @click:append-outer="changeTimer('roundLength', 'formattedRoundLength', true, 15)"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="6">
            Rest Length
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="customWorkout.formattedRestLength"
              outlined
              solo
              flat
              hide-details
              readonly
              single-line
              height="16px"
              prepend-icon="mdi-minus-circle"
              append-outer-icon="mdi-plus-circle"
              class="mr-2"
              @click:prepend="changeTimer('restLength', 'formattedRestLength', false, 5)"
              @click:append-outer="changeTimer('restLength', 'formattedRestLength', true, 5)"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="6">
            Initial Countdown
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="customWorkout.formattedInitialCoundown"
              outlined
              solo
              flat
              hide-details
              readonly
              single-line
              height="16px"
              prepend-icon="mdi-minus-circle"
              append-outer-icon="mdi-plus-circle"
              class="mr-2"
              @click:prepend="changeTimer('initialCountdown', 'formattedInitialCoundown', false, 5)"
              @click:append-outer="changeTimer('initialCountdown', 'formattedInitialCoundown', true, 5)"
            />
          </v-col>
        </v-row>
      </v-sheet>
      <v-card v-if="!showCustom">
        <v-card-title>
          <v-btn
            class="mt-6 mx-auto"
            color="primary darken-1"
            @click="goToWorkout()"
          >
            Start
          </v-btn>
        </v-card-title>
        <v-card-text style="height: 50%;" class="py-0 px-0">
          <v-row align="center" class="px-3">
            <v-col cols="6">
              Number of Rounds
            </v-col>
            <v-col cols="4">
              {{ workoutList[workoutIndex].workout.length }}
            </v-col>
          </v-row>
          <v-row align="center" class="px-3">
            <v-col cols="6">
              Round Length
            </v-col>
            <v-col cols="4">
              {{ workoutList[workoutIndex].roundLength ? formatTime(workoutList[workoutIndex].roundLength) : 'Varies' }}
            </v-col>
          </v-row>
          <v-row align="center" class="px-3">
            <v-col cols="6">
              Rest Length
            </v-col>
            <v-col cols="4">
              {{ formatTime(workoutList[workoutIndex].restLength) }}
            </v-col>
          </v-row>
          <v-row align="center" class="px-3">
            <v-col cols="6">
              Initial Countdown
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="customWorkout.formattedInitialCoundown"
                outlined
                solo
                flat
                hide-details
                readonly
                single-line
                class="mr-2"
                prepend-icon="mdi-minus-circle"
                append-outer-icon="mdi-plus-circle"
                @click:prepend="changeTimer('initialCountdown', 'formattedInitialCoundown', false, 5)"
                @click:append-outer="changeTimer('initialCountdown', 'formattedInitialCoundown', true, 5)"
              />
            </v-col>
          </v-row>
          <template v-for="(round, index) in workoutList[workoutIndex].workout">
            <v-row :key="index"
                   dense
                   class="mx-3"
            >
              <v-col class="text-left">
                <span class="font-weight-bold">{{ `Round ${index + 1}:` }}</span>
                <span class="font-weight-light">{{ ` ${round.desc}` }}</span>
              </v-col>
            </v-row>
          </template>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>
<script>
// TODO: Create an API to get the workouts
import { APIService } from '@/services/api-service.js'
const apiService = new APIService()

/** Time constants */
const SECONDS_IN_MINUTE = 60
const BASE_TEN = 10

export default {
  name: 'boxing-workout-list',
  data: () => ({
    workoutList: [],
    customWorkout: {
      numOfRounds: 6,
      formattedRoundLength: '3:00',
      roundLength: 180,
      formattedRestLength: '0:30',
      restLength: 30,
      formattedInitialCoundown: '0:15',
      initialCountdown: 15,
      quitPopup: false,
      workout: []
    },
    show: [],
    showCustom: false,
    showWorkout: false,
    workoutIndex: 0
  }),
  watch: {
    showWorkout () {
      if (!this.showWorkout) this.showCustom = false
    }
  },
  mounted () {
    apiService.getBoxingWorkouts().then(res => {
      this.workoutList = res
      this.show = Array(this.workoutList.length).fill(false)
    })
  },
  methods: {
    navTo (path) {
      let self = this
      this.$store.dispatch('navTo', { path, internal: true, self })
    },
    getImage (name) {
      return require('../../../../public/img/' + name + '.jpg')
    },
    expand (index) {
      this.show.splice(index, 1, !this.show[index])
    },
    showCustomWorkout () {
      this.showCustom = true
      this.showWorkout = true
    },
    changeRoundCount (addRound) {
      if (addRound && this.customWorkout.numOfRounds <= 99) {
        this.customWorkout.numOfRounds++
      } else if (!addRound && this.customWorkout.numOfRounds > 1) {
        this.customWorkout.numOfRounds--
      }
    },
    changeTimer (rawVariable, variable, add, interval) {
      if (add) {
        this.customWorkout[rawVariable] += interval
        this.customWorkout[variable] = this.formatTime(this.customWorkout[rawVariable])
      } else if (!add && this.customWorkout[rawVariable] > interval) {
        this.customWorkout[rawVariable] -= interval
        this.customWorkout[variable] = this.formatTime(this.customWorkout[rawVariable])
      }
    },
    formatTime (rawVariable) {
      let minutes = parseInt(rawVariable / SECONDS_IN_MINUTE, BASE_TEN)
      let seconds = parseInt(rawVariable % SECONDS_IN_MINUTE, BASE_TEN)
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    },
    goToWorkout (custom) {
      let saveWorkout = {}
      if (!custom) {
        // need to setup the workout structure.
        saveWorkout = {
          numOfRounds: this.workoutList[this.workoutIndex].workout.length,
          roundLength: this.workoutList[this.workoutIndex].roundLength || null,
          restLength: this.workoutList[this.workoutIndex].restLength,
          initialCountdown: this.customWorkout.initialCountdown,
          workout: this.workoutList[this.workoutIndex].workout
        }
      }
      this.$store.dispatch('updateBoxingWorkout', custom ? this.customWorkout : saveWorkout)
      this.navTo('boxing-timer')
    },
    showWorkoutDialog (workout, index) {
      this.workoutIndex = index
      this.showWorkout = true
    }
  }
}
</script>
