<template>
  <div class="about">
    <v-container>
      <v-row>
        <v-col>
          <div class="headline">
            Currently,
          </div>
          <div class="body-1">
            I am currently a Software Engineer with Bioiq. I work primarily on the front end with Vue, JavaScript, and Bootstrap. Right now I live in the heart of Atlanta, GA and absolutely love it. In my spare time I enjoy practicing Muay Thai (Thai Boxing) hanging out with friends and family, discovering and learning new technologies, watching live music, and playing with my dogs. If there is something fun going on ITP You can probably find me there!
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="headline">
            Previously,
          </div>
          <div class="body-1">
            I graduated from North Carolina State University with a Bachelor of Science in Computer Science, and a minor in Criminology.  I've always had a passion for computers, since a young age.  Growing up I was always interested in technology, computers, and video games.
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="headline">
            Next,
          </div>
          <div class="body-1">
            I'm always looking to improve myself and am eager to continue learning. At this point my career has mainly focused on front-end development. One of my current goals is to progress into a full stack position, where I can make an impact on both sides of an application and continue to grow professionally. Within five years I'd like to be leading a small team, working on a project that is in the hands of many users.
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-carousel
      continuous
      cycle
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item,i) in pictures"
        :key="i"
        height="500px"
      >
        <v-img
          contain
          height="500px"
          :src="item.src"
        />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  name: 'about-page',
  data: () => ({

    pictures: [
      { title: 'wife', src: 'https://farrow-website.s3.amazonaws.com/wife-and-i-1.jpg' },
      { title: 'cap', src: 'https://farrow-website.s3.amazonaws.com/cap-1.jpg' },
      { title: 'MT', src: 'https://farrow-website.s3.amazonaws.com/mt-1.jpg' },
      { title: 'MT-team', src: 'https://farrow-website.s3.amazonaws.com/mt-2.jpg' },
      { title: 'shadow', src: 'https://farrow-website.s3.amazonaws.com/shad-1.jpg' },
      { title: 'mr&mrs', src: 'https://farrow-website.s3.amazonaws.com/wife-and-i-2.JPG' }
    ]
  })
}
</script>
