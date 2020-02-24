<template>
  <v-sheet :color="background"
           style="height: 100%"
  >
    <v-container>
      <v-row align="center"
             justify="space-between"
             class="grey--text text--lighten-2 headline"
      >
        <v-col>
          {{ roundDesc }}
        </v-col>
        <v-col class="text-right ">
          {{ `Round ${roundIndex} / ${numOfRounds || workout.length}` }}
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="status !== DONE_ROUND" class="grey--text text--lighten-2 title">
          {{ (workout[restRound ? roundIndex : roundIndex - 1] || {}).desc || '' }}
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col>
          <v-card :color="backgroundCard"
                  min-height="350"
                  elevation="0"
                  style="border: thin solid white !important"
          >
            <v-card-text class="text-center display-3 white--text d-flex" style="height: 350px;">
              <div class="my-auto mx-auto">
                <span>
                  ROUND
                  <br>
                  {{ roundIndex }}
                  <br>
                  <span class="display-4">{{ formattedTimeLeft }}</span>
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col>
          <v-btn v-if="!workoutStarted"
                 width="128px"
                 height="128px"
                 icon
                 @click="stopButton()"
          >
            <v-icon size="128px"
                    color="white"
                    v-text="STOP_ICON"
            />
          </v-btn>
        </v-col>
        <v-col class="text-right">
          <v-btn width="128px"
                 height="128px"
                 icon
                 color="white"
                 @click="startOrPauseTime()"
          >
            <v-icon size="128px" v-text="playPauseIcon" />
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <audio ref="audioStart" src="./../../../../public/bell-start.wav" />
    <audio ref="audioEnd" src="./../../../../public/bell.wav" />
    <audio ref="audioWarning" src="./../../../../public/warning.wav" />
  </v-sheet>
</template>
<script>
/**
 * Rest/Fight/Explode               Round #/max
 *
 * Desc of round
 *
 *
 * |------------------------------------------|
 * |  ROUND Large number
 * |  Time left pretty big here too
 * |  Alternate this color vs the other one
 * |
 * |
 * |
 * |------------------------------------------|
 *
 * (Stop)                          (Pause/Start)
 */
/**
 * TODO: Add audio sounds for starting bell, warning, ending bell?
 */
import { mapGetters } from 'vuex'
import NoSleep from 'nosleep.js'
/** Time constants */
const SECONDS_IN_MINUTE = 60
const BASE_TEN = 10
const MILISECOND_IN_SECOND = 1000

/** Icon options */
const PLAY_ICON = 'mdi-play-circle'
const PAUSE_ICON = 'mdi-pause-circle'
const STOP_ICON = 'mdi-stop-circle'

/** Background Options */
const BLUE_BACKGROUND = 'blue darken-2'
const GREEN_BACKGROUND = 'green darken-2'
const YELLOW_BACKGROUND = 'yellow darken-2'
const GREY_BACKGROUND = 'grey darken-2'

/** Round Status Options */
const REST_ROUND = 'REST'
const INIT_ROUND = 'INITIAL'
const FIGHT_ROUND = 'FIGHT'
const DONE_ROUND = 'DONE'

