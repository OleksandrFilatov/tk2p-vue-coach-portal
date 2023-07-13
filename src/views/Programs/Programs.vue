<template>
  <v-container>
    <div class="programs-page">
      <h2>Program List</h2>
      <table class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
        <thead>
          <tr>
            <th colspan="3" class="text-center">Account Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Maximum</td>
            <td>Current</td>
          </tr>
          <tr>
            <td>Programs</td>
            <td>4</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Content Items</td>
            <td>1000</td>
            <td>651</td>
          </tr>
          <tr>
            <td>Subscribers</td>
            <td>500</td>
            <td>328</td>
          </tr>
        </tbody>
      </table>
      <table class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
        <thead>
          <tr>
            <th colspan="8" class="text-center">Program Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3">Program Name</td>
            <td>Content Items</td>
            <td>Subscribers</td>
            <td>Access Code</td>
            <td>Copy Html Code</td>
          </tr>
          <tr>
            <td colspan="3">
              <a href="program-detail">Speak to Sell Bootcamp</a>
            </td>
            <td>25</td>
            <td>147</td>
            <td>AYC056</td>
            <td><v-btn>Copy Code</v-btn></td>
          </tr>
          <tr>
            <td colspan="3">
              <a href="program-detail">Nail Your Offer</a>
            </td>
            <td>48</td>
            <td>25</td>
            <td>RTD204</td>
            <td><v-btn>Copy Code</v-btn></td>
          </tr>
          <tr>
            <td colspan="3">
              <a href="program-detail">Event Profit Secrets</a>
            </td>
            <td>0</td>
            <td>0</td>
            <td>PRT192</td>
            <td><v-btn>Copy Code</v-btn></td>
          </tr>
          <tr>
            <td colspan="3">Totals</td>
            <td>73</td>
            <td>172</td>
            <td></td>
            <td>
              <v-dialog transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" v-bind="attrs" v-on="on"
                    >Add Program</v-btn
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="primary" dark>Add Program</v-toolbar>
                    <v-card-text>
                      <div class="text-h2 pa-12">
                        <v-text-field label="Program Name"></v-text-field>
                        <v-text-field label="Content Items"></v-text-field>
                        <v-text-field label="Access Code"></v-text-field>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog.value = false">Cancel</v-btn>
                      <v-btn color="primary" text @click="dialog.value = false"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
        <thead>
          <tr>
            <th colspan="3" class="text-center">Coach Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Coach Name</td>
            <td>
              <v-text-field value="Lisa Sasevich" flat solo></v-text-field>
            </td>
            <td><v-btn>Edit</v-btn></td>
          </tr>
          <tr>
            <td>Company Name</td>
            <td>
              <v-text-field value="Lisa Sasevich, LLC" flat solo></v-text-field>
            </td>
            <td><v-btn>Edit</v-btn></td>
          </tr>
          <tr>
            <td>Primary eMail</td>
            <td><v-text-field flat solo></v-text-field></td>
            <td><v-btn>Edit</v-btn></td>
          </tr>
          <tr>
            <td>Primary Phone</td>
            <td><v-text-field flat solo></v-text-field></td>
            <td><v-btn>Edit</v-btn></td>
          </tr>
          <tr>
            <td>Password</td>
            <td><v-text-field flat solo></v-text-field></td>
            <td><v-btn>View/Edit</v-btn></td>
          </tr>
          <tr>
            <td>Subscription Level</td>
            <td>Gold</td>
            <td><v-btn>Upgrade</v-btn></td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-container>
</template>

<style src="./Programs.scss" lang="scss"/>
