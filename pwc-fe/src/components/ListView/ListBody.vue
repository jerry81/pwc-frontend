<template>
  <section class="lb-root">
    <header class="lb-header" style="border-bottom: red 3px solid">
      Submitted
    </header>
    <article
      class="lb-iter"
      v-for="(v, i) in submitted"
      :key="i"
      @click="handleClick(v)"
    >
      <span style="width: 175px;">{{ v.assignee }}</span>
      <span style="width: 275px;">{{ v.description }}</span>
      <span style="width: 100px;">{{ v.type }}</span>
      <span style="width: 200px;">{{ v.dueDate }}</span>
      <span style="width: 200px;">{{ v.updatedAt }}</span>
    </article>
    <header class="lb-header" style="border-bottom: darkgreen 3px solid">
      Assigned
    </header>
    <article
      class="lb-iter"
      v-for="(v, i) in assigned"
      :key="i"
      @click="handleClick(v)"
    >
      <span style="width: 175px;">{{ v.assignee }}</span>
      <span style="width: 275px;">{{ v.description }}</span>
      <span style="width: 100px;">{{ v.type }}</span>
      <span style="width: 200px;">{{ v.dueDate }}</span>
      <span style="width: 200px;">{{ v.updatedAt }}</span>
    </article>
    <header class="lb-header" style="border-bottom: aquamarine 3px solid">
      Pending for close
    </header>
    <article
      class="lb-iter"
      v-for="(v, i) in pending"
      :key="i"
      @click="handleClick(v)"
    >
      <span style="width: 175px;">{{ v.assignee }}</span>
      <span style="width: 275px;">{{ v.description }}</span>
      <span style="width: 100px;">{{ v.type }}</span>
      <span style="width: 200px;">{{ v.dueDate }}</span>
      <span style="width: 200px;">{{ v.updatedAt }}</span>
    </article>
    <header class="lb-header" style="border-bottom: orange 3px solid">
      Completed
    </header>
    <article
      class="lb-iter"
      v-for="(v, i) in completed"
      :key="i"
      @click="handleClick(v)"
    >
      <span style="width: 175px;">{{ v.assignee }}</span>
      <span style="width: 275px;">{{ v.description }}</span>
      <span style="width: 100px;">{{ v.type }}</span>
      <span style="width: 200px;">{{ v.dueDate }}</span>
      <span style="width: 200px;">{{ v.updatedAt }}</span>
    </article>
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
export default {
  name: "listbody",
  props: ["filters", "sort"],
  components: {},
  data() {
    return {
      showDetails: false,
      curCount: 0,
      tickets: [],
      showProgress: false
    };
  },
  computed: {
    submitted() {
      return this.filteredTickets.filter(x => x.status === "SUBMITTED");
    },
    assigned() {
      return this.filteredTickets.filter(x => x.status === "ASSIGNED");
    },
    pending() {
      return this.filteredTickets.filter(x => x.status === "PENDING");
    },
    completed() {
      return this.filteredTickets.filter(x => x.status === "COMPLETED");
    },
    filteredTickets() {
      return this.tickets.filter(this.applyFilters).sort((a, b) => {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();

        if (this.sort == "desc") {
          return dateA > dateB ? -1 : 1;
        } else {
          return dateA < dateB ? -1 : 1;
        }
      });
    }
  },
  methods: {
    applyFilters(ticket) {
      const assigneePass =
        this.filters?.assignee === "*" || this.filters?.assignee?.length === 0;
      const assigneeFail = !ticket.assignee.includes(this.filters.assignee);
      const tagPass =
        this.filters?.tag === "*" || this.filters?.tag?.length === 0;
      const tagFail = ticket.type !== this.filters.tag;
      return (!assigneeFail || assigneePass) && (!tagFail || tagPass);
    },
    async refresh() {
      try {
        this.showProgress=true
        const { data } = await this.$api.ticket.list();
        this.showProgress=false
        this.tickets = data;
        this.$emit("refreshed", this.tickets.length);
      } catch (e) {
        console.error("error while posting ticket", e);
      }
    },
    handleClick(v) {
      this.$emit("selected", v);
    }
  },
  async mounted() {
    this.refresh();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lb-root {
  height: 100%;
  width: 100%;
}
.lb-header {
  width: 100%;
  padding: 10px;
  font-weight: bold;
}
.lb-iter span {
  padding-left: 15px;
}
.lb-iter {
  display: flex;
  height: 60px;
  align-items: center;
  border-bottom: #ddd 1px solid;
  font-size: 12px;
}

.progress {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
