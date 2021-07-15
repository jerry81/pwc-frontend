<template>
  <article class="tile-root" :style="borderStyle">
    <article class="tile-top">
      <header class="tile-header">
        <article class="tile-header-left"></article>
        <div class="tile-number">{{ ticketNumber }}</div>
      </header>
      <main class="tile-main" v-if="showMain">stuff</main>
    </article>
    <article class="tile-bottom">
      <v-icon medium color="gray">
        mdi-chevron-down
      </v-icon>
    </article>
  </article>
</template>

<script>
export default {
  name: "Tile",
  props: ["ticket"],
  data() {
    return {
      showMain: false
    };
  },
  methods: {},
  computed: {
    status() {
      return this.ticket?.status || "PENDING";
    },
    ticketNumber() {
      return `WL-${this.ticket?.number || "unkown"}`;
    },
    borderStyle() {
      switch (this.status) {
        case "SUBMITTED": {
          return {
            borderBottom: "3px red solid"
          };
        }
        case "ASSIGNED": {
          return {
            borderBottom: "3px darkgreen solid"
          };
        }
        case "PENDING": {
          return {
            borderBottom: "3px aquamarine solid"
          };
        }
        case "COMPLETED": {
          return {
            borderBottom: "3px orange solid"
          };
        }
        default:
          return {};
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tile-root {
  width: calc(100% - 20px);
  margin: 10px;
  background: white;
}
.tile-top {
}
.tile-bottom {
}
</style>
