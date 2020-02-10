<template>
  <v-form ref="form">
    <v-container>
      <div class="display-2 font-weight-bold accent--text text--darken-3">
        {{ recipeName || 'New Recipe' }}
      </div>
      <div class="overline">
        (Please don't abuse this, actually enter real recipes if you want, but please don't create a junk.)
      </div>

      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <v-text-field
            :value="recipeName"
            label="Name"
            :rules="[rules.required]"
            @blur="recipeName = $event.target.value"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <v-text-field
            v-model="recipeDesc"
            label="Description"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <v-text-field
            v-model="source"
            label="Source"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <v-overflow-btn
            v-model="category"
            dense
            :items="categories"
            label="Category"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <v-text-field
            v-model="prepTime"
            label="Prep Time"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <v-text-field
            v-model="cookTime"
            label="Cook Time"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <v-text-field
            v-model="totalTime"
            label="Total Time"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <v-text-field
            v-model="servings"
            :rules="[rules.required]"
            label="Servings"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <v-text-field
            v-model="image"
            disabled
            placeholder="Coming soon! For now -- enjoy my face 😜 "
            hint="Image must be uploaded separately -- coming soon!"
            label="Image name"
          />
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          Ingredients
          <template v-for="(ingredient, index) in ingredients">
            <v-text-field
              :key="'ingredient'+index"
              v-model="ingredients[index]"
              :error-messages="ingredientsError"
              :label="'Ingredient ' + (index + 1)"
              placeholder="e.g., 16 oz Pizza Sauce"
              prepend-icon="mdi-plus-circle"
              append-outer-icon="mdi-close-circle"
              @click:append-outer="addRemoveItem(ingredients, index, true, true)"
              @click:prepend="addRemoveItem(ingredients, index, false, true)"
            />
          </template>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          Ingredients
          <template v-for="(instruction, index) in instructions">
            <v-text-field
              :key="'instruction'+index"
              v-model="instructions[index]"
              :error-messages="instructionsError"
              :label="'Instruction ' + (index + 1)"
              append-outer-icon="mdi-close-circle"
              prepend-icon="mdi-plus-circle"
              placeholder="e.g., Preheat oven to 350°F"
              @click:append-outer="addRemoveItem(instructions, index, true)"
              @click:prepend="addRemoveItem(instructions, index, false)"
            />
          </template>
        </v-col>
      </v-row>

      <v-row justify="end">
        <v-col
          cols="12"
          class="text-end"
        >
          <v-btn
            color="primary"
            outlined
            @click="clearForm()"
            v-text="'Clear'"
          />
          <v-btn
            color="primary"
            class="ml-3"
            @click="saveRecipe()"
            v-text="'Save'"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { removeItemFromArray } from '@/utils'
import { APIService } from '@/services/api-service.js'
const apiService = new APIService()
export default {
  name: 'add-recipe',
  data: () => ({
    categories: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
    instructions: [undefined],
    ingredients: [undefined],
    recipeName: '',
    recipeDesc: '',
    source: '',
    category: '',
    prepTime: '',
    cookTime: '',
    totalTime: '',
    servings: '',
    image: '',
    ingredientsError: '',
    instructionsError: '',
    rules: {
      required: value => !!value || 'Required field',
      min: v => v.length >= 8 || 'Min 8 characters'
    }

  }),
  // computed: {
  //   ingredientRule () {
  //     return
  //   }
  // },
  methods: {
    addRemoveItem (list, index, remove, ingredient) {
      if (remove) {
        if (list.length === 1) {
          list.splice(index, 1, undefined)
          if (ingredient) {
            this.ingredientsError = 'Required field'
          } else {
            this.instructionsError = 'Required field'
          }
        } else {
          list.splice(index, 1)
        }
      } else {
        if (ingredient) {
          this.ingredientsError = ''
        } else {
          this.instructionsError = ''
        }
        list.length - 1 === index ? list.push(undefined) : list.splice(index + 1, 0, undefined)
      }
    },
    saveRecipe () {
      /**
       * Steps:
       * 1 -Remove empty items from array.
       * 2 -Check and make sure that we have items in the array
       * 3 -if we have items, remove any error and give them the trimmed array
       * 4 -if we don't have items, set an error and set a new array with 1 undefined item in it.
       */
      // 1
      console.log('ingredient Array: 0', JSON.stringify(this.ingredients))
      let ingredientArray = removeItemFromArray(this.ingredients)
      let instructionArray = removeItemFromArray(this.instructions)
      console.log('ingredient Array: 1', JSON.stringify(ingredientArray))
      // 2
      // ingredients
      if (ingredientArray.length > 0) {
        // good to go
        console.log(2)
        this.ingredientsError = ''
        this.ingredients = ingredientArray
      } else {
        // need an error
        console.log(3)
        this.ingredientsError = 'Required field'
        ingredientArray.push('')
        console.log('AFter push', JSON.stringify(ingredientArray))
        this.ingredients = ingredientArray
        console.log('ingredient Array: 3', JSON.stringify(this.ingredients))

        this.ingredients = ingredientArray
      }
      // 2
      // instructions
      if (instructionArray.length > 0) {
        // good to go
        console.log(2)
        this.instructionsError = ''
        this.instructions = instructionArray
      } else {
        // need an error
        console.log(3)
        this.instructionsError = 'Required field'
        instructionArray.push('')
        console.log('AFter push', JSON.stringify(ingredientArray))
        this.instructions = instructionArray
        console.log('ingredient Array: 3', JSON.stringify(this.ingredients))
        this.instructions = instructionArray
      }

      let valid = this.$refs.form.validate() && this.ingredients.length > 0 && this.instructions.length > 0
      if (valid) {
        // so here we are, being all valid and what not

        let recipeInput = {
          'name': this.recipeName,
          'desc': this.recipeDesc,
          'category': this.category,
          'prepTime': this.prepTime,
          'cookTime': this.cookTime,
          'totalTime': this.totalTime,
          'servings': this.servings,
          'source': this.source,
          'ingredients': this.ingredients,
          'instructions': this.instructions,
          'img': this.image
        }
        apiService.createRecipe({ variables: { recipeInput } }).then((res) => {
          console.log(res)
          this.$store.dispatch('updateCategory', res.data.createRecipe.category[0])
          let self = this
          this.$store.dispatch('navTo', { path: 'digital-cookbook-list', internal: true, self })
        })
      } else {
        console.log('Not valid!')
        this.ingredients = removeItemFromArray(this.ingredients)
        if (this.ingredients.length === 0) this.ingredients.push('')
        console.log(this.ingredients)
      }
    },
    clearForm () {
      this.$refs.form.reset()
      this.instructions = ['']
      this.ingredients = ['']
      this.ingredientsError = ''
      this.instructionsError = ''
    }
  }
}
</script>
