

<template>

  <v-app id="inspire">

    <router-view></router-view>
  </v-app>
</template>

<style>
@font-face {
  font-family: "AmaticSC-Regular";
  src: local("AmaticSC-Regular"),
   url(./assets/fonts/AmaticSC-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "AnonymousPro-Regular";
  src: local("AnonymousPro-Regular"),
   url(./assets/fonts/AnonymousPro-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Caveat-Regular";
  src: local("Caveat-Regular"),
   url(./assets/fonts/Caveat-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "CinzelDecorative-Regular";
  src: local("CinzelDecorative-Regular"),
   url(./assets/fonts/CinzelDecorative-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Comfortaa-Regular";
  src: local("Comfortaa-Regular"),
   url(./assets/fonts/Comfortaa-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "GreatVibes-Regular";
  src: local("GreatVibes-Regular"),
   url(./assets/fonts/GreatVibes-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Handlee-Regular";
  src: local("Handlee-Regular"),
   url(./assets/fonts/Handlee-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Handlee-Regular";
  src: local("IndieFlower-Regular"),
   url(./assets/fonts/IndieFlower-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "IndieFlower-Regular";
  src: local("IndieFlower-Regular"),
   url(./assets/fonts/IndieFlower-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "MountainsofChristmas-Regular";
  src: local("MountainsofChristmas-Regular"),
   url(./assets/fonts/MountainsofChristmas-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "PoiretOne-Regular";
  src: local("PoiretOne-Regular"),
   url(./assets/fonts/PoiretOne-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Raleway-Regular";
  src: local("Raleway-Regular"),
   url(./assets/fonts/Raleway-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Righteous-Regular";
  src: local("Righteous-Regular"),
   url(./assets/fonts/Righteous-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Roboto-Regular";
  src: local("Roboto-Regular"),
   url(./assets/fonts/Roboto-Regular.ttf) format("truetype");
}
.top-menu {
  background-color: transparent !important;
}
.theme--dark.v-btn--active:hover::before,
.theme--dark.v-btn--active::before {
  background-color: transparent !important;
  opacity: 1 !important;
}
</style>

<script>
import store from "./store";
import { mapGetters } from "vuex";

export default {
  created: function () {
    if (!this.currentCoach && location.pathname.indexOf('login') === -1 ) {
      location.replace("/login");
    }
  },
  store,
  computed: {
    ...mapGetters({
      currentCoach: "loggedInCoach",
    }),
  },
  name: "App",
};
</script>
