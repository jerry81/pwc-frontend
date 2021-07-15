<template>
  <article class="tc-col">
    <header class="tc-head">
      <article :style="borderStyle" class="tc-border">
        <span>{{ headerText }}</span>
      </article>
    </header>
    <drop class="tc-cao" @drop="handleDrop">
      <main>
        <Tile
          v-for="(v, i) in items"
          :key="i"
          :ticket="v"
          @selected="handleSelected"
        />
      </main>
    </drop>
    <v-progress-circular
      class="progress"
      v-if="showProgress"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </article>
</template>

<script>
import Tile from "./Tile";
export default {
  name: "TicketSubContainer",
  props: ["status", "items"],
  data() {
    return {
      showProgress: false
    };
  },
  components: { Tile },
  methods: {
    handleSelected(v) {
      this.$emit("selected", v);
    },
    async handleDrop(e) {
      try {
        this.showProgress = true;
        await this.$api.ticket.updateStatus(e._id, this.status);
        this.showProgress = false;
        this.$emit("updated");
      } catch (e) {
        console.error("error while updating status", e);
      }
    }
  },
  computed: {
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
    },
    headerText() {
      switch (this.status) {
        case "SUBMITTED": {
          return `Submitted (${this.items.length})`;
        }
        case "ASSIGNED": {
          return `Assigned (${this.items.length})`;
        }
        case "PENDING": {
          return `Pending for Close (${this.items.length})`;
        }
        case "COMPLETED": {
          return `Completed (${this.items.length})`;
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
.tc-col {
  height: 100%;
  width: 25%;
  padding: 10px;
}
.tc-head {
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
}
.tc-border {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.tc-cao {
  height: calc(100% - 60px);
  width: 100%;
  background: #ddd;
  display: flex;
  flex-direction: column;
}
.progress {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
