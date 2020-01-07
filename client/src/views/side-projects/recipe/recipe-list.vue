<template>
  <div
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down')
    }"
  >
    <v-tabs
      v-if="$vuetify.breakpoint.smAndUp"
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-container>
      <v-row
        justify="center"
        align="start"
        class="text-center"
      >
        <v-col
          v-for="(recipe, index) in recipeList"
          :key="recipe.name"
          class="text-center"
          cols="12"
          sm="6"
          lg="4"
        >
          <v-card>
            <v-img
              :src="img(recipe.img)"
              height="200px"
            />
            <v-card-title>
              {{ recipe.name }}
            </v-card-title>
            <v-card-actions>
              <v-btn
                primary
                text
                @click="test()"
              >
                Start Cooking
              </v-btn>
              <v-spacer />
              <v-btn
                icon
                :loading="loading[index]"
                @click="expandPanel(index, recipe._id)"
              >
                <!-- When we click this, get the recipe info if we don't have it then, tack it onto the object -->
                <v-icon>{{ show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show[index]">
                <v-divider />

                <v-card-text>
                  <v-container class="py-0 px-0">
                    <v-row
                      justify="start"
                    >
                      <v-col class="subtitle-1">
                        {{ recipe.desc }}
                      </v-col>
                    </v-row>
                    <v-row
                      justify="start"
                      no-gutters
                    >
                      <v-col>
                        <span class="caption">Servings: </span>
                        <span class="subtitle-2">{{ recipe.servings }}</span>
                      </v-col>
                      <v-col>
                        <span class="caption">Total Time: </span>
                        <span class="subtitle-2">{{ recipe.totalTime }}</span>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { APIService } from '@/services/api-service.js'
const apiService = new APIService()
export default {
  name: 'recipe-list',
  data: () => ({
    tab: null,
    items: [
      'Appetizers', 'Entrees', 'Deserts', 'Cocktails'
    ],
    recipeList: [],
    show: [],
    loading: []
  }),
  mounted () {
    this.getRecipes()
  },
  methods: {
    getRecipes () {
      apiService.test().then(res => {
        console.log(res)
        this.recipeList = res.data.recipes
        this.show = Array(this.recipeList.length).fill(false)
        this.loading = Array(this.recipeList.length).fill(false)
      })
    },
    getRecipe (index, id) {
      apiService.getRecipeExpansion({ variables: {
        id: id
      } }).then(res => {
        let recipeData = res.data.getRecipe
        this.recipeList.splice(index, 1, { ...this.recipeList[index], ...recipeData })
        this.show.splice(index, 1, !this.show[index])
        this.loading.splice(index, 1, !this.loading[index])
      })
    },
    expandPanel (index, recipeId) {
      if (this.recipeList[index].desc) {
        this.show.splice(index, 1, !this.show[index])
      } else {
        this.loading.splice(index, 1, !this.loading[index])
        this.getRecipe(index, recipeId)
      }
    },
    swipe (dir) {
      console.log(dir)
    },
    img (name) {
      return require('../../../../../public/img/' + name + '.jpg')
    },
    navTo (path, internal) {
      let self = this
      this.$store.dispatch('navTo', { path, internal, self })
    }
  }
}
</script>
