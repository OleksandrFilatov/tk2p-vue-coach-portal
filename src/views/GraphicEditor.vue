<template>
  <v-container id="content-editor-view" fluid tag="section">
    <v-row>
      <v-col cols="9" class="mx-auto">
        <v-row justify="center">
          <v-col cols="12" md="">
            <div style="width: 472px; margin: 0 auto">
              <v-btn rounded @click="updateContent()" class="mr-5"> Update content </v-btn>
              <v-btn rounded outlined @click="back()"> Back </v-btn>
              <v-sheet class="mx-auto pa-2 mt-8">
                <h3>Preview Content Item</h3>
                <div
                  class="content-preview"
                  :style="`
                    background-color: ${itemData && itemData.backgroundColor};
                    background-image: url(${
                      selectedGraphic || itemData.graphic
                    })`"
                >
                  <div
                    v-if="showCoachLogo"
                    class="logo-preview"
                    :style="getLogoPreviewStyle()"
                  ></div>
                  <div
                    v-html="itemData.text"
                    :style="getTextPreviewStyle()"
                    class="text-preview"
                  ></div>
                </div>
              </v-sheet>
              <v-sheet class="mt-8 pa-2">
                <v-row>
                  <v-col md="12">
                    <h4>Select Graphic</h4>
                  </v-col>
                  <v-col
                    v-for="(bg, n) in getBgs"
                    :key="n"
                    :class="`d-flex child-flex ${
                      selectedGraphic == bg.url && 'selected-bg'
                    }`"
                    cols="4"
                    @click="setGraphicUrl(bg.url)"
                  >
                    <v-img
                      :src="bg.url"
                      :lazy-src="bg.url"
                      aspect-ratio="1"
                      class="grey lighten-2"
                    >
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
              </v-sheet>
            </div>
          </v-col>

          <v-col cols="12" md="5">
            <h3 class="mt-3">Edit Graphic</h3>
            <v-sheet rounded="">
              <v-card class="mx-auto" tile>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Content Text</v-list-item-title>
                    <v-list-item-subtitle>
                      <quill-editor
                        class="editor-box"
                        :options="editorOption"
                        v-model="itemData.text"
                      ></quill-editor>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="my-6"></div>
                <v-list-item one-line>
                  <v-list-item-content>
                    <v-list-item-title>Font Family</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-select
                        :items="fonts"
                        item-text="displayName"
                        item-value="fontName"
                        v-model="itemData.fontFamily"
                      >
                        <template slot="selection" slot-scope="data">
                          <!-- HTML that describe how select should render selected items -->
                          {{ data.item.displayName }}
                        </template>
                        <template slot="item" slot-scope="data">
                          <!-- HTML that describe how select should render items when the select is open -->
                          <span
                            v-bind:style="'font-family:' + data.item.fontName"
                          >
                            {{ data.item.displayName }}
                          </span>
                        </template>
                      </v-select>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item one-line>
                  <v-list-item-content>
                    <v-list-item-title>Font Size</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-select
                        :items="fontSizes"
                        item-text="sizeName"
                        item-value="fontSize"
                        v-model="itemData.fontSize"
                      >
                      </v-select>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item one-line>
                  <v-list-item-content class="v-list-item-content">
                    <p>Text Vertical Alignment</p>
                    <v-select
                      v-model="itemData.textPositionY"
                      :items="gridValues.Y"
                      item-text="label"
                      item-value="value"
                      persistent-hint
                      single-line
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item one-line>
                  <v-list-item-content class="v-list-item-content">
                    <p>Text Horizontal Alignment</p>
                    <v-select
                      v-model="itemData.textPositionX"
                      :items="gridValues.X"
                      item-text="label"
                      item-value="value"
                      persistent-hint
                      single-line
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item one-line>
                  <v-list-item-content class="v-list-item-content">
                    <p>Logo Vertical Alignment</p>
                    <v-select
                      v-model="itemData.logoPositionY"
                      :items="gridValues.Y"
                      item-text="label"
                      item-value="value"
                      persistent-hint
                      single-line
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item one-line>
                  <v-list-item-content class="v-list-item-content">
                    <p>Logo Horizontal Alignment</p>
                    <v-select
                      :items="gridValues.X"
                      item-text="label"
                      item-value="value"
                      persistent-hint
                      single-line
                      v-model="itemData.logoPositionX"
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item one-line>
                  <v-list-item-content>
                    <v-checkbox
                      v-model="showCoachLogo"
                      :label="`Show Coach Logo ?`"
                    ></v-checkbox>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item one-line>
                  <v-list-item-content>
                    <div>
                      <p>Background Color</p>
                      <div
                        class="color-box"
                        @click="clickOnColorElement('backgroundColor')"
                        :style="`background-color: ${itemData.backgroundColor}`"
                      />
                    </div>
                    <div class="color-boxes">
                      <div
                        class="color-box small-box"
                        @click="setSelectedColor(color, 'backgroundColor')"
                        v-for="(color, index) in colors"
                        :key="index"
                        :style="`background-color: ${color}`"
                      ></div>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { colors } from "../utils/colors";
import { quillEditor } from "vue-quill-editor";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

export default {
  name: "ContentEditorView",
  components: { quillEditor },

  data: function () {
    return {
      showCoachLogo: false,
      colors,
      selectedGraphic: null,
      gridValues: {
        X: [
          {
            label: "Left",
            value: "l",
          },
          {
            label: "Center",
            value: "c",
          },
          {
            label: "Right",
            value: "r",
          },
        ],
        Y: [
          {
            label: "Top",
            value: "t",
          },
          {
            label: "Middle",
            value: "m",
          },
          {
            label: "Bottom",
            value: "b",
          },
        ],
      },
      itemData: {
        graphic: null,
        backgroundColor: "",
        text: "",
        textPositionY: "t",
        textPositionX: "l",
        logoPositionY: "t",
        logoPositionX: "r",
      },
      colorsBank:[
        "#0000ff", "#000000", "#a52a2a", "#008000", "#ffa500", "#ff0000", "#ee82ee", "#ffff00",
        "#ffa6c9", "#0D98BA", "#8a2be2", "#FF5349", "#C71585", "#ffffff", "#9ACD32", "#FFAE42",
        "#fbceb1", "#3c69e7", "#2a52be", "#808080", "#9ACD32", "#4b0082", "#ff2400", "#f75394",
        "#5F9EA0", "#954535", "#FFCCCC", "#FFE5B4", "#87ceeb", "#D2B48C", "#dbd7d2", "#BDB5D5" 
      ]
    };
  },
  computed: {
    ...mapGetters({
      getBgs: "allBgs",
      fonts: "fonts",
      fontSizes: "fontSizes",
      currentCoach: "loggedInCoach",
      // itemData: "getCurrentItem",
    }),
  },

  methods: {
    isSelectedClass(n) {
      console.log("iss", this.itemData, n);
      return true;
      //return this.itemData.graphic == n ? ' selectedBackground': '';
    },
    setSelectedColor(color, key) {
      this.itemData[key] = color;
    },
    clickOnColorElement(inputName) {
      this.$refs[inputName].$el.click();
    },
    ...mapActions({
      update: "updateProgramContentItem",
      loadStockBgs: "getStockBackgrounds",
      loadCoachBgs: "getCoachBackgrounds",
      load: "getOneProgramContentItem",
      createProgram: "addProgramContentItem",
    }),
    ...mapMutations({
      resetProgramItem: "resetCurrentProgramItem",
    }),
    updateContent() {
      if (this.itemData.textPositionY) {
        this.itemData.textPositionY = this.itemData.textPositionY.toString();
      }
      if (this.itemData.textPositionX) {
        this.itemData.textPositionX = this.itemData.textPositionX.toString();
      }
      if (this.itemData.logoPositionX) {
        this.itemData.logoPositionX = this.itemData.logoPositionX.toString();
      }
      if (this.itemData.logoPositionY) {
        this.itemData.logoPositionY = this.itemData.logoPositionY.toString();
      }
      delete this.itemData.__typename;
      if (this.$route.params.contentId) {
        this.update({
          ...this.itemData,
          graphic: this.selectedGraphic,
          programId: this.$route.params.programId,
          id: this.$route.params.contentId,
        })
        .then(() => this.back());
      }

      if (this.$route.params.nextItemIndex && this.$route.query.contentType) {
        this.createProgram({
          ...this.itemData,
          programId: this.$route.params.programId,
          graphic: this.selectedGraphic,
          order: parseInt(this.$route.params.nextItemIndex),
          contentType: this.$route.query.contentType,
        })
        .then(() => this.back());
      }
    },
    back() {
      this.$router.push(`/app/programs/${this.$route.params.programId}`)
    },
    setGraphicUrl(n) {
      this.selectedGraphic = n;
    },

    getTextPreviewStyle() {
      return `grid-area: ${this.itemData?.textPositionY}${this.itemData?.textPositionX}; font-size: ${this.itemData.fontSize}; font-family: ${this.itemData.fontFamily}`;
    },

    getLogoPreviewStyle() {
      return `background-image: url(${this.currentCoach?.coachLogo}); grid-area: ${this.itemData?.logoPositionY}${this.itemData?.logoPositionX};`;
    },
  },
  mounted() {
    if (this.$route.params.contentId) {
      this.load({
        programItemId: this.$route.params.contentId,
      }).then(() => {
        this.itemData = this.$store.getters.getCurrentItem;
      });
    }
  },
  created() {
    this.editorOption = {
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ color: this.colorsBank }, { background: this.colorsBank }],
          [{ align: [] }],
          ["blockquote"],
          ["clean"],
        ],
      },
    };

    this.loadStockBgs();
    this.loadCoachBgs({ coachId: this.currentCoach.id });
  },
  unmounted() {
    this.resetProgramItem();
  },
};
</script>

<style scoped>
.selected-bg {
  padding: 2px;
  border: solid 2px green;
}
.v-list-item-content :nth-child(2) {
  margin-left: 3px;
  margin-top: 1px;
}
.v-list-item-content p {
  color: rgb(77, 77, 77);
}
.small-box {
  width: 20px;
  height: 20px;
}
.editor-box {
  height: 200px;
}
.content-preview {
  position: relative;
  width: calc(304px * 1.5);
  height: calc(420px * 1.5);
  grid-template-areas:
    "tl tc tr"
    "ml mc mr"
    "bl bc br";
  grid-template-columns: 33% 33% 33%;
  display: grid;
}
.bg-preview {
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: 10;
}
.logo-preview {
  width: 75px;
  max-height: 100px;
  z-index: 100;
  background-size: contain;
  height: 100%;
  margin: auto;
}
.text-preview {
  z-index: 500;
  margin: auto;
}
.ql-container {
  height: 169px;
}
</style>
