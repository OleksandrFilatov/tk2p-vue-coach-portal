<template>
  <div class="text-left">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="lighten-2" dark v-bind="attrs" v-on="on">
          Add Program Content Item
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Content Item
        </v-card-title>

        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  type="text"
                  v-model="text"
                  label="Text"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="d-flex" cols="12" sm="6">
                <v-select :items="contentType"
                  item-text="name"
                  item-value="name"
                  v-model="type"
                 label="Content Type"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="12">
                <h4>Select Graphic</h4>
              </v-col>
              <v-col
                v-for="n in allBgs"
                :key="n"
                :class="'d-flex child-flex ' + isSelectedClass(n) "
                cols="4"
                @click="setGraphicUrl(n.url)"
              >
                <v-img :src="n.url" aspect-ratio="1" class="grey lighten-2">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
            
          </v-container>
        </v-form>

        <v-divider></v-divider>
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
          <v-btn color="primary" text @click="create()"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["programId", "lastNumber"],
  methods: {
    ...mapActions({
      createProgram: "addProgramContentItem",
      getBgs: "getStockBackgrounds"
    }),
    setGraphicUrl(n) {
      // console.log(n)
      this.graphicUrl = n;
    },
    isSelectedClass(n){
      return this.graphicUrl == n ? ' selectedBackground': '';
    },
    create() {
      this.dialog = false;
      this.createProgram({
        programId: this.programId,
        text: this.text,
        graphicUrl: this.graphicUrl,
        order: this.lastNumber + 1,
        contentType: this.contentType,
      }).then(()=>{
        this.snackbar = true
        console.log("hello)
      });
      // this.lastNumber=this.lastNumber+1
    },
  },
  computed: {
    ...mapGetters({
      allBgs: "allBgs",
    }),
  },
  data() {
    return {
      dialog: false,
      text: "",
      graphicUrl: "",
      contentType: "",
      types: ["Program Content", "Adhoc Content", "Initial Content"],
      snackbar: false,
      multiLine: true,
      text: `Item updated!`
    };
  },
  mounted() {
    this.getBgs()
  }
};
</script>
<style lang="less" scoped>
 .selectedBackground{
   border:3px solid teal;
 }
</style>