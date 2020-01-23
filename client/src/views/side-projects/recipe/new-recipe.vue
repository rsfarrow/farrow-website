<template>
  <v-form>
    <v-container>
      New Recipe
      <v-row>
        <v-col cols="12"
               md="6"
               lg="4"
        >
          <v-text-field
            v-model="recipeName"
            label="Name"
          />
        </v-col>
        <v-col cols="12"
               md="6"
               lg="4"
        >
          <v-text-field
            v-model="recipeDesc"
            label="Description"
          />
        </v-col>

        <v-col cols="12"
               md="6"
               lg="4"
        >
          <v-text-field
            v-model="recipeName"
            label="Source"
          />
        </v-col>
        <v-col cols="12"
               md="6"
               lg="4"
        >
          <!-- TODO: Change this to a list -->
          <v-overflow-btn
            dense
            :items="categories"
            label="Category"
          />
        </v-col>
        <v-col cols="12"
               md="6"
               lg="4"
        >
          <v-text-field
            v-model="recipeName"
            label="Prep Time"
          />
        </v-col>
        <v-col cols="12"
               md="6"
               lg="4"
        >
          <v-text-field
            v-model="recipeName"
            label="Cook Time"
          />
        </v-col>

        <v-col cols="12"
               md="6"
               lg="4"
        >
          <v-text-field
            v-model="recipeName"
            label="Total Time"
          />
        </v-col>
        <v-col cols="12"
               md="6"
               lg="4"
        >
          <v-text-field
            v-model="recipeName"
            label="Servings"
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
              :label="'Ingredient ' + (index + 1)"
              placeholder="e.g., 16 oz Pizza Sauce"
              prepend-icon="mdi-plus-circle"
              append-outer-icon="mdi-close-circle"
              @click:append-outer="addRemoveItem(ingredients, index, true)"
              @click:prepend="addRemoveItem(ingredients, index, false)"
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
      <!-- <v-row>
        <template v-for="(instruction, index) in instructions">
          <v-col
            :key="'instruction'+index"
            cols="6"
          >
            <v-text-field
              v-model="recipeName"
              :label="'Instruction ' + (index + 1)"
            />
          </v-col>
        </template>
      </v-row> -->
      <!-- name: { type: String, required: true },
          desc: { type: String, required: true },
          source: String,
          category: Array,
          prepTime: String,
          cookTime: String,
          totalTime: String,
          servings: String,
          ingredients: { type: Array, required: true },
          instructions: { type: Array, required: true },
          likes: Number,
          comments: Array,
          pic: String,
          img: String -->
    </v-container>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    categories: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
    instructions: [''],
    ingredients: [''],
    recipeName: '',
    recipeDesc: '',
    source: '',
    category: '',
    prepTime: '',
    cookTime: '',
    totalTime: '',
    servings: ''

  }),
  methods: {
    addRemoveItem (list, index, remove) {
      if (remove) {
        list.length === 1 ? list.splice(index, 1, '') : list.splice(index, 1)
      } else {
        list.length - 1 === index ? list.push('') : list.splice(index + 1, 0, '')
      }
    }
  }
}
</script>
