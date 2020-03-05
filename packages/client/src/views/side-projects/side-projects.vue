<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <template v-for="project in sideProjects">
        <v-col :key="project.title"
               cols="12"
               sm="4"
        >
          <v-card
            link
            :disabled="project.disabled"
            @click="navTo(project.path)"
          >
            <v-img
              :src="project.disabled ? 'https://farrow-website.s3.amazonaws.com/soon.png' : project.img"
            />
            <v-card-title>
              {{ project.title }}
              <v-spacer />
              <v-btn
                icon
                @click.stop="showInfo(project.title, project.desc)"
              >
                <v-icon v-text="'mdi-information-outline'" />
              </v-btn>
            </v-card-title>
          </v-card>
        </v-col>
      </template>
      <v-dialog v-model="showDialog" :max-width=" $vuetify.breakpoint.smAndDown ? '95%' : '50%'">
        <v-card>
          <v-card-title class="headline">
            {{ title }}
            <v-spacer />
            <v-btn color="accent darken-3"
                   icon
                   @click="showDialog = false"
            >
              <v-icon v-text="'mdi-close'" />
            </v-btn>
          </v-card-title>
          <v-card-text>{{ desc }} </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    sideProjects: [
      { title: 'Digital Cookbook', icon: 'mdi-book', disabled: false, path: 'digital-cookbook-list', img: 'https://farrow-website.s3.amazonaws.com/cookbook.jpeg', internal: true, desc: `This was my first idea that was created from a need.  I enjoy cooking but loath looking up and finding recipes again and again, then scrolling through a huge page of someone explaining that these are their grandmothers secret recipe and blah blah blah.  I created this to put in the recipes that I find myself most often making.  It’s created using GraphQL on the backend, for fetching or creating new recipes.  Definitely overkill for this small amount of data, but it was a ton of fun learning and creating. Future improvements include adding nutritional data, adding ratings and comments.` },
      { title: 'Whack-a-Mole', icon: 'mdi-hammer', disabled: false, path: 'whack-a-mole', img: 'https://farrow-website.s3.amazonaws.com/game.jpeg', internal: true, desc: `A fun arcade game reimagined with emojis. You can pick your speed and how many moles to increase the difficulty, added bonus on desktop - custom cursor!  Top 5 scores will be saved! ` },
      { title: 'Tic Tac Toe', icon: 'mdi-alpha-x-box-outline', disabled: false, path: 'tic-tac-toe', img: 'https://farrow-website.s3.amazonaws.com/ttt.jpg', internal: true, desc: `The classic Tic Tac Toe -- now Digital (as if it wasn't already.) Take turns with a pal and show them how to win!` },
      { title: 'Boxing Timer', icon: 'mdi-boxing-glove', disabled: false, path: 'boxing-timer-list', img: 'https://farrow-website.s3.amazonaws.com/heavy.jpg', internal: true, desc: `This was an idea that I came up with when I was doing bag rounds that my coach predefined.  I had to keep double checking what I was supposed to be doing and exiting the timer, I thought it would be much easier if I had a list of workouts and could pick one, then have it tell me what I should be working on.  This one is still a work in progress.  ` },
      { title: 'Bike Workouts', icon: 'mdi-bike', disabled: false, path: 'bike-workout-list', img: 'https://farrow-website.s3.amazonaws.com/workout.jpg', internal: true, desc: `My wife asked me to build this for her, she has a few bike workouts she likes to do depending on how much time she has.  It started out as a pretty basic implementation, but every time she uses it there's a new feature request! ` }
    ],
    showDialog: false,
    title: '',
    desc: ''
  }),
  methods: {
    navTo (path, internal) {
      let self = this
      this.$store.dispatch('navTo', { path, internal, self })
    },
    showInfo (title, desc) {
      this.title = title
      this.desc = desc
      this.showDialog = true
    }
  }
}
</script>
