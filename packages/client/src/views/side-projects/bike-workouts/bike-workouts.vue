<template>
  <div class="background lighten-1">
    <h1>test test</h1>
    <v-container>
      <v-row justify="space-between">
        <v-col class="subtitle-1">
          Time Spent: {{ formattedTime }}
        </v-col>
        <v-col class="subtitle-1 text-right">
          Time Left: {{ formattedTimeLeft }}
        </v-col>
      </v-row>
      <v-row
        justify="center"
        align="center"
      >
        <!-- TODO: Have each peice of the circle the intensity color for each section -->
        <!-- TODO: What would we need to do?
                    - v-for on the progress circle.
                    - only 1 showing the bpm at a time
                    - find the correct rotate value
                    - make sure the value is correct and maxes out and stays maxed out

         -->
        <v-col
          class="text-center"
          style="height: 350px;"
        >
          <v-progress-circular
            :rotate="-90"
            :size="350"
            :width="25"
            :value="percentDone"
            :color="workoutSection.color"
            @click="startWorkout()"
          >
            <span class="display-2">{{ timeLeft === 0 ? doneMessage : workoutSection.bpm }}</span>
          </v-progress-circular>
          <!-- <template v-for="(cycle, index) in workouts">
            <v-progress-circular
              :key="index"
              :rotate="getRotateValue(cycle)"
              style="position: absolute; top: 50px; left: 50px;"
              :size="350"
              :width="25"
              :value="25"
              :color="cycle.color"
              @click="startWorkout()"
            >
              <span class="display-2">test</span>
            </v-progress-circular>
          </template> -->
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
          Comments: {{ workoutFinished ? doneComment : workoutSection.comments }}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
const SECONDS_IN_MINUTE = 60
const MILISECOND_IN_SECOND = 1000
// const MILISECOND_IN_SECOND = 100
const ZERO_SECONDS = 0
const HALF_MINUTE = 30
const BASE_TEN = 10
const PERCENT = 100
export default {
  name: 'bike-workout',
  data: () => ({
    workouts: [
      {
        time: '2',
        intensity: 'Very Low',
        bpm: '80 - 100',
        comments: '',
        color: 'blue'
      },
      {
        time: '2',
        intensity: 'Low - Medium',
        bpm: '100 - 120',
        comments: 'Warm Up',
        color: 'green'
      },
      {
        time: '2',
        intensity: 'Medium - High',
        bpm: '120 - 140',
        comments: '',
        color: 'yellow'
      },
      {
        time: '3',
        intensity: 'High',
        bpm: '140 - 155',
        comments: 'Training',
        color: 'orange'
      },
      {
        time: '2',
        intensity: 'Low',
        bpm: '100 - 110',
        comments: '',
        color: 'green'
      },
      {
        time: '3',
        intensity: 'High',
        bpm: '140 - 155',
        comments: '',
        color: 'orange'
      },
      {
        time: '2',
        intensity: 'Low',
        bpm: '100 - 110',
        comments: '',
        color: 'green'
      },
      {
        time: '3',
        intensity: 'Very High',
        bpm: '145 - 160',
        comments: '',
        color: 'red'
      },
      {
        time: '2',
        intensity: 'Very Low',
        bpm: '90 - 100',
        comments: '',
        color: 'blue'
      },
      {
        time: '3',
        intensity: 'Very High',
        bpm: '145 - 160',
        comments: '',
        color: 'red'
      },
      {
        time: '3',
        intensity: 'Medium',
        bpm: '115 - 120',
        comments: '',
        color: 'yellow'
      },
      {
        time: '3',
        intensity: 'Medium - Low',
        bpm: '115 - 120',
        comments: '',
        color: 'green'
      }
    ],
    totalTime: 0,
    timePassed: null,
    timeLeft: null,
    workoutStarted: false,
    timerInterval: '',
    workoutSection: {
      targetHR: '',
      color: '',
      intensity: ''
    },
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
    percentDone () {
      console.log((PERCENT - ((this.timeLeft / this.totalTime) * PERCENT)))
      return (PERCENT - ((this.timeLeft / this.totalTime) * PERCENT))
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
      this.workouts.forEach(cycle => {
        cycle.whenToStart = this.totalTime
        this.totalTime += cycle.time * SECONDS_IN_MINUTE
      })
      this.timeLeft = this.totalTime
      this.timePassed = ZERO_SECONDS
    },
    checkZone (timePassed) {
      if (this.timeLeft === ZERO_SECONDS) {
        clearInterval(this.timerInterval)
      }
      let section = this.workouts.find((cycle) => {
        return timePassed === cycle.whenToStart
      })
      if (section) {
        this.workoutSection = section
        this.targetHR = section.bpm
        this.intensity = section.intensity
      }
    },
    getRotateValue (cycle) {
      // The value starts at -90. This is position 0 I would expect.
      // 360 degrees, divide it into seconds? then we can figure out where
      // each one needs to start.
      // So if we did, whenToStart
      // Degree per second -> (360/totalTime)
      // multiply this by whenToStart
      // subtract 90 (because -90 actually = 0)
      // Lets try!
      let startRotate = 0
      let degreePerSecond = 360 / this.totalTime
      startRotate = (degreePerSecond * cycle.whenToStart) - 90
      console.log(startRotate, degreePerSecond, cycle.whenToStart)
      return startRotate
    }
  }
}
</script>
