<template>
  <div>
    <v-toolbar dark color="blue-grey darken-1" class="hidden-xs-and-down">
      <v-toolbar-title class="ml-4"><v-img src="../../assets/logo1.png"></v-img></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          class="top-menu"
          v-for="item in nav"
          :key="item.icon"
          :to="item.to"
          :title="item.title"
          >{{ item.text }}</v-btn
        >
      </v-toolbar-items>
    </v-toolbar>

    <v-toolbar dark color="blue-grey darken-1" class="hidden-sm-and-up">
      <v-toolbar-title class="ml-4"><v-img src="../../assets/logo1.png"></v-img></v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon class="mx-1" @click="dialog = true">
            <v-icon style="font-size: 28px">mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-toolbar flat color="blue-grey darken-1">
            <v-toolbar-title>TK2P</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="dialog = false">
              <v-icon role="img" aria-hidden="false">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list>
            <v-list-item
              v-for="(item, index) in nav"
              @click="dialog = false"
              :key="index"
              :to="item.to"
            >
              <v-list-item-action>
                <v-icon v-if="item.icon">mdi-{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title :title="item.title">{{
                  item.text
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-main class="blue-grey lighten-4 px-16 pt-16 vmain">
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
  import store from "../../store";
  import { mapGetters } from "vuex";

  export default {
    
    store,
    computed: {
      ...mapGetters({
        currentCoach: "loggedInCoach",
      }),
    },
    data() {
      return {
        dialog: false,
        nav: [
          {
            icon: "home",
            text: "Dashboard Stats",
            title: "Go to Dashboard",
            to: "/app",
          },
          {
            text: "Backgrounds ",
            title: "Backgrounds",
            to: "/app/library",
          },
          {
            icon: "account-check",
            text: "Coach Profile",
            title: "Profile",
            to: "/app/profile",
          },
          {
            text: "Logout",
            title: "Logout",
            to: "/login",
          },
        ],
      };
    },
  };
</script>


<style scoped>
  .v-main {
    min-height: calc(100vh - 64px);
  }
  .v-toolbar__title {
    width: 65px;
    height: 65px;
    background: #fff;
    border-radius: 50%;
    padding: 2px;
    display: flex;
}
</style>