<template>
  <div
    v-touch="{
      up: () => swipe('Up'),
      down: () => swipe('Down')
    }"
  >
    <v-expand-transition>
      <v-list
        v-show="showMobileMenu && $vuetify.breakpoint.smAndDown"
        class="mx-auto"
        color="transparent"
        flat
      >
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title class="text-center" v-text="item" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-expand-transition>

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

    <!-- TODO: Possibly change this to just show 1 recipe on mobile, and swipe left/right to grab a new one -->
    <v-container>
      What's happening here?
      {{ recipeList }}
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
          <v-card
            color="secondary lighten-4"
          >
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
                @click="navTo(RECIPE_PAGE_NAME, recipe._id)"
              >
                Start Cooking
              </v-btn>
              <v-spacer />
              <!-- When we click this, get the recipe info if we don't have it then, tack it onto the object -->
              <v-btn
                icon
                :loading="loading[index]"
                @click="expandPanel(index, recipe._id)"
              >
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
const RECIPE_PAGE_NAME = 'digital-cookbook-recipe'
export default {
  name: 'recipe-list',
  data: () => ({
    RECIPE_PAGE_NAME,
    tab: null,
    items: [
      'Breakfast', 'Lunch', 'Dinner', 'Snacks'
    ],
    item: null,
    recipeList: [],
    show: [],
    loading: [],
    offsetTop: 0,
    showMobileMenu: false
  }),
  mounted () {
    this.getRecipes()
  },
  methods: {
    getRecipes () {
      apiService.getRecipeList().then(res => {
        this.recipeList = res
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
      if (document.documentElement.scrollTop === 0 && dir === 'Down') {
        this.showMobileMenu = true
      } else if (dir === 'Up' && document.documentElement.scrollTop > 200) {
        this.showMobileMenu = false
      }
    },
    img (name) {
      return require('../../../../../public/img/' + name + '.jpg')
    },
    navTo (path, id) {
      this.$store.dispatch('updateRecipeId', id)
      let self = this
      this.$store.dispatch('navTo', { path, internal: true, self })
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    }
  }
}
</script>
<style lang="scss" scoped>
#tabs > div {
  margin: auto !important;
}

</style>
