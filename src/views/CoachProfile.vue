<template>
  <v-container id="user-profile-view" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <h3>App Colors</h3>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Element</th>
                <th class="text-left">Colors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Menu Background</td>
                <td>
                  <color-picker-dialog
                    v-model="brandingData.menuBackgroundColor"
                    @input="save()"
                  ></color-picker-dialog>
                </td>
              </tr>
              <tr>
                <td>Menu Text Color</td>
                <td>
                  <color-picker-dialog
                    v-model="brandingData.menuTextColor"
                    @input="save()"
                  ></color-picker-dialog>
                </td>
              </tr>
              <tr>
                <td>Content text color</td>
                <td>
                  <color-picker-dialog
                    v-model="brandingData.contentColor"
                    @input="save()"
                  ></color-picker-dialog>
                </td>
              </tr>
              <tr>
                <td>Font Family</td>
                <td>
                  <v-select
                    :items="fonts"
                    item-text="displayName"
                    item-value="fontName"
                    v-model="brandingData.fontFamily"
                    @change="save()"
                  >
                    <template slot="selection" slot-scope="data">
                      <!-- HTML that describe how select should render selected items -->
                      {{ data.item.displayName }}
                    </template>
                    <template slot="item" slot-scope="data">
                      <!-- HTML that describe how select should render items when the select is open -->
                      <span v-bind:style="'font-family:' + data.item.fontName">
                        {{ data.item.displayName }}
                      </span>
                    </template>
                  </v-select>
                </td>
              </tr>
              <tr>
                <td>Font Size</td>
                <td>
                  <v-select
                    :items="fontSizes"
                    item-text="sizeName"
                    item-value="fontSize"
                    v-model="brandingData.fontSize"
                    @change="save()"
                  >
                  </v-select>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <h3 class="mt-4">Coach Logo </h3>

        <v-sheet>
          <v-col
            class="d-flex child-flex vimg-container"
            cols="2"
          >
            <v-img :src="currentCoach.coachLogo" aspect-ratio="1" class="grey lighten-2" @click="chooseLogo()" >
              
            </v-img>
          </v-col>
          <div>
            <input
              class="coachLogoUpload"
              truncate-length="15"
              type="file"
              accept="image/png, image/jpg, image/bmp"
              style="display: none"
              @change="updateCoachLogo"
            />
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="4">
        <h3>Welcome Message Overlay</h3>
        <v-sheet rounded="" class="pa-3">
          <v-form>
            <v-textarea
              outlined
              name="input-7-4"
              label="Registration Welcome Message"
              v-model="contactInfoData.welcomeMessage"
              value=""
              @change="save()"
            ></v-textarea>
          </v-form>
        </v-sheet>
        <h3 class="mt-3">Contact Overlay Information</h3>
        <v-sheet rounded="">
          <v-card class="mx-auto" tile>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Contact Name</v-list-item-title>
                <v-list-item-subtitle>
                  <v-text-field
                    outlined
                    name="input-7-4"
                    value=""
                    v-model="contactInfoData.contactInfoName"
                    @change="saveContactInfo()"
                  ></v-text-field>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Header Name</v-list-item-title>
                <v-list-item-subtitle>
                  <v-text-field
                    outlined
                    name="input-7-4"
                    value=""
                    v-model="contactInfoData.contactInfoHeader"
                    @change="saveContactInfo()"
                  ></v-text-field>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-flex
              xs12
              class="
                text-xs-center text-sm-center text-md-center text-lg-center
              "
            >
              <img
                :src="contactInfoData.contactInfoPhoto"
                height="150"
                v-if="contactInfoData.contactInfoPhoto"
              />
            </v-flex>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Picture</v-list-item-title>
                <v-list-item-subtitle>
                  <v-file-input
                    truncate-length="15"
                    type="file"
                    ref="image"
                    accept="image/*"
                    @change="uploadContactPhoto"
                  ></v-file-input>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Introduction/Description</v-list-item-title>
                <v-list-item-subtitle>
                  <v-textarea
                    outlined
                    name="input-7-4"
                    v-model="contactInfoData.contactInfoIntroduction"
                    @change="saveContactInfo()"
                    value=""
                  ></v-textarea>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Twitter link</v-list-item-title>
                <v-list-item-subtitle>
                  <v-text-field
                    outlined
                    name="input-7-4"
                    label="Twitter"
                    v-model="contactInfoData.contactInfoTwitter"
                    @change="saveContactInfo()"
                    value=""
                  ></v-text-field>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Facebook link</v-list-item-title>
                <v-list-item-subtitle>
                  <v-text-field
                    outlined
                    name="input-7-4"
                    label="Facebook"
                    v-model="contactInfoData.contactInfoFacebook"
                    @change="saveContactInfo()"
                    value=""
                  ></v-text-field>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>YouTube Link</v-list-item-title>
                <v-list-item-subtitle>
                  <v-text-field
                    outlined
                    name="input-7-4"
                    label="YouTube"
                    v-model="brandingData.contactInfoYoutube"
                    @change="saveContactInfo()"
                    value=""
                  ></v-text-field>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Instagram Link</v-list-item-title>
                <v-list-item-subtitle>
                  <v-text-field
                    outlined
                    name="input-7-4"
                    label="Instagram"
                    v-model="contactInfoData.contactInfoInstagram"
                    @change="saveContactInfo()"
                    value=""
                  ></v-text-field>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Contact Email</v-list-item-title>

                <v-list-item-subtitle>
                  <v-text-field
                    outlined
                    name="input-7-4"
                    label="Email"
                    v-model="contactInfoData.contactInfoEmail"
                    @change="saveContactInfo()"
                    value=""
                  ></v-text-field>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="4">
        <h3>Preview Coach</h3>
        <v-sheet
          rounded=""
          class="pa-3 preview"
          :style="`font-family:${this.brandingData.fontFamily};font-size:${this.brandingData.fontSize};`"
        >
          <div class="preview-title-div">
            <p class="preview-title">{{contactInfoData.contactInfoHeader}}</p>
          </div>
          <div class="preview-content-div">
            <p class="preview-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <p class="preview-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div class="sites">
            <v-row>
              <v-col class="column" cols="12" md="6">
                <v-icon>mdi-web</v-icon>
                {{ contactInfoData.contactInfoYoutube }}
              </v-col>
              <v-col class="column" cols="12" md="6">
                <v-icon>mdi-facebook</v-icon>
                {{ contactInfoData.contactInfoFacebook }}
              </v-col>
            </v-row>
            <v-row>
              <v-col class="column" cols="12" md="6">
                <v-icon>mdi-email-outline</v-icon>
                {{ contactInfoData.contactInfoEmail }}
              </v-col>
              <v-col class="column" cols="12" md="6">
                <v-icon>mdi-web</v-icon>
                {{ contactInfoData.contactInfoInstagram }}
              </v-col>
            </v-row>
            <!-- <v-icon>mdi-facebook</v-icon>
            <v-icon>mdi-email-outline</v-icon>
            <v-icon>mdi-home-outline</v-icon>
            <v-icon>mdi-share-variant-outline</v-icon>
            <v-icon>mdi-account-outline</v-icon>
            <v-icon>mdi-information-outline</v-icon>
            <v-icon>mdi-cog-outline</v-icon> -->
          </div>
          <div
            class="preview-footer"
            :style="`background:${this.brandingData.menuBackgroundColor};color:${this.brandingData.menuTextColor}`"
          >
            <div class="d-flex justify-space-around mb-6">
              <div class="pa-2">
                <v-icon :style="`color:${this.brandingData.menuTextColor}`"
                  >mdi-home-outline</v-icon
                ><br />
                Home
              </div>
              <div class="pa-2">
                <v-icon :style="`color:${this.brandingData.menuTextColor}`"
                  >mdi-share-variant-outline</v-icon
                ><br />
                Share
              </div>
              <div class="pa-2">
                <v-icon :style="`color:${this.brandingData.menuTextColor}`"
                  >mdi-account-outline</v-icon
                ><br />
                Coach
              </div>
              <div class="pa-2">
                <v-icon :style="`color:${this.brandingData.menuTextColor}`"
                  >mdi-information-outline</v-icon
                ><br />
                About
              </div>
              <div class="pa-2">
                <v-icon :style="`color:${this.brandingData.menuTextColor}`"
                  >mdi-cog-outline</v-icon
                ><br />
                Manage
              </div>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ColorPickerDialog from "../components/ColorPickerDialog.vue";