export default {
  name: 'boxing-timer',
  data: () => ({
    initialStart: 0,
    timePassed: 0,
    timeLeft: 5,
    workoutStarted: false,
    timerInterval: null,
    backgroundInterval: null,
    background: null,
    backgroundCard: null,
    restRound: true,
    roundIndex: 0,
    workoutFinished: false,
    STOP_ICON,
    DONE_ROUND,
    status: INIT_ROUND,
    noSleep: {},
    voiceSupport: false,
    voices: {},
    voiceMessage: {}

  }),
  computed: {
    ...mapGetters(['numOfRounds', 'roundLength', 'restLength', 'initialCountdown', 'quitPopup', 'workout']),
    formattedTimeLeft () {
      let display = `${parseInt(this.timeLeft / SECONDS_IN_MINUTE, BASE_TEN)}:${parseInt(this.timeLeft % SECONDS_IN_MINUTE, BASE_TEN).toString().padStart(2, '0')}`
      return display
    },
    playPauseIcon () {
      let icon = ''
      if (this.workoutStarted) {
        icon = PAUSE_ICON
      } else if (this.status === INIT_ROUND) {
        icon = PLAY_ICON
      } else if (!this.workoutStarted) {
        icon = PLAY_ICON
      } else if (this.status === DONE_ROUND) {
        icon = PLAY_ICON
      } else {
        icon = PAUSE_ICON
      }
      return icon
    },
    roundDesc () {
      let desc = ''
      if (this.status === INIT_ROUND) {
        desc = 'Get Ready!'
      } else if (this.status === REST_ROUND) {
        desc = 'Rest'
      } else if (this.status === FIGHT_ROUND) {
        desc = 'Fight!'
      } else if (this.status === DONE_ROUND) {
        desc = 'Done! Good work'
      }
      return desc
    }
  },
  watch: {
    timeLeft () {
      if (this.timeLeft <= 10 && !this.restRound && !this.backgroundInterval) {
        this.$refs.audioWarning.play()
        this.alternateColors()
      }
      if (this.timeLeft === 0) {
        this.nextRound()
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.noSleep.disable() // Just make sure that the wake lock is turned off
    next()
  },
  mounted () {
    // run this intially to set up everything.
    this.nextRound()
    this.noSleep = new NoSleep()
    if ('speechSynthesis' in window) {
      this.voiceSupport = true
      let s = this.setSpeech()
      s.then((voices) => {
        this.voices = voices
        this.voiceMessage = new SpeechSynthesisUtterance()
        this.voiceMessage.voice = this.voices[50] // TODO: Improvement, pick your voice
      })
    }
  },
  methods: {
    /**
     * Starts or stops the timer.
     * If we don't have a workout started and we're not finished with the workout - start the timer
     * If we have a workout started clear the interval and stop the background if it's in alternate mode
     * TODO: If we are done, restart the workout from start
     */
    startOrPauseTime () {
      if (!this.workoutStarted && this.status !== DONE_ROUND) {
        if (this.status === INIT_ROUND) {
          this.readDesc(true)
        }
        this.noSleep.enable()
        this.timerInterval = setInterval(() => {
          this.timePassed++
          this.timeLeft--
        }, MILISECOND_IN_SECOND)
        this.workoutStarted = true
      } else {
        this.stopBackground()
        this.noSleep.disable()
        clearInterval(this.timerInterval)
        this.workoutStarted = false
      }
    },
    /**
     * Stop button function
     * Send the user back to the list page
     */
    stopButton () {
      this.navTo('boxing-timer-list')
    },
    /**
     * Set the background color based on the status
     */
    setBackground () {
      let color = ''
      if (this.status === REST_ROUND || this.status === INIT_ROUND) {
        color = BLUE_BACKGROUND
      } else if (this.status === FIGHT_ROUND) {
        color = GREEN_BACKGROUND
      } else if (this.status === DONE_ROUND) {
        color = GREY_BACKGROUND
      }
      this.background = color
      this.backgroundCard = color
    },
    /**
     * Create an interval to change the background colors for the page and the card
     * alternates every half a second
     * TODO: Create a half second const
     */
    alternateColors () {
      let warning = false
      this.backgroundInterval = setInterval(() => {
        this.background = warning ? GREEN_BACKGROUND : YELLOW_BACKGROUND
        this.backgroundCard = !warning ? GREEN_BACKGROUND : YELLOW_BACKGROUND
        warning = !warning
      }, 500)
    },
    /**
     * Called once we complete a round and initially to get started.
     * This is the core logic, Decides what to set variables based on the status
     * and if we have a workout started or not.
     *
     * Aditionally stops the background if it's alternating
     */
    nextRound () {
      if (this.status === INIT_ROUND && !this.workoutStarted) {
        this.readDesc(true)
        this.timeLeft = this.initialCountdown
      } else if (this.status === INIT_ROUND && this.workoutStarted) {
        this.$refs.audioStart.play()
        this.readDesc()
        this.timeLeft = this.roundLength || this.workout[this.roundIndex].roundLength
        this.roundIndex++
        this.status = FIGHT_ROUND
        this.restRound = false
      } else if (this.status === REST_ROUND) {
        this.$refs.audioStart.play()
        this.readDesc()
        this.timeLeft = this.roundLength || this.workout[this.roundIndex].roundLength
        this.roundIndex++
        this.status = FIGHT_ROUND
        this.restRound = false
      } else if (this.status === FIGHT_ROUND) {
        if (this.roundIndex === (this.numOfRounds || this.workout.length)) {
          this.status = DONE_ROUND
          this.startOrPauseTime()
        } else {
          this.timeLeft = this.restLength
          this.status = REST_ROUND
          this.restRound = true
        }
        this.$refs.audioEnd.play()
        this.readDesc(true)
      }
      // this.readDesc()
      this.stopBackground()
      this.timePassed = 0
    },
    /**
     * If we have the alternating background, clear the interval so it stops switching
     */
    stopBackground () {
      if (this.backgroundInterval) {
        clearInterval(this.backgroundInterval)
        this.backgroundInterval = null
      }
      this.setBackground()
    },
    readDesc (restRound) {
      if (this.voiceSupport && this.workout[this.roundIndex]) {
        this.voiceMessage.voice = this.voices[50]
        this.voiceMessage.text = restRound ? 'Coming up: ' + this.workout[this.roundIndex].desc : this.workout[this.roundIndex].desc
        setTimeout(() => {
          window.speechSynthesis.speak(this.voiceMessage)
        }, 2000)
      }
    },
    setSpeech () {
      return new Promise(
        function (resolve, reject) {
          let synth = window.speechSynthesis
          let getVoicesInterval
          getVoicesInterval = setInterval(() => {
            let voices = synth.getVoices()
            if (voices.length !== 0) {
              resolve(voices)
              clearInterval(getVoicesInterval)
            }
          }, 10)
        }
      )
    },
    navTo (path) {
      let self = this
      this.$store.dispatch('navTo', { path, internal: true, self })
    }
  }
}
</script>
