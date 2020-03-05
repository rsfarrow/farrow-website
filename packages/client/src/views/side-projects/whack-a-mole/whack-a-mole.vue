<template>
  <div id="wam-game">
    <v-dialog v-model="dialog"
              persistent
              max-width="290"
    >
      <v-card>
        <v-card-title />
        <v-card-text>
          <v-text-field
            v-model="tempName"
            label="Enter your name"
            @keydown.enter="dialog = false; updateName()"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary darken-1"
                 text
                 @click="dialog = false; updateName()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container>
      <v-row
        :justify="'space-around'"
      >
        <scoreboard
          :numberDisplay="(timer.toString().padStart(2, '0'))"
          :title="'Timer'"
          class="mx-3 my-3"
        />
        <scoreboard
          :numberDisplay="(score.toString().padStart(2, '0'))"
          :title="'Score'"
          class="mx-3 my-3"
        />
      </v-row>
      <v-row
        :justify="'center'"
      >
        <v-btn
          id="start-btn"
          :disabled="disableButton"
          @click="startGame()"
        >
          Start Game
        </v-btn>
      </v-row>
      <v-row
        :align-content="'center'"
        :class="{'play-area': customCursor}"
      >
        <v-col v-for="(mole, index) in moles"
               :key="index"
               :align-self="'center'"
        >
          <mole
            ref="mole"
            :key="mole"
            :rate="rate"
            :numOfMoles="moles"
            :index="index"
            :offset="offset[index]"
            @active="score++"
          />
        </v-col>
      </v-row>
      <settings
        v-model="showSettings"
        :rate="rate"
        :moles="moles"
        :customCursor="customCursor"
        :darkMode="darkMode"
        @updateSettings="updateSettings($event)"
      />
      <high-scores
        ref="highscoreDialog"
        v-model="showDialog"
        :currentScore="score"
        :highScores="highScores"
        :newHighScore="newHighScore"
        :newUserHighScore="newUserHighScore"
      />
    </v-container>
    <v-footer class="ml-auto mt-auto"
              align-end
              :color="'transparent'"
    >
      <v-spacer />
      <v-btn
        id="settings-btn"
        :input-value="false"
        icon
        :disabled="disableButton"
        text
        small
        @click="disableButton ? '' : navTo('highscores')"
      >
        <v-icon> mdi-counter </v-icon>
      </v-btn>
      <v-btn
        id="settings-btn"
        :input-value="false"
        icon
        :disabled="disableButton"
        text
        small
        @click="disableButton ? '' : showSettings = true"
      >
        <v-icon> mdi-settings </v-icon>
      </v-btn>
    </v-footer>
  </div>
</template>
<script>
import Mole from '@/components/whack-a-mole/mole.vue'
import Scoreboard from '@/components/whack-a-mole/scoreboard.vue'
import HighScores from '@/components/whack-a-mole/high-score-display.vue'
import Settings from './settings.vue'
import { APIService } from '@/services/api-service.js'
import { mapGetters } from 'vuex'
const apiService = new APIService()
const GAME_LENGTH = 15
export default {
  name: 'whack-a-mole',
  components: {
    Mole,
    HighScores,
    Scoreboard,
    Settings
  },
  data: () => ({
    moles: 3,
    score: 0,
    offset: [],
    timer: 0,
    length: 5,
    timeout: '',
    rate: 1,
    showDialog: false,
    dialog: false,
    showSettings: false,
    highScores: [],
    userHighscore: 0,
    newHighScore: false,
    newUserHighScore: false,
    tempName: ''
  }),
  computed: {
    disableButton () {
      return this.timer > 0
    },
    ...mapGetters(['name', 'darkMode', 'customCursor'])
  },
  mounted () {
    this.setUpOffset()
    if (!this.name) {
      this.dialog = true
    }
  },
  methods: {
    navTo (path) {
      let self = this
      this.$store.dispatch('navTo', { path, internal: true, self })
    },
    startGame () {
      this.$refs.mole.forEach((mole) => {
        mole.startTime()
      })
      this.timer = GAME_LENGTH
      this.startTimer()
    },
    startTimer () {
      this.score = 0
      this.setUpOffset()
      this.timeout = setInterval(() => {
        this.timer--
        if (this.timer === 0) {
          clearTimeout(this.timeout)
          this.timeout = ''
          this.$refs.mole.forEach((mole) => {
            mole.stopTime()
          })
          this.setHighscore()
        }
      }, 1000)
    },
    setUpOffset () {
      this.offset = []
      for (let i = 0; i < this.moles; i++) {
        this.offset.push(Math.floor(Math.random() * 250))
      }
    },
    setHighscore () {
      let payload = {
        name: this.name,
        score: this.score,
        rate: this.rate,
        numOfMoles: this.moles
      }
      apiService.sendHighscores(payload).then((resp) => {
        this.highScores = resp.scores
        this.newHighScore = resp.newHighscore
        this.showDialog = true
      })
    },
    updateSettings (event) {
      console.log('update settings: ', event)
      this.rate = event.rate
      this.moles = event.moles
      if (event.newName) this.$store.dispatch('updateName', event.newName)
      event.customCursor ? this.$store.dispatch('turnOnCustomCursor') : this.$store.dispatch('turnOffCustomCursor')
      event.darkMode ? this.$store.dispatch('turnOnDarkMode') : this.$store.dispatch('turnOffDarkMode')
      this.$vuetify.theme.dark = this.darkMode
      this.setUpOffset()
    },
    updateName () {
      this.$store.dispatch('updateName', this.tempName)
    }
  }
}
</script>
<style lang="scss" scoped>
.play-area {
  cursor: url('https://farrow-website.s3.amazonaws.com/hammer.png'), default;

}
</style>
