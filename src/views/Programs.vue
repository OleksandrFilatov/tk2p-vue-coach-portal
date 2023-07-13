<template>
  <v-container>
    <v-row>
      <v-col>
        <add-program :currentCoachId="currentCoach.id" />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8" sm="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-left">Program Name</th>
                <th>Content Items</th>
                <th>Subscribers</th>
                <th>Access Code</th>
                <th>Copy</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in programs" :key="item.id">
                <td>
                  <v-checkbox></v-checkbox>
                </td>
                <td style="text-transform: capitalize">
                  <span class="link" @click="goToContentPage(item)">
                    {{ item.name }}
                  </span>
                </td>
                <td>{{ item.numContentItems }}</td>
                <td>
                  <router-link :to="`app/programs/${item.id}/subscribers`">
                    {{ item.numSubscribers || 0 }}
                  </router-link>
                </td>
                <td>
                  <v-chip label>
                    {{ item.code }}
                  </v-chip>
                </td>
                <td>
                  <v-btn color="primary" v-clipboard:copy="item.code" small icon
                    ><v-icon>mdi-content-copy</v-icon> Copy</v-btn
                  >
                </td>
                <td>
                  <v-btn @click="removeProgram({programId: item.id, coachId: currentCoach.id})" color="primary" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col md="4" sm="12">
        <v-card class="mx-auto" tile>
          <v-toolbar color="cyan" dark>
            <v-toolbar-title>Coach Summary</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Coach Name</v-list-item-title>
              <v-list-item-subtitle>
                {{ currentCoach.firstName }}
                {{ currentCoach.lastName }}
                <template>
                  <EditCoachNameDialog
                    :currentCoachId="currentCoach.id"
                    @close="showEditCoachName = false"
                  />
                </template>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Company Name</v-list-item-title>
              <v-list-item-subtitle>
                {{ currentCoach.companyName }}
                <template>
                  <EditCompanyNameDialog
                    :currentCoachId="currentCoach.id"
                    @close="showEditCompanyName = false"
                  />
                </template>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Primary Email</v-list-item-title>
              <v-list-item-subtitle>
                {{ currentCoach.email }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Primary Phone</v-list-item-title>
              <v-list-item-subtitle>
                {{ currentCoach.mobile }}
                <template>
                  <EditPrimaryPhoneDialog
                    :currentCoachId="currentCoach.id"
                    @close="showEditPrimaryPhone = false"
                  />
                </template>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Password </v-list-item-title>
              <v-list-item-subtitle>
                <span v-if="!showingPassword">*******</span>&nbsp;
                <span v-if="showingPassword">{{currentCoach.password}}</span>&nbsp;
                <span
                  @click="togglePasswordReveal()"
                  class="ml-4 text-capitalize text-underline toggle-password-reveal"
                  >show</span
                >
                <template>
                  <EditPasswordModal :currentCoachId="currentCoach.id" />
                </template>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item one-line>
            <v-list-item-content>
              <v-list-item-title
                >{{ currentCoach.numSubscribers || 0 }}/ {{currentCoach.planSubscribers}}
                Subscribers</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item one-line>
            <v-list-item-content>
              <v-list-item-title
                >{{ currentCoach.numPrograms || 0 }}/{{currentCoach.planMaxPrograms}}
                Programs</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item one-line>
            <v-list-item-content>
              <v-list-item-title
                >{{ currentCoach.numContentItems || 0 }}/{{currentCoach.planMaxContentItems}} Content
                Items</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import addProgram from "../components/AddProgramDialog.vue";
import EditCoachNameDialog from "../components/EditCoachNameDialog.vue";
import EditCompanyNameDialog from "../components/EditCompanyNameDialog.vue";
import EditPrimaryPhoneDialog from "../components/EditPrimaryPhoneDialog.vue";
import EditPasswordModal from "../components/EditPasswordModal.vue";
import store from "../store";
import { mapGetters, mapActions } from "vuex";

export default {
  store,
  computed: {
    ...mapGetters({
      currentCoach: "loggedInCoach",
      programs: "getPrograms",
    }),
  },
  methods: {
    togglePasswordReveal() {
      this.showingPassword = !this.showingPassword
    },
    ...mapActions({
      selectProgram: "viewSelectedProgram",
      getCoachPrograms: "getCoachPrograms",
      removeProgram: "deleteProgram"
    }),
    goToContentPage(item) {
      this.selectProgram({ program: item });
      this.$router.push("/app/programs/" + item.id);
    },
    async updateCoach(id, data) {
      const done = await this.$apollo.mutate({
        mutation: gql`
          mutation updateCoach($id: id!, $data: data!) {
            updateCoach(id: $id, data: $data) {
              id
            }
          }
        `,
        variables: {
          id: id,
          data: data,
        },
      });

      if (done) {
        this.dialog = false;
      }
    },
    copyText() {
      let textToCopy = this.$refs.text;
      textToCopy.select();
      document.execCommand("copy");
    },
  },
  components: {
    addProgram,
    EditCoachNameDialog,
    EditCompanyNameDialog,
    EditPrimaryPhoneDialog,
    EditPasswordModal,
  },
  data() {
    return {
      showingPassword: false,
      showEditCoachName: false,
      showEditCompanyName: false,
      showPrimaryPhone: false,
    };
  },
  mounted: function () {
    this.getCoachPrograms({coachId: this.currentCoach && this.currentCoach.id});
  },
};
</script>

<style>
.toggle-password-reveal {
  cursor: pointer;
}
.link {
  text-decoration: underline;
  cursor: pointer;
}
.v-application a {
  color: #9e2263;
}
.v-application .cyan {
  background-color: #9E2263 !important;
  border-color: #9E2263 !important;
}
.v-application .primary--text {
  color: #9E2263 !important;
  caret-color: #9E2263 !important;
}
</style>