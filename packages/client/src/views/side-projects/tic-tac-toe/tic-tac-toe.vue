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
      <v-switch v-model="computer"
                :label="`Play With Computer`"
                @change="restartGame()"
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
    winner: null,
    computer: false
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
    handleClick (i) {
      let current = this.history[this.history.length - 1]
      let squares = current.squares.slice()
      if (!this.winner && !squares[i]) {
        squares[i] = this.xIsNext ? 'X' : 'O'
        this.history.push({ squares: squares })
        this.xIsNext = !this.xIsNext
        this.stepNumber = this.history.length - 1
        this.winner = this.calculateWinner(squares, squares[i])
        if (this.computer && !this.xIsNext && !this.winner) {
          // TODO: Give the user the option to play as X or O
          let bestMove = this.getBestMove(this.history[this.stepNumber].squares, 'O', 0)
          this.handleClick(bestMove.index)
        }
      }
    },
    restartGame () {
      this.history.splice(1, this.history.length - 1)
      this.stepNumber = 0
      this.xIsNext = true
      this.winner = null
    },
    undoMove () {
      // undo both moves if we're playing the computer, otherwise the user will be taking O's move
      if (this.computer) {
        this.history.splice(this.stepNumber - 1, 2)
        this.stepNumber -= 2
        this.winner = this.calculateWinner(this.history[this.stepNumber].squares, this.xIsNext ? 'X' : 'O')
      } else {
        this.history.splice(this.stepNumber, 1)
        this.stepNumber--
        this.xIsNext = !this.xIsNext
        this.winner = this.calculateWinner(this.history[this.stepNumber].squares, this.xIsNext ? 'X' : 'O')
      }
    },
    countMoves (squares) {
      return squares.filter((el) => { return el !== null }).length
    },
    calculateWinner (squares, symbol) {
      let numOfMoves = this.countMoves(squares)
      // if we need n number of symbols in a row, then at n-1 * 2 (players) we know we can't have a winner yet
      if (numOfMoves <= ((this.numInRow - 1) * 2)) {
        return null
      }
      const lines = this.winningCombos
      const linesLength = lines.length
      // Loop through each array in 'lines'
      // which are the winning combinations
      for (let i = 0; i < linesLength; i++) {
        // one of the winning combos from the list of all winning combos
        let winningCombo = lines[i]
        let prevMatch = true

        // squares is the game board, an array 0-8, showing all the squares
        // null, X, or O are the options for an entry
        // Loop through the winning combo, and if the squares match, continue onto the next one, otherwise
        // break out of the loop because we know it's not a winner
        let testSymbol = squares[winningCombo[0]]
        if (testSymbol && testSymbol === symbol) { // if it doesn't match the symbol no need to check it
          for (let j = 1; j < this.numInRow; j++) {
            prevMatch = testSymbol === squares[winningCombo[j]]
            if (!prevMatch) {
              break
            }
          }
          // once we finish going through the winning combo, if we have matched, return the match
          // they are a winner.
          if (prevMatch) {
            return symbol
          }
        }
      }
      return (numOfMoves === this.numOfSquares) ? 'Tie' : null
    },
    getBestMove (board, symbol) {
      // Get the available moves and then loop through them
      let availableMoves = this.getAvailableMoves(board)
      let availableMovesAndScores = []
      let length = availableMoves.length
      for (let i = 0; i < length; i++) {
        // copy the array and start trying the available moves
        let newBoard = board.slice(0)
        newBoard[availableMoves[i]] = symbol
        let result = this.calculateWinner(newBoard, symbol)
        let score
        // if there's a tie, score 0, if we have a result score 1
        if (result === 'Tie') {
          score = 0
        } else if (result === symbol) {
          score = 1
        } else {
          // otherwise we know there was no winner so we need to take the turn for the other person and score it negative (if it's a winner, -1 indicates we lose)
          let otherSymbol = (symbol === 'X') ? 'O' : 'X'
          let nextMove = this.getBestMove(newBoard, otherSymbol)
          score = -(nextMove.score)
        }
        // if the score is 1 we won and don't need to continue checking
        if (score === 1) {
          availableMovesAndScores.push({ index: availableMoves[i], score })
          return { index: availableMoves[i], score }
        }
        // go ahead and push it onto the list so that we can check it at the end
        availableMovesAndScores.push({ index: availableMoves[i], score })
      }
      // once we've gone through all the moves, sort them highest to lowest, then return the first one (won't return -1 unless it's the only option)
      availableMovesAndScores.sort((moveA, moveB) => {
        return moveB.score - moveA.score
      })
      return availableMovesAndScores[0]
    },

    /**
     * @param squares Array of moves taken, options can be X, O, or null
     * We map the squares array, if there is a null (empty) spot we return the index, otherwise we return null
     * then we filter out null which gives us the indices of the empty spots.
     */
    getAvailableMoves (squares) {
      return squares.map((el, index) => {
        if (el === null) return index
        else return null
      }).filter((res) => { return res !== null })
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