import gql from "graphql-tag";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserProfileView",
  data() {
    return {
      menuBackground: "",
      menuTextColor: "",
      fontSize: "",
      fontFamily: "",
      contentColor: "",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      brandingData: {},
      contactInfoData: {},
    };
  },
  computed: {
    ...mapGetters({
      currentCoach: "loggedInCoach",
      fonts: "fonts",
      fontSizes: "fontSizes",
    }),
  },
  components: {
    ColorPickerDialog,
  },
  methods: {
    ...mapActions(["uploadCoachLogo"]),
    save() {
      const id = parseFloat(this.currentCoach.id);
      this.$apollo.mutate({
        mutation: gql`
          mutation updateCoachBranding(
            $id: Float!
            $data: CoachBrandingInput!
          ) {
            updateCoachBranding(id: $id, data: $data) {
              id
            }
          }
        `,
        variables: {
          id,
          data: this.brandingData,
        },
      });
    },
    saveContactInfo() {
      console.log("saveContactInfo Called", this.contactInfoData);
      const id = parseFloat(this.currentCoach.id);
      this.$apollo.mutate({
        mutation: gql`
          mutation updateCoachBrandingContactInfo(
            $id: Float!
            $data: CoachBrandingContactInput!
          ) {
            updateCoachBrandingContactInfo(id: $id, data: $data) {
              id
            }
          }
        `,
        variables: {
          id,
          data: this.contactInfoData,
        },
      });
    },
    getBranding() {
      const id = parseFloat(this.currentCoach.id);
      this.$apollo
        .query({
          query: gql`
            query CoachBranding($id: Float!) {
              CoachBranding(id: $id) {
                id
                menuBackgroundColor
                menuTextColor
                fontFamily
                fontSize
                contentColor
              }
            }
          `,
          fetchPolicy: "network-only",
          variables: {
            id,
          },
        })
        .then((resData) => {
          console.log(resData.data.CoachBranding);
          let data = resData.data.CoachBranding;
          delete data.id;
          delete data.__typename;
          this.brandingData = resData.data.CoachBranding;
        });
    },
    getContactInfo() {
      const id = parseFloat(this.currentCoach.id);
      this.$apollo
        .query({
          query: gql`
            query CoachBranding($id: Float!) {
              CoachBranding(id: $id) {
                id
                welcomeMessage
                contactInfoName
                contactInfoHeader
                contactInfoPhoto
                contactInfoIntroduction
                contactInfoEmail
                contactInfoTwitter
                contactInfoYoutube
                contactInfoFacebook
                contactInfoInstagram
                contactInfoLinkedIn
              }
            }
          `,
          fetchPolicy: "network-only",
          variables: {
            id,
          },
        })
        .then((resData) => {
          let data = resData.data.CoachBranding;
          delete data.id;
          delete data.__typename;
          this.contactInfoData = resData.data.CoachBranding;
        });
    },
    pickFile() {
      this.$refs.image.click();
    },
    uploadContactPhoto(e) {
      this.onFilePicked(e);
    },
    updateCoachLogo(e) {
      
      this.onFilePicked(e, () =>
        this.uploadCoachLogo({
          coachId: this.currentCoach.id,
          base64Logo: this.imageUrl,
        })
      );
    },
    chooseLogo() {
      document.querySelector(".coachLogoUpload").click();
    },
    onFilePicked(e, targetAction = this.save) {
      const files = e.srcElement.files[0];

      const fr = new FileReader();
      fr.readAsDataURL(files);
      fr.addEventListener("load", () => {
        this.brandingData.contactInfoPhoto = fr.result;
        this.imageUrl = fr.result;
        // this.save();
        targetAction();
      });
    },
  },
  mounted: function () {
    console.log("created");
    this.getBranding();
    this.getContactInfo();
  },
};
</script>

<style scoped>
.preview {
  padding: 0!important;
  height: 640px;
  overflow: hidden;
  margin-bottom: 20px;
}
.preview-title {
  font-size: 20px;
  padding: 10px 14px;
  box-shadow: 0 3px 3px #ccc;
  margin: 0;
}
.preview-content-div {
  margin: 14px;
  padding: 12px;
  border: 1px solid #bbb;
  height: 51%;
  overflow-y: scroll;
}
.preview-content {
  margin: 0;
}
.sites {
  padding: 8px 14px;
  margin-bottom: 120px;
}
.column {
  padding: 5px 12px;
  font-size: 14px;
}
.preview-footer {
  box-shadow: 0px -1px 1px #ccc;
  font-size: 12px;
  text-align: center;
}
</style>