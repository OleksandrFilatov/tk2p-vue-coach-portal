<template>
  <v-layout row>
    <!-- Alert Text Color -->
    <v-text-field
      v-bind:field-name="fields.alertTextColor"
      v-model="templateModel.alertTextColor"
      placeholder="#4A4A4A"
      :label="label"
    />
    <ColorPickerButton
      v-bind:field-name="'alertTextColor'"
      v-bind:init-color="templateModel.alertTextColor"
      v-on:update-color="getUpdatedColor"
    ></ColorPickerButton>
  </v-layout>
</template>
<script>
import ColorPickerButton from "./ColorPickerButton";
export default {
  components: {
    ColorPickerButton,
  },
  props: ["label"],
  data() {
    return {
      fields: {
        alertBackgroundColor: "#00ff00",
        alertTextColor: "#ff0000",
      },
      templateModel: {
        alertBackgroundColor: "#00ff00",
        alertTextColor: "#ff0000",
      },
    };
  },
  methods: {
    getUpdatedColor(colorValue, fieldName) {
      debugger;
      this.fields[fieldName] = colorValue;
      this.templateModel[fieldName] = colorValue;
    },
  },
};
</script>
