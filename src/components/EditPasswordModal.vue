<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
        
        <v-btn x-small class="float-right" outlined color="primary" dark v-bind="attrs" v-on="on">
            Edit
        </v-btn>
        </template>

        <v-card>
        <v-card-title class="text-h5 grey lighten-2">
            Edit Password 
        </v-card-title>

        <v-form ref="form">
            <v-container>
            <v-row>
                <v-col cols="12" md="12">
                <v-text-field
                    type="password"
                    v-model="password"
                    label="New password"
                    :rules="[v => !!v || 'This field is required']"
                    required
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12">
                <v-text-field
                    type="password"
                    v-model="rePassword"
                    :rules="[(password === rePassword) || 'Password must match']"
                    label="Confirm Password"
                    required
                ></v-text-field>
                </v-col>
            </v-row>
            </v-container>
        </v-form>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="updateCoach()"> Save </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import gql from "graphql-tag";
import { mapGetters } from "vuex";
export default {
  props: ['currentCoachId'],
  computed: {
     ...mapGetters({
      currentCoach: "loggedInCoach",
    }),
  },
  methods: {
    async updateCoach(){
        if(this.$refs.form.validate()){
            let data ={
                password:this.password,
                firstName:this.currentCoach.firstName
            }
            let id = parseFloat(this.currentCoachId)
            console.log(id,"parsed")
            const done = await this.$apollo.mutate({
            mutation: gql`
                mutation updateCoach($id:Float!,$data: CoachInput!) {
                    updateCoach(id:$id,data: $data) {
                        id
                    }
                }
            `,
            variables: {
                id:id,
                data: data
            },
            });

            if (done) {
                this.dialog = false;
            }
        }
    }
  },
  data() {
    return {
      dialog: false,
      password:'',
      rePassword:''
    };
  },
};
</script>