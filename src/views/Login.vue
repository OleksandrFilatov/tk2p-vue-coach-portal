<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="login"
                    label="Coach Email"
                    v-model="email"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-snackbar v-model="snackbar" :multi-line="multiLine">
                {{ text }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="primary"
                    outlined
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="doLogin()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      attemptLogin: "attemptLogin",
    }),
    doLogin() {
      this.attemptLogin({ email: this.email, password: this.password })
        .then(() => {
          this.$router.push("/app");
        })
        .catch(() => {
          this.snackbar = true;
        });
    },
  },
  data: () => ({
    email: "",
    password: "",
    snackbar: false,
    multiLine: true,
    text: `Password invalid.`,
  }),
  mounted() {
    if (this.$route.query && this.$route.query.email && this.$route.query.password) {
      const {email, password} = this.$route.query
      this.email = email
      this.password = password
      this.doLogin()
    }
  }
};
</script>