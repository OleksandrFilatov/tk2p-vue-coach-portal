<template>
  <v-container>
    <div class="program-detail-page">
      <h2>Program Detail</h2>
      <table class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
        <thead>
          <tr>
            <th colspan="6" class="text-center">Program Selection</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Selected</td>
            <td colspan="3">Program Name</td>
            <td>Content Items</td>
            <td>Clients Subscribed</td>
          </tr>
          <tr>
            <td><input type="radio" value="1" name="radioGroup" checked /></td>
            <td colspan="3">
              <v-text-field
                value="Speak to Sell Bootcamp"
                flat
                solo
              ></v-text-field>
            </td>
            <td>25</td>
            <td>147</td>
          </tr>
          <tr>
            <td><input type="radio" value="2" name="radioGroup" /></td>
            <td colspan="3">
              <v-text-field value="Nail Your Offer" flat solo></v-text-field>
            </td>
            <td>48</td>
            <td>25</td>
          </tr>
          <tr>
            <td><input type="radio" value="3" name="radioGroup" /></td>
            <td colspan="3">
              <v-text-field
                value="Event Profit Secrets"
                flat
                solo
              ></v-text-field>
            </td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td><input type="radio" value="4" name="radioGroup" /></td>
            <td colspan="3">
              <v-text-field value="Undefined" flat solo></v-text-field>
            </td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td></td>
            <td colspan="3">Totals</td>
            <td>73</td>
            <td>172</td>
          </tr>
        </tbody>
      </table>
      <table class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
        <thead>
          <tr>
            <th colspan="5" class="text-center">Program Parameters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Content Frequency</td>
            <td>
              <v-select :items="frequency" flat solo value="Weekly"></v-select>
            </td>
            <td><v-btn>Change</v-btn></td>
          </tr>
          <tr>
            <td>Content Day</td>
            <td>
              <v-select :items="weekday" flat solo value="Monday"></v-select>
            </td>
            <td><v-btn>Change</v-btn></td>
          </tr>
          <tr>
            <td>Send Time (Approx)</td>
            <td>8:00 am ET</td>
            <td><v-btn>Change</v-btn></td>
          </tr>
          <tr>
            <td>Start Messages at</td>
            <td>
              <v-select
                :items="starttime"
                flat
                solo
                value="Same as Other Subscribers"
              ></v-select>
            </td>
            <td><v-btn>Change</v-btn></td>
          </tr>
        </tbody>
      </table>
      <table class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
        <thead>
          <tr>
            <th colspan="6" class="text-center">
              Ad Hoc Content for the Selected Program (sent immediately)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">Text</td>
            <td colspan="2">Graphic</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">
              <v-text-field
                value="A reminder you want to send"
                flat
                solo
              ></v-text-field>
            </td>
            <td colspan="2">
              <v-text-field
                value="Library: Horse on the Beach"
                flat
                solo
              ></v-text-field>
            </td>
            <td><v-btn>Edit</v-btn></td>
            <td><v-btn>Send Now</v-btn></td>
          </tr>
        </tbody>
      </table>
      <table class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
        <thead>
          <tr>
            <th colspan="5" class="text-center">
              Initial Content sent when Subscriber registers for Program
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">Text</td>
            <td colspan="2">Graphic</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">
              <v-text-field
                flat
                solo
                value="A reminder you want to send"
              ></v-text-field>
            </td>
            <td colspan="2">
              <v-text-field
                flat
                solo
                value="Library: Horse on the Beach"
              ></v-text-field>
            </td>
            <td><v-btn>Edit</v-btn></td>
          </tr>
        </tbody>
      </table>
      <table class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
        <thead>
          <tr>
            <th colspan="8" class="text-center">
              Curated Content for the Selected Program
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Order</td>
            <td colspan="2">Text</td>
            <td colspan="2">Graphic</td>
            <td># Shares</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <v-text-field flat solo value="1"></v-text-field>
            </td>
            <td colspan="2">
              <v-text-field flat solo value="First tid bit"></v-text-field>
            </td>
            <td colspan="2">
              <v-text-field
                flat
                solo
                value="Library: Horse on the Beach"
              ></v-text-field>
            </td>
            <td></td>
            <td><v-btn>Edit</v-btn></td>
            <td><v-btn>Reorder</v-btn></td>
          </tr>
          <tr>
            <td>
              <v-text-field flat solo value="2"></v-text-field>
            </td>
            <td colspan="2">
              <v-text-field
                flat
                solo
                value="Second important item"
              ></v-text-field>
            </td>
            <td colspan="2">
              <v-text-field
                flat
                solo
                value="Library: Purple Mountains"
              ></v-text-field>
            </td>
            <td></td>
            <td><v-btn>Edit</v-btn></td>
            <td><v-btn>Reorder</v-btn></td>
          </tr>
          <tr>
            <td>
              <v-text-field flat solo value="3"></v-text-field>
            </td>
            <td colspan="2">
              <v-text-field
                flat
                solo
                value="Third even more important item"
              ></v-text-field>
            </td>
            <td colspan="2">
              <v-text-field
                flat
                solo
                value="Custom: Beach 3.jpeg"
              ></v-text-field>
            </td>
            <td></td>
            <td><v-btn>Edit</v-btn></td>
            <td><v-btn>Reorder</v-btn></td>
          </tr>
          <tr>
            <td>
              <v-text-field flat solo value="4"></v-text-field>
            </td>
            <td colspan="2">
              <v-text-field
                flat
                solo
                value="Fourth and final important item"
              ></v-text-field>
            </td>
            <td colspan="2">
              <v-text-field flat solo value="Default"></v-text-field>
            </td>
            <td></td>
            <td><v-btn>Edit</v-btn></td>
            <td><v-btn>Reorder</v-btn></td>
          </tr>
        </tbody>
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="margin-top: 12px"
              color="primary"
              v-bind="attrs"
              v-on="on"
              >Add a New Item</v-btn
            >
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Add Item</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">
                  <v-text-field label="Order"></v-text-field>
                  <v-text-field label="Text"></v-text-field>
                  <v-text-field label="Graphic"></v-text-field>
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">Cancel</v-btn>
                <v-btn color="primary" text @click="dialog.value = false"
                  >Create</v-btn
                >
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </table>
    </div>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      frequency: ["Daily", "Weekly", "Monthly"],
      weekday: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      starttime: ["Same as Other Subscribers", "Upon Subscription Start"],
    };
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style src="./ProgramDetail.scss" lang="scss"/>
