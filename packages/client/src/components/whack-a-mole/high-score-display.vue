<template>
  <v-content>
    <v-dialog
      v-model="show"
      persistent
      :max-width=" $vuetify.breakpoint.smAndUp ? '50%' : ''"
    >
      <v-card>
        <v-card-title>
          <div :class="['headline', 'text-uppercase', {'smaller-text':$vuetify.breakpoint.xsOnly}]">
            {{ header }}
          </div>
          <v-spacer />
          <v-icon
            @click="$emit('click:outside', false)"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <div class="title">
            Your current score: {{ currentScore }}
          </div>
          <div class="title">
            All time high scores
          </div>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  High Score
                </th>
                <th class="text-left">
                  Rate
                </th>
                <th class="text-left">
                  # of Moles
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in highScores"
                :key="'hs-' + index"
                :class="{'accent': item.newHighscore}"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.score }}</td>
                <td>{{ item.rate }}</td>
                <td>{{ item.numOfMoles }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  model: {
    prop: 'showDialog',
    event: 'click:outside'
  },
  props: {
    showDialog: Boolean,
    currentScore: Number,
    highScores: Array,
    newHighScore: Boolean
  },
  data: () => ({
    show: false,
    userHighscores: []
  }),
  computed: {
    header () {
      if (this.newHighScore) {
        return '🎉🎊 New High score! 🎊🎉'
      } else {
        return 'GAME OVER'
      }
    },
    ...mapGetters(['name'])
  },
  watch: {
    showDialog () {
      this.show = this.showDialog
    }
  }
}
</script>
<style lang="scss" scoped>
.smaller-text {
  font-size: 1.3rem !important;
}
</style>
