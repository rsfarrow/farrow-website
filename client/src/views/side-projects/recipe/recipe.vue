<template>
  <div>
    <!-- TODO: Once we add a shopping list option, add a button for adding not checked items to the shopping list -->
    <!-- Want a tabbed split for mobile, Maybe a stepper for mobile, options on the right side?  -->
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <!-- TODO: Find a quirky font for the titles -->
          <v-img
            v-if="recipe.img"
            class="mx-auto"
            height="200"
            :src="img(recipe.img)"
          />
          <span class="display-2 font-weight-bold secondary--text text--darken-3">{{ recipe.name }}</span>
          <v-divider class="my-3" />
          <span class="overline"> {{ recipe.desc }} </span>
          <v-divider class="my-3" />
          <v-row
            justify="space-between"
            no-gutters
          >
            <v-col cols="4">
              <span class="caption">Servings: </span>
              <span class="subtitle-2">{{ recipe.servings }}</span>
            </v-col>
            <!-- <v-col cols="1" class="text-center"> -->
            <v-divider vertical />
            <!-- </v-col> -->
            <v-col cols="5">
              <span class="caption">Total Time: </span>
              <span class="subtitle-2">{{ recipe.totalTime }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          sm="8"
        >
          <v-tabs
            v-model="tab"
            background-color="transparent"
            right
            :grow="$vuetify.breakpoint.smAndDown"
          >
            <v-tab
              v-for="item in items"
              :key="item"
            >
              <span :class="{'caption': $vuetify.breakpoint.smAndDown}"> {{ item }}</span>
            </v-tab>
          </v-tabs>
          <v-list
            v-if="tab === 0"
            class="mx-auto"
            color="transparent"
            flat
          >
            <v-list-item-group
              v-model="selectedIngredients"
              multiple
            >
              <v-list-item
                v-for="(item, index) in recipe.ingredients"
                :key="item"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-action>
                    <v-checkbox
                      v-model="active"
                      color="primary"
                      @click="toggle"
                    />
                  </v-list-item-action>
                  <v-list-item-content
                    :class="{strike: selectedIngredients.indexOf(index) !== -1}"
                  >
                    {{ item }}
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-stepper
            v-if="tab === 1"
            v-model="selectedInstruction"
            class="hide-me"
            non-linear
            vertical
          >
            <template v-for="(item, n) in recipe.instructions">
              <v-stepper-step
                :key="`${n}-step`"
                :complete="selectedInstruction > n"
                :step="n + 1"
                complete-icon="mdi-check"
                edit-icon="mdi-check"
                editable
              >
                <div :class="{'subtitle-1': (selectedInstruction - 1) === n , 'caption': selectedInstruction - 1 !== n}">
                  {{ item }}
                </div>
              </v-stepper-step>

              <v-stepper-content
                :key="`${n}-content`"
                :step="n + 1"
              >
                <div v-if="n !== recipe.instructions.length - 1">
                  <v-btn
                    class="my-2"
                    :disabled="n === 0"
                    small
                    outlined
                    color="primary"
                    @click="selectedInstruction--"
                  >
                    Prev
                  </v-btn>
                  <v-btn
                    class="my-2 ml-1"
                    small
                    color="primary"
                    @click="selectedInstruction++"
                  >
                    Next
                  </v-btn>
                </div>
              </v-stepper-content>
            </template>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { APIService } from '@/services/api-service.js'
const apiService = new APIService()
export default {
  name: 'recipe',
  data: () => ({
    tab: 0,
    items: ['Ingredients', 'Instructions'],
    item: null,
    recipe: {},
    selectedIngredients: [],
    selectedInstruction: 1,
    colors: [
      'primary',
      'secondary',
      'yellow darken-2',
      'red',
      'orange'
    ]
  }),
  mounted () {
    this.getRecipe(this.$store.getters.recipeId)
  },
  methods: {
    getRecipe (id) {
      apiService.getRecipe({ variables: { id: id } })
        .then(res => {
          this.recipe = res.data.getRecipe
        })
    },
    img (name) {
      return require('../../../../../public/img/' + name + '.jpg')
    },
    navTo (path, id) {
      this.$store.dispatch('updateRecipeId', id)
      let self = this
      this.$store.dispatch('navTo', { path, internal: true, self })
    }
  }
}
</script>
<style lang="scss" scoped>
.strike {
  text-decoration: line-through;
}
.hide-me {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
