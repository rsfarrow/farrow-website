<template>
  <div>
    <v-img
      :src="'https://farrow-website.s3.amazonaws.com/landing.jpg'"
      :min-height="'100vh'"
      :min-width="'100%'"
    >
      <v-container fill-height
                   class="my-auto"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center" cols="12">
            <h1 class="display-4 font-weight-thin white--text">
              Sam Farrow
            </h1>
            <h4 class="display-1 white--text">
              Software Engineer
            </h4>
            <v-icon />
          </v-col>
          <!-- Simple buttons with tooltips to navigate -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn class="ma-2"
                     outlined
                     :large="$vuetify.breakpoint.mdAndUp"
                     :small="$vuetify.breakpoint.smAndDown"
                     fab
                     color="primary darken-2"
                     v-on="on"
                     @click="navTo('side-projects')"
              >
                <v-icon v-text="'mdi-code-tags'" />
              </v-btn>
            </template>
            <span>Side Projects</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn class="ma-2"
                     outlined
                     :large="$vuetify.breakpoint.mdAndUp"
                     :small="$vuetify.breakpoint.smAndDown"
                     fab
                     color="primary darken-2"
                     v-on="on"
                     @click="navTo(GITHUB_PROFILE, false)"
              >
                <v-icon v-text="'mdi-github-circle'" />
              </v-btn>
            </template>
            <span>Github Profile</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn class="ma-2"
                     outlined
                     :large="$vuetify.breakpoint.mdAndUp"
                     :small="$vuetify.breakpoint.smAndDown"
                     fab
                     color="primary darken-2"
                     v-on="on"
                     @click="navTo(EMAIL_LINK, false)"
              >
                <v-icon v-text="'mdi-email'" />
              </v-btn>
            </template>
            <span>Email</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn class="ma-2"
                     outlined
                     :large="$vuetify.breakpoint.mdAndUp"
                     :small="$vuetify.breakpoint.smAndDown"
                     fab
                     color="primary darken-2"
                     v-on="on"
                     @click="navTo(LINKEDIN_PROFILE, false)"
              >
                <v-icon v-text="'mdi-linkedin-box'" />
              </v-btn>
            </template>
            <span>LinkedIn</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn class="ma-2"
                     outlined
                     :large="$vuetify.breakpoint.mdAndUp"
                     :small="$vuetify.breakpoint.smAndDown"
                     fab
                     color="primary darken-2"
                     v-on="on"
                     @click="navTo('about')"
              >
                <v-icon v-text="'mdi-face-profile'" />
              </v-btn>
            </template>
            <span>About Me</span>
          </v-tooltip>
        </v-row>
      </v-container>
    </v-img>
  </div>
</template>
<script>
const GITHUB_PROFILE = 'https://github.com/rsfarrow'
const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/sam-farrow/'
const EMAIL_LINK = 'mailto: rsfarrow@ncsu.edu'
export default {
  data: () => ({
    GITHUB_PROFILE,
    EMAIL_LINK,
    LINKEDIN_PROFILE
  }),
  methods: {
    navTo (path, internal) {
      let self = this
      this.$store.dispatch('navTo', { path, internal, self })
    }
  }
}
</script>
