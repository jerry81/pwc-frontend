<template>
  <article class="tile-root" :style="borderStyle">
    <article class="tile-top">
      <header class="tile-header">
        <article>
          <span class="tile-round" :style="roundStyle">
            {{ firstL }}
          </span>
          {{ assignee }}
        </article>
        <div class="tile-number" :style="roundStyle">{{ ticketNumber }}</div>
      </header>
      <main class="tile-main" v-if="showMain">stuff</main>
    </article>
    <article class="tile-bottom" @click="showMain = !showMain">
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
    assignee() {
      return this.ticket?.asignee || "Jerry";
    },
    status() {
      return this.ticket?.status || "PENDING";
    },
    firstL() {
      return this.ticket?.assignee[0]?.toUpperCase() || "U";
    },
    ticketNumber() {
      return `WL-${this.ticket?.number || "unkown"}`;
    },
    roundStyle() {
      /* TODO: DRY */
      switch (this.status) {
        case "SUBMITTED": {
          return {
            border: "3px red solid",
            background: "red"
          };
        }
        case "ASSIGNED": {
          return {
            border: "3px darkgreen solid",
            background: "darkgreen"
          };
        }
        case "PENDING": {
          return {
            border: "3px aquamarine solid",
            background: "aquamarine"
          };
        }
        case "COMPLETED": {
          return {
            border: "3px orange solid",
            background: "orange"
          };
        }
        default:
          return {};
      }
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
  width: calc(100% - 10px);
  margin: 5px;
  background: white;
}
.tile-top {
}
.tile-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
}
.tile-number {
    color:white;
    border-radius: 25px;
    color: white;
    font-size: 10px;
    padding: 1px 4px;
    font-weight: bold;
}
.tile-header {
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: #ccc 1px solid;
}
.tile-round {
  border-radius: 25px;
  padding: 1px 4px;
  font-size: 12px;
  width: 15px;
  color: white;
  margin-right: 5px;
}
</style>
