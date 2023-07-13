<template>
  <div class="text-left">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="lighten-2" dark v-bind="attrs" v-on="on">
          Add Program
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Program
        </v-card-title>

        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  type="text"
                  v-model="programName"
                  label="Program Name"
                  required
                  :rules="[v => !!v || 'Name is required']"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" md="6">
                <v-select 
                :rules="[v => !!v || 'This field is required']"
                :items="frequencyValues" label="Frequency" v-model="frequency"></v-select>
              </v-col>
              <v-col v-if="frequency && frequency === 'monthly'" class="d-flex" cols="12" md="6">
                <v-select  
                :rules="[v => !!v || 'This field is required']"
                :items="frequencyDetailValues" label="On" v-model="frequencyDetail"></v-select>
              </v-col>
              <v-col v-if="frequency && frequency === 'weekly'" class="d-flex" cols="12" md="6">
                <v-select 
                :rules="[v => !!v || 'This field is required']"
                item-text="text" item-value="value"  :items="frequencyDetailValues" label="On" v-model="frequencyDetail"></v-select>
              </v-col>
              <v-col  cols="12" md="12">
                 <!--v-text-field
                  type="number"
                  v-model="frequencyTime"
                  label="Time"
                  required
                ></v-text-field-->
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      label="Select time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[v => !!v || 'This field is required']"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>

              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="createProgram()"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  props: ['currentCoachId'],
  methods: {
    async createProgram() {
      if(this.$refs.form.validate()){
        debugger
      const done = await this.$apollo.mutate({
        mutation: gql`
          mutation createProgram($data: ProgramInput!) {
            createProgram(data: $data) {
              id
            }
          }
        `,
        variables: {
          data: {
            name: this.programName,
            coachId: parseInt(this.currentCoachId),
            frequency: this.frequency || "daily",
            frequencyDetail: parseInt(this.frequencyDetail),
            frequencyTime: this.time
          },
        },
      });

      if (done) {
        this.dialog = false;
        this.programName = null
        this.frequency = null
        this.frequencyDetail = null
        this.frequencyTime = null
        return true
      }
      }
    },
  },
  computed:{
    frequencyDetailValues() {
      if (this.frequency === 'monthly') return [...Array(28).keys()].map(num => num + 1);
      if (this.frequency === 'weekly') {
        return [
          {value: "0", text: "Monday"},
          {value: "1", text: "Tuesday"},
          {value: "2", text: "Wednesday"},
          {value: "3", text: "Thursday"},
          {value: "4", text: "Friday"},
          {value: "5", text: "Saturday"},
          {value: "6", text: "Sunday"},
        ]
      }
      return 0
    }
  },
  data() {
    return {
      dialog: false,
      time: null,
      menu2: false,
      programName: "",
      frequency: null,
      frequencyValues: ['daily' , 'weekly', 'monthly'],
      frequencyDetail: 0,
      frequencyTimeValues: 0,
    };
  },
};
</script>