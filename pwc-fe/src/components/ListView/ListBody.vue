<template>
  <section class="lb-root">
    <header class="lb-header" style="border-bottom: red 3px solid">
      Submitted
    </header>
    <article class="lb-iter" v-for="(v, i) in tickets" :key="i">
      <span style="width: 175px;">{{ v.assignee }}</span>
      <span style="width: 275px;">{{ v.description }}</span>
      <span style="width: 100px;">{{ v.type }}</span>
      <span style="width: 200px;">{{ v.dueDate }}</span>
      <span style="width: 200px;">{{v.updatedAt}}</span>
    </article>
    <header class="lb-header" style="border-bottom: darkgreen 3px solid">
      Assigned
    </header>
    <header class="lb-header" style="border-bottom: aquamarine 3px solid">
      Pending for close
    </header>
    <header class="lb-header" style="border-bottom: orange 3px solid">
      Completed
    </header>
  </section>
</template>

<script>
export default {
  name: "listbody",
  props: {},
  components: {},
  data() {
    return {
      showDetails: false,
      curCount: 0,
      tickets: []
    };
  },
  computed: {
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
        const { data } = await this.$api.ticket.list();
        console.log("data is ", data);
        this.tickets = data;
        this.$emit("refreshed", this.tickets.length);
      } catch (e) {
        console.error("error while posting ticket", e);
      }
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
</style>
