<template>
  <section class="ticket-container-root">
    <ticket-sub-container
      v-for="(v, i) in subcontainers"
      :key="i"
      :status="v.status"
      :items="v.items"
      @selected="handleSelected"
      @updated="refresh"
    />
    <v-progress-circular
      class="progress"
      v-if="showProgress"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </section>
</template>

<script>
import TicketSubContainer from "./TicketSubContainer";

export default {
  name: "TicketContainer",
  props: {},
  data() {
    return {
      tickets: [],
      showProgress: false
    };
  },
  computed: {
    subcontainers() {
      return [
        {
          status: "SUBMITTED",
          items: this.submitted || []
        },
        {
          status: "ASSIGNED",
          items: this.assigned || []
        },
        {
          status: "PENDING",
          items: this.pending || []
        },
        {
          status: "COMPLETED",
          items: this.completed || []
        }
      ];
    },
    submitted() {
      return this.tickets.filter(x => x.status === "SUBMITTED");
    },
    assigned() {
      return this.tickets.filter(x => x.status === "ASSIGNED");
    },
    pending() {
      return this.tickets.filter(x => x.status === "PENDING");
    },
    completed() {
      return this.tickets.filter(x => x.status === "COMPLETED");
    }
  },
  methods: {
    async refresh() {
      try {
        this.showProgress = true;
        const { data } = await this.$api.ticket.list();
        this.showProgress = false;
        console.log("data is ", data);
        this.tickets = data;
        this.$emit("refreshed", this.tickets.length);
      } catch (e) {
        console.error("error while posting ticket", e);
      }
    },
    handleSelected(v) {
      console.log("bubbed up again");
      this.$emit("selected", v);
    }
  },
  async mounted() {
    this.refresh();
  },
  components: { TicketSubContainer }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ticket-container-root {
  height: 100%;
  width: 100%;
  display: flex;
}
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
}

.progress {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
