
<template>
  <div>
    <v-row
      justify="start"
      align="center"
    >

        <div class="inlineBox">
            <div class="colorBox" v-bind:style="setBackground(value)"></div>
        </div>
        <v-btn x-small class="float-right my" outlined color="primary" dark @click="dialog2 = true">
            Select Color
        </v-btn>
      <v-btn
        x-small class="float-right" outlined color="primary" dark
        @click="dialog3 = true"
      >
       Add Color
      </v-btn>



      <v-dialog
        v-model="dialog2"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            Select Color
          </v-card-title>
          <v-card-text>
            <div class="color-boxes">
                <div
                class="color-box small-box"
                @click="selectColor(color)"
                v-for="(color, index) in colors"
                :key="index"
                :style="`background-color: ${color}`"
                ></div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialog2 = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialog3"
        max-width="500px"
      >
        <v-card>
        <v-form v-model="isFormValid">
          <v-card-title>
            <span>Add Color</span>
          </v-card-title>
          <v-card-text>
            <div class="inlineBox">
                <v-text-field
                    label="Enter hex code"
                    :rules="rules"
                    v-model="customColor"
                    hide-details="auto"
                ></v-text-field>
            </div>
            <v-btn color="primary" dark 
            :disabled="!isFormValid"
                @click="selectColor(customColor)"
            >
                Add Color
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              
              @click="dialog3 = false"
            >
              Close
            </v-btn>
          </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

    <!--v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <div class="inlineBox">
                <div class="colorBox" v-bind:style="setBackground(value)"></div>
            </div>
            <v-btn x-small class="float-right" outlined color="primary" dark v-bind="attrs" v-on="on">
                Select Color
            </v-btn>
        </template>
        
        <v-card >
                <div class="color-boxes">
                      <div
                        class="color-box small-box"
                        @click="selectColor(color)"
                        v-for="(color, index) in colors"
                        :key="index"
                        :style="`background-color: ${color}`"
                      ></div>
                    </div>
            
        </v-card>
    </v-dialog-->
    <!--v-dialog v-model="dialog1" width="500">
        <template v-slot:activator="{ on, attrs1 }">
            <v-btn x-small class="float-right" outlined color="primary" dark v-bind="attrs1" v-on="on">
                Add Custom Color
            </v-btn>
        </template>
        
        <v-card >
            <div class="inlineBox">
                <v-text-field
                    label="Main input"
                    :rules="rules"
                    hide-details="auto"
                ></v-text-field>
            </div>
            <v-btn x-small class="float-right" outlined color="primary" dark v-bind="attrs" v-on="on">
                Add Color
            </v-btn>
        </v-card>
    </v-dialog-->



<script>
import {colors} from '../utils/colors'
export default {
    props:[
        'value'
    ],
    data(){
    return {
        customColor:"",
        colors,
        isFormValid:false,
        dialog2: false,
        dialog3: false,
        notifications: false,
        sound: true,
        widgets: false,
        rules: [
            value => !!value || 'Required.',
            value => (value && value.length == 7) || 'Should be 6 characters with # at start',
            value => {
                const pattern = /^#([0-9a-f]{3}){1,2}$/i
                return pattern.test(value) || 'Invalid code'
            },
        ],

    }
 },
 methods:{
    setBackground(hex){
        return {background:hex}
    },
    selectColor(hex){
        this.$emit('input', hex)
        this.dialog2= false
        this.dialog3= false
        this.customColor = ""
    }
 }
}
</script>

<style scoped>
    .colorBox{
        width:30px;
        height:30px;
        box-shadow:0 1px 2px #000;
    }
    .theme--dark.v-btn.v-btn--disabled.v-btn--has-bg{
      background-color:#9E2263 !important
    }
    .inlineBox{
        display:inline-block;margin-right: 10px;
    }
    button{
        margin-right: 10px;
    }
</style>