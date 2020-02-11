<template>
  <div class="background lighten-1">
    <!-- TODO: Add a title to the page <h1>test test</h1> -->
    <v-container>
      <v-row justify="space-between">
        <v-col class="subtitle-1">
          Time Spent: {{ formattedTime }}
        </v-col>
        <v-col class="text-center">
          <v-btn fab
                 style="z-index: 1;"
                 @click="startWorkout()"
          >
            <v-icon>
              mdi-play-pause
            </v-icon>
          </v-btn>
        </v-col>
        <v-col class="subtitle-1 text-right">
          Time Left: {{ formattedTimeLeft }}
        </v-col>
      </v-row>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          class="text-center ml-auto"
        >
          <div style="position: relative; height: 350px" class="ml-auto text-center">
            <v-progress-circular
              :style="{position: 'absolute', top: 0, left: $vuetify.breakpoint.mdAndUp ? '30%' : '5%'}"
              :size="350"
              :width="25"
              :value="100"
              color="grey lighten-2"
            >
              <span v-if="workoutFinished" class="display-2"> {{ doneMessage }} </span>
            </v-progress-circular>
            <template v-for="(cycle, index) in bikeWorkout.workout">
              <v-progress-circular
                :key="index"
                :rotate="getRotateValue(cycle)"
                :style="{position: 'absolute', top: 0, left: $vuetify.breakpoint.mdAndUp ? '30%' : '5%'}"
                :size="350"
                :width="25"
                :value="timePassed >= cycle.whenToStart ? cycle.getPercent() : 0"
                :color="cycle.color"
              >
                <span v-if="timePassed >= cycle.whenToStart && timePassed < cycle.whenToEnd" class="display-2 mb-5">{{ cycle.bpm }}</span>
              </v-progress-circular>
            </template>
          </div>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col class="subtitle-1">
          Target HR: {{ targetHR }}
        </v-col>
        <v-col class="subtitle-1 text-right">
          Intensity: {{ intensity }}
        </v-col>
      </v-row>
      <v-row
        justify="space-between"
        align="center"
      >
        <v-col class="text-center px-0">
          <v-chip
            v-for="zone in zones"
            :key="zone.intensity"
            :color="zone.color"
            class="ml-1 mt-1"
          >
            {{ zone.intensity }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col class="subtitle-1">
          Comments: {{ workoutFinished ? doneComment : comment }}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
const SECONDS_IN_MINUTE = 60
const MILISECOND_IN_SECOND = 1000
const ZERO_SECONDS = 0
const HALF_MINUTE = 30
const BASE_TEN = 10
const PERCENT = 100
export default {
  name: 'bike-workout',
  data: () => ({
    totalTime: 0,
    timePassed: null,
    timeLeft: null,
    workoutStarted: false,
    timerInterval: '',
    comment: '',
    targetHR: '',
    intensity: '',
    doneMessage: '🎉🎉🎉',
    doneComment: 'Congrats on a great workout! You\'re all done.  Grab some water, get a shower, Live. Your. Life.',
    zones: [
      {
        color: 'blue',
        intensity: 'Very Low'
      },
      {
        color: 'green',
        intensity: 'Low - Med'
      },
      {
        color: 'yellow',
        intensity: 'Medium'
      },
      {
        color: 'orange',
        intensity: 'High'
      },
      {
        color: 'red',
        intensity: 'Very High'
      }
    ]
  }),
  computed: {
    ...mapGetters(['bikeWorkout']),
    formattedTime () {
      let minutes = parseInt(this.timePassed / SECONDS_IN_MINUTE, BASE_TEN)
      let seconds = parseInt(this.timePassed % SECONDS_IN_MINUTE, BASE_TEN)
      if (seconds === HALF_MINUTE || seconds === ZERO_SECONDS) {
        this.checkZone(this.timePassed)
      }
      let display = `${minutes}:${seconds.toString().padStart(2, '0')}`
      return display
    },
    formattedTimeLeft () {
      let display = `${parseInt(this.timeLeft / SECONDS_IN_MINUTE, BASE_TEN)}:${parseInt(this.timeLeft % SECONDS_IN_MINUTE, BASE_TEN).toString().padStart(2, '0')}`
      return display
    },
    workoutFinished () {
      return this.timeLeft === ZERO_SECONDS
    }
  },
  mounted () {
    this.getTotalTime()
  },
  methods: {
    startWorkout () {
      if (!this.workoutStarted) {
        this.timerInterval = setInterval(() => {
          this.timePassed++
          this.timeLeft--
        }, MILISECOND_IN_SECOND)
      } else {
        clearInterval(this.timerInterval)
      }
      this.workoutStarted = !this.workoutStarted
    },
    getTotalTime () {
      this.bikeWorkout.workout.forEach(cycle => {
        cycle.whenToStart = this.totalTime
        this.totalTime += cycle.time * SECONDS_IN_MINUTE
        cycle.whenToEnd = this.totalTime
        cycle.getPercent = () => {
          return (((this.timePassed - cycle.whenToStart) / this.totalTime) * PERCENT)
        }
      })
      this.timeLeft = this.totalTime
      this.timePassed = ZERO_SECONDS
    },
    checkZone (timePassed) {
      if (this.timeLeft === ZERO_SECONDS) {
        clearInterval(this.timerInterval)
      }
      let section = this.bikeWorkout.workout.find((cycle) => {
        return timePassed === cycle.whenToStart
      })
      if (section) {
        this.comment = section.comment
        this.targetHR = section.bpm
        this.intensity = section.intensity
      }
    },
    getRotateValue (cycle) {
      let startRotate = 0
      let degreePerSecond = 360 / this.totalTime
      startRotate = (degreePerSecond * cycle.whenToStart) - 90
      return startRotate
    }
  }
}
</script>
