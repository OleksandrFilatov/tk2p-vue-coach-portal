<template>
  <v-container>
    <div class="private-label-page">
      <h2>Branding</h2>
      <div class="row">
        <div class="col-md-6">
          <table>
            <thead>
              <th style="padding: 20px">App Colors</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <tenant-template-edit
                    style="margin: auto"
                    label="Main Menu Background"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <tenant-template-edit
                    style="margin: auto"
                    label="Main Menu Text"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <tenant-template-edit
                    style="margin: auto"
                    label="Overlay Box Background"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <tenant-template-edit
                    style="margin: auto"
                    label="Overlay Box Header"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <tenant-template-edit
                    style="margin: auto"
                    label="Notification Name"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <th style="padding: 20px">Welcome Message Overlay</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <v-text-field
                    label="Registration Welcome Message"
                    value="Welcome!"
                  ></v-text-field>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <th style="padding: 20px">Notification Information</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <v-text-field
                    value="Lisa Sasevich – Be Sassy!"
                    label="Notification Name"
                  ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field label="Notification Icon"></v-text-field>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-6">
          <table>
            <thead>
              <th style="padding: 20px">Contact Overlay Information</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <v-text-field
                    label="Contact Name"
                    value="Lisa"
                  ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    label="Header/Name"
                    value="About Lisa"
                  ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field label="Picture"></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field label="Introduction/Description"></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field label="Contact #1"></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field label="Contact #2"></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field label="Contact #3"></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field label="Contact #4"></v-text-field>
                </td>
              </tr>
            </tbody>
          </table>
          <v-btn color="primary" style="margin: 10%; padding: 10px 50px"
            >Save</v-btn
          >
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import TenantTemplateEdit from "../common/TenantTemplateEdit.vue";
export default {
  name: "PrivateLabel",
  components: {
    TenantTemplateEdit,
  },
  data() {
    return {};
  },
  methods: {
    // getData() {
    // },
  },
  mounted() {},
};
</script>

<style src="./Branding.scss" lang="scss"/>