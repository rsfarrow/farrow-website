<template>
  <v-container id="ttt-game">
    <!-- Add who is playing or who is the winner -->

    <div class="board mx-auto">
      <square
        v-for="(square, index) in numOfSquares"
        :key="index"
        :value="history[stepNumber].squares[index]"
        :index="index"
        :numInRow="numInRow"
        @click="handleClick(index)"
      />
    </div>
    <v-row justify="space-between">
      <v-col cols="9" class="display-1">
        {{ winner ? `Winner is: ${winner}` : gameOver ? `Tie Game!` : `Current Player:  ${xIsNext ? 'X' : 'O'}` }}
      </v-col>
      <v-col cols="3" class="text-right" />
    </v-row>
    <v-footer class="ml-auto mt-auto px-0"
              space-between
              :color="'transparent'"
    >
      <v-btn
        color="accent darken-2"
        :disabled="stepNumber === 0"
        @click="undoMove()"
        v-text="'Undo'"
      />
      <v-spacer />
      <v-btn
        color="primary"
        @click="restartGame()"
        v-text="'Restart'"
      />
    </v-footer>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import Square from '@/components/tic-tac-toe/square.vue'
export default {
  name: 'tic-tac-toe',
  components: {
    Square
  },
  data: () => ({
    numInRow: 3,
    xIsNext: true,
    history: [{
      squares: []
    }],
    stepNumber: 0,
    numOfSquares: 0,
    winningCombos: [],
    showSettings: false,
    winner: null
  }),
  computed: {

    ...mapGetters(['darkMode']),
    gameOver () {
      return !!this.winner || this.history[this.history.length - 1].squares.indexOf(null) === -1
    }
  },
  mounted () {
    this.getWinningCombos(this.numInRow, this.winningCombos)
    this.numOfSquares = this.numInRow * this.numInRow
    this.history[0].squares = Array(this.numOfSquares).fill(null)
  },
  methods: {
    // TODO: Add a 1 player mode (Play with computer)
    handleClick (i) {
      console.log('handle click entry, get current')
      let current = this.history[this.history.length - 1]
      console.log('handle click, current: ', current)
      let squares = current.squares.slice()
      console.log('handle click, squares: ', squares)
      if (!this.winner && !squares[i]) {
        squares[i] = this.xIsNext ? 'X' : 'O'
        this.history.push({ squares: squares })
        console.log('We put the square in, now history: ', this.history)
        this.xIsNext = !this.xIsNext
        this.stepNumber = this.history.length - 1
        console.log('We put the square in, new stepNum: ', this.stepNumber)
        this.winner = this.calculateWinner(squares)
      }
    },
    restartGame () {
      this.history.splice(1, this.history.length - 1)
      this.stepNumber = 0
      this.xIsNext = true
      this.winner = null
    },
    undoMove () {
      this.history.splice(this.stepNumber, 1)
      this.stepNumber--
      this.xIsNext = !this.xIsNext
      this.winner = this.calculateWinner(this.history[this.stepNumber].squares)
    },
    calculateWinner (squares) {
      const lines = this.winningCombos
      // Loop through each array in 'lines'
      // which are the winning combinations
      for (let i = 0; i < lines.length; i++) {
        // one of the winning combos from the list of all winning combos
        let winningCombo = lines[i]
        let prevMatch = true
        // squares is the game board, an array 0-8, showing all the squares
        // null, X, or O are the options for an entry
        // if we have something at squares[winningCombo[0]], that means we can start checking the
        // sequence, otherwise, move on to the next combo.
        if (squares[winningCombo[0]]) {
          // Loop through the winning combo, and if the squares match, continue onto the next one, otherwise
          // break out of the loop because we know it's not a winner
          for (let j = 1; j < winningCombo.length; j++) {
            prevMatch = squares[winningCombo[0]] === squares[winningCombo[j]]
            if (!prevMatch) {
              break
            }
          }
          // once we finish going through the winning combo, if we have matched, return the match
          // they are a winner.
          if (prevMatch) {
            return squares[winningCombo[0]]
          }
        }
      }
      // Otherwise if we finish everything and nothing satisfied we can return null and let them know
      // that no one won.
      console.log('Calculate winner end:')
      return null
    },
    getWinningCombos (n, winningCombos) {
      this.horizontalWins(n, winningCombos)
      this.verticalWins(n, winningCombos)
      this.fDiagwins(n, winningCombos)
      this.bDiagWins(n, winningCombos)
    },
    horizontalWins (n, winningNums) {
      let cursor = 0
      for (let i = 0; i < n; i++) {
        let numberArray = []
        for (let j = 0; j < n; j++) {
          numberArray.push(cursor)
          cursor++
        }
        winningNums.push(numberArray)
      }
    },
    verticalWins (n, winningNums) {
      let cursor = 0
      for (let i = 0; i < n; i++) {
        let numberArray = []
        for (let j = 0; j < n; j++) {
          if (numberArray.length > 0) {
            numberArray.push(numberArray[j - 1] + n)
          } else {
            numberArray.push(cursor)
          }
        }
        cursor++
        winningNums.push(numberArray)
      }
    },
    fDiagwins (n, winningNums) {
      let cursor = 0
      let numberArray = []
      for (let i = 0; i < n; i++) {
        if (numberArray.length > 0) {
          numberArray.push(numberArray[i - 1] + n + 1)
        } else {
          numberArray.push(cursor)
        }
      }
      winningNums.push(numberArray)
    },
    bDiagWins (n, winningNums) {
      let cursor = n - 1
      let index = 0
      let numberArray = []
      for (let i = n; i > 0; i--) {
        if (numberArray.length > 0) {
          numberArray.push(numberArray[index - 1] + n - 1)
        } else {
          numberArray.push(cursor)
        }
        index++
      }
      winningNums.push(numberArray)
    }
  }
}
</script>
<style lang="scss" scoped>
.board {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 35px;
  max-width: 700px;
}
</style>
