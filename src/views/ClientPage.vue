<template>
    <v-container id="regular-tables-view" fluid tag="section">
    <view-intro heading="Content Subscribers" />
    <v-row>
      <v-col md="8">
        <h3 class="mt-3">Subscribers</h3>
        <v-row>
          <v-col>
            <material-card
              icon="mdi-clipboard-text"
              icon-small
              title="Simple Table"
              color="accent"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="primary--text">First Name</th>
                    <th class="primary--text">Last Name</th>
                    <th class="primary--text">Email</th>
                    <th class="primary--text">Timezone</th>
                    <th class="primary--text">Enrolled</th>
                    <th class="primary--text">Last Confirmed</th>
                    <th class="primary--text">Last Sent</th>
                    <th class="primary--text">Shares</th>
                    <th class="text-right primary--text"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-right">
                      <v-btn small outlined color="primary">remove</v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </material-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>    