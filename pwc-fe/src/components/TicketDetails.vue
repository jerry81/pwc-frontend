<template>
  <article class="details-root" :style="borderStyle"></article>
</template>

<script>
export default {
  name: "Details",
  props: ["ticket"],
  data() {
    return {
      showMain: false
    };
  },
  methods: {},
  computed: {
    theme() {
      switch (this.status) {
        case "SUBMITTED":
          return "red";
        case "ASSIGNED":
          return "darkgreen";
        case "PENDING":
          return "aquamarine";
        case "COMPLETED":
          return "orange";
        default:
          return "";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
