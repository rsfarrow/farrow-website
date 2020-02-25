<template>
  <div class="square"
       :style="flex + border"
       @click="$emit('click')"
  >
    <v-img
      v-if="value"
      :src="value === 'X' ? cross : circle"
      :aspect-ratio="1"
      class="aspect-ratio-box-inside"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'square',
  components: {

  },
  props: {
    value: [String, Number],
    numInRow: Number,
    index: Number
  },
  computed: {
    ...mapGetters(['darkMode']),
    flex () {
      let percent = 100 / this.numInRow
      let isCenterTile = ((this.index % this.numInRow) === (this.numInRow - 1) || (this.index % this.numInRow === 0))
      if (this.value) {
        return `flex: 0 0 ${percent}%; padding-bottom: ${isCenterTile ? 1 : 2}px;`
      } else {
        return `flex: 0 0 ${percent}%; padding-top: ${percent}%;`
      }
    },
    border () {
      let borderString = ''
      let maxNumber = (this.numInRow * this.numInRow)
      // if it is in the top row no top border.
      // if it is on the left side, no left border
      // if it is on the right side no right border
      // if it is on the bottom side no bottom border
      if (this.index >= 0 && this.index < this.numInRow) {
      // top row
        borderString += 'border-top: none;'
      }
      if (this.index <= (maxNumber - 1) && this.index >= (maxNumber - this.numInRow)) {
        // bottom row
        borderString += 'border-bottom: none;'
      }
      if ((this.index % this.numInRow) === (this.numInRow - 1)) {
        // right column
        borderString += 'border-right: none;'
      }
      if ((this.index % this.numInRow) === 0) {
        // left column
        borderString += 'border-left: none;'
      }
      return borderString
    },
    cross () {
      return require('../../../public/img/cross.png')
    },
    circle () {
      return require('../../../public/img/circle.png')
    }
  }
}
</script>
<style lang="scss" scoped>

.square {
  border: 1px solid #999;
  font-weight: bold;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
}

.square:focus {
  outline: none;
}
.aspect-ratio-box-inside {
  margin: 5px;
}
</style>
