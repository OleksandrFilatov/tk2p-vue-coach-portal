<template>
  <v-container id="regular-tables-view" fluid tag="section">
    <v-row>
      <v-col md="8">
        <v-row class="table-title">
          <v-col>
            <h3 class="mt-3">Program Content</h3>
          </v-col>
          <v-col>
            <v-btn
              @click="goToAddContentPage('Program Content')"
              small
              color="secondary"
              >Add Item</v-btn
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-sheet
              icon="mdi-clipboard-text"
              icon-small
              title="Simple Table"
              color="accent"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="primary--text order-col">Order</th>
                    <th class="primary--text">Text</th>
                    <th class="primary--text">Graphic</th>
                    <th class="primary--text">Shares</th>
                    <th class=""></th>
                    <th class=""></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in sortedProgramItems" :key="index">
                    <template v-if="item.contentType == 'Program Content'">
                      <td>
                        <div class="change-item-order">
                          <v-text-field
                            v-if="displayedItems[item.id]"
                            class="order-input"
                            type="number"
                            v-model="item.order"
                          />
                          <span v-if="!displayedItems[item.id]">
                            {{ item.order }}
                          </span>

                          <v-btn
                            v-if="!displayedItems[item.id]"
                            icon
                            @click="toggleShowingInput(item)"
                          >
                            <font-awesome-icon icon="i-cursor" />
                          </v-btn>
                          <v-btn
                            v-if="displayedItems[item.id]"
                            icon
                            @click="reorderItem(item)"
                          >
                            <font-awesome-icon icon="save" />
                          </v-btn>
                        </div>
                      </td>
                      <td>
                        <span v-html="item.text"> </span>
                      </td>
                      <td>View Image</td>
                      <td>{{ item.shares || 0 }}</td>
                      <td class="text-right">
                        <v-btn
                          icon
                          x-small
                          color="primary"
                          @click="goToEditor(item.id)"
                        >
                          Edit
                        </v-btn>
                      </td>
                      <td>
                        <v-btn
                          @click="
                            removeItem({
                              programId: program.id,
                              programItemId: item.id,
                            })
                          "
                          color="primary"
                          icon
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row class="table-title">
          <v-col>
            <h3 class="mt-3">Adhoc Content</h3>
          </v-col>
          <v-col>
            <v-btn
              small
              @click="goToAddContentPage('Adhoc Content')"
              color="secondary"
              >Add Item</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-sheet
              icon="mdi-clipboard-text"
              icon-small
              title="Simple Table"
              color="accent"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="primary--text">Date</th>
                    <th class="primary--text">Text</th>
                    <th class="primary--text">Graphic</th>
                    <th class="primary--text"></th>
                    <th class="text-right primary--text"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(item, index) in programItems" :key="index">
                    <template v-if="item.contentType == 'Adhoc Content'">
                      <td></td>
                      <td>
                        <div v-html="item.text"></div>
                      </td>
                      <td>View Image</td>
                      <td>{{ item.shares || 0 }}</td>
                      <td class="text-right">
                        <v-btn outlined x-small @click="goToEditor(item.id)">
                          Edit
                        </v-btn>
                        <v-btn outlined x-small @click="sendNow(item.id)">
                          Send Now
                        </v-btn>
                        <ConfirmDlg ref="confirm" />
                        <v-btn
                          @click="
                            removeItem({
                              programId: program.id,
                              programItemId: item.id,
                            })
                          "
                          color="primary"
                          icon
                        >
                          <v-icon>mdi-delete</v-icon></v-btn
                        >
                      </td>
                    </template>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row class="table-title">
          <v-col>
            <h3 class="mt-3">Initial Content</h3>
          </v-col>
          <v-col>
            <v-btn
              small
              @click="goToAddContentPage('Initial Content')"
              color="secondary"
              >Add Item</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-sheet
              icon="mdi-clipboard-text"
              icon-small
              title="Simple Table"
              color="accent"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="primary--text"></th>
                    <th class="primary--text">Text</th>
                    <th class="primary--text">Graphic</th>
                    <th class="primary--text"></th>
                    <th class="text-right primary--text"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(item, index) in programItems" :key="index">
                    <template v-if="item.contentType == 'Initial Content'">
                      <td></td>
                      <td>{{ item.text }}</td>
                      <td>View Image</td>
                      <td></td>
                      <td class="text-right">
                        <v-btn outlined x-small @click="goToEditor(item.id)">
                          Edit
                        </v-btn>
                        <v-btn
                          @click="
                            removeItem({
                              programId: program.id,
                              programItemId: item.id,
                            })
                          "
                          color="primary"
                          icon
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="4">
        <v-sheet class="mx-auto" tile>
          <v-toolbar color="cyan" dark>
            <v-toolbar-title>Properties</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Name</v-list-item-title>
              <v-list-item-subtitle
                class="mt-1"
                style="text-transform: capitalize"
                >{{ program.name }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Content Frequency</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Content Day</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Send Time</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Start Messages At</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>
      </v-col>
    </v-row>
    <div class="py-3" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    sorted(programItems) {
      return programItems.sort((a, b) => {
        if (a.order >b.order) return 1
        if (a.order < b.order) return -1
        return 0
      })
    },
    async sendNow(id) {
      console.log(id,this.$refs.confirm)

        if (
          await this.$refs.confirm[0].open(
            "Confirm",
            "Are you sure?"
          )
        ) {
          //this.deleteRecord();
        }
      },
    reorderItem(item) {
      delete item.__typename
      this.update({
        ...item,
        order: parseInt(item.order)
      });
      this.toggleShowingInput(item);
      // this.sortedProgramItems = this.sorted(this.programItems)
    },
    toggleShowingInput(item) {
      if (this.displayedItems[item.id]) {
        this.displayedItems[item.id] = false;
      } else {
        this.displayedItems[item.id] = true;
      }
    },
    goToAddContentPage(contentType) {
      this.$router.push(
        `/app/programs/${this.program.id}/add/${
          this.programItems.length + 1
        }?contentType=${contentType}`
      );
    },
    goToEditor(itemId) {
      this.$router.push(
        `/app/programs/${this.program.id}/content/${itemId}/edit`
      );
    },

    ...mapActions({
      getContent: "getProgramContentItems",
      removeItem: "deleteProgramContentItem",
      update: "updateProgramContentItem",
    }),
  },
  components: {
    ConfirmDlg: () => import("../components/ConfirmDialog"),
  },
  name: "CuratedContent",
  data() {
    return {
      displayedItems: {},
      // sortedProgramItems: []
    };
  },
  computed: {
    ...mapGetters({
      program: "getCurrentProgram",
      programItems: "getProgramItems",
    }),
    sortedProgramItems() {
      return this.sorted(this.programItems) || []
    }
  },
  created: function () {
    this.getContent({ programId: this.program.id });
  },
  mounted() {
    if(!this.programItems) return 
    for (const item of this.programItems) {
      // keeps track of which item 'order component' is displayed 
      this.$set(this.displayedItems, item.id, false);
      // this.displayedItems[item.id] = false
    }
    // this.sortedProgramItems = this.sorted(this.programItems)
  },

};
</script>

<style scoped>
.change-item-order {
  width: 100%;
  display: flex;
}
.change-item-order span {
  display: inline-block;
  margin: auto;
}
.order-col {
  width: 70px;
}
.order-input {
  width: 30px;
  display: inline-block;
}
.table-title .col:nth-child(2) .v-btn {
  float: right;
  margin-right: 10px;
}
.row {
  margin-top: 0;
}

.table-title:nth-child(1) {
  margin-top: 0;
}

.table-title {
  margin-top: 3em;
}
</style>
