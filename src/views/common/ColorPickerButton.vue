<template>
  <div ref="colorpicker" class="color-picker-outer">
    <span
      class="color-picker-inner"
      :style="{ 'background-color': colorValue }"
      @click="togglePicker"
    ></span>
    <chrome-picker
      :value="colors"
      @input="updateFromPicker"
      v-if="displayPicker"
    />
  </div>
</template>

<script>
import { Chrome } from "vue-color";

export default {
  props: {
    fieldName: String,
    initColor: String,
  },
  components: {
    "chrome-picker": Chrome,
  },
  data() {
    return {
      colors: {
        hex: "#000000",
      },
      colorValue: this.initColor,
      displayPicker: false,
    };
  },
  mounted() {
    // actually there's no such as 'this.color'
    // in this template
    // this.setColor(this.color || "#3121e0");
  },
  methods: {
    setColor(color) {
      //   this.updateColors(color);
      this.colorValue = color;
    },
    updateColors(color) {
      if (color.slice(0, 1) === "#") {
        this.colors = {
          hex: color,
        };
      } else if (color.slice(0, 4) === "rgba") {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(","),
          hex =
            "#" +
            (
              (1 << 24) +
              (parseInt(rgba[0], 10) << 16) +
              (parseInt(rgba[1], 10) << 8) +
              parseInt(rgba[2], 10)
            )
              .toString(16)
              .slice(1);
        this.colors = {
          hex: hex,
          a: rgba[3],
        };
      }
    },
    showPicker() {
      document.addEventListener("click", this.documentClick);
      this.displayPicker = true;
    },
    hidePicker() {
      document.removeEventListener("click", this.documentClick);
      this.displayPicker = false;
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker();
    },
    updateFromInput() {
      this.updateColors(this.colorValue);
    },
    updateFromPicker(color) {
      this.colors = color;
      if (color.rgba.a === 1) {
        this.colorValue = color.hex;
      } else {
        this.colorValue =
          "rgba(" +
          color.rgba.r +
          ", " +
          color.rgba.g +
          ", " +
          color.rgba.b +
          ", " +
          color.rgba.a +
          ")";
      }
    },
    documentClick(e) {
      var el = this.$refs.colorpicker,
        target = e.target;
      if (el !== target && !el.contains(target)) {
        this.hidePicker();
      }
      this.$emit("update-color", this.colorValue, this.fieldName);
    },
  },
  watch: {
    initColor: function (newVal) {
      this.colorValue = newVal;
    },
  },
};
</script>

<style scoped>
div.color-picker-outer {
  width: 55px;
  height: 50px;
  display: inline-block;
  background-color: #eee;
  position: relative;
}

.color-picker-inner {
  width: 30px;
  height: 30px;
  position: relative;
  top: 10px;
  left: 13px;
  display: inline-block;
}

.vc-chrome {
  position: absolute;
  top: 0px;
  left: 55px;
  z-index: 9;
}
</style>