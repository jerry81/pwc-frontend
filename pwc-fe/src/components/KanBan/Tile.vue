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
      <main class="tile-main" v-if="showMain">
        <article>
          <v-icon small color="gray">
            mdi-clipboard-text-outline
          </v-icon>
          <span class="tile-text">{{ desc }}</span>
        </article>
        <article>
          <v-icon small color="gray">
            mdi-map-marker-radius
          </v-icon>
          <span class="tile-text">{{ territory }}</span>
        </article>
        <article>
          <v-icon small color="gray">
            mdi-bookmark-outline
          </v-icon>
          <span class="tile-text">{{type}}</span>
        </article>
        <article>
          <v-icon small color="gray">
            mdi-clock-time-four-outline
          </v-icon>
          <span class="tile-text">{{due}}</span>
        </article>
        Updated at {{ua}}
      </main>
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
      ua() {
        return this.ticket?.updatedAt || "updated at time"
      },
    due() {
      return this.ticket?.dueDate || "due date";
    },
    type() {
      return this.ticket?.type || "type";
    },
    territory() {
      return this.ticket?.territory || "territory";
    },
    desc() {
      return this.ticket?.subject || "subject";
    },
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
      return `WL-${this.ticket?.number || "unknown"}`;
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
.tile-main {
  padding: 15px;
}
.tile-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tile-number {
  color: white;
  border-radius: 25px;
  color: white;
  font-size: 10px;
  padding: 1px 4px;
  font-weight: bold;
}
.tile-text {
    margin-left: 5px;
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
