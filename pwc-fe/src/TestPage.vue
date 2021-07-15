<template>
  <div id="app">
    <button @click="createTix">create tix</button>
    startdate <input v-model="filters.startDate" type="datetime" /> enddate
    <input v-model="filters.endDate" type="datetime" /> sort by
    <select v-model="sort.sortBy">
      <option>REQUESTOR</option>
      <option>TAG</option>
      <option>DUEDATE</option>
      <option>LASTMOD</option>
    </select>
    <button @click="fetchTix">fetch tix</button>
    <div style="margin:15px">
      <p v-for="(v, i) in tickets" :key="i">{{ v }}
        newStatus 
        <select v-model="newStatus">
          <option>DRAFT</option>
          <option>SUBMITTED</option>
          <option>ASSIGNED</option>
          <option>PENDING</option>
          <option>COMPLETED</option>
        </select>
        <button @click="updateStatus(v)">update Status</button>
      </p>
    </div>

    <HelloWorld />
  </div>
</template>

<script>

import HelloWorld from "./components/HelloWorld";
export default {
  name: "App",
  components: { HelloWorld },
  data() {
    return {
      tickets: [],
      filters: {
        startDate: "",
        endDate: "",
      },
      sort: {
        sortBy: ""
      },
      newStatus: 'DRAFT'
    };
  },
  methods: {
    async doSort() {
      console.log("implement sort");
    },
    async createTix() {
      try {
        const ticketTest = {
          status: "D",
          assignee: "Jerry",
          subject: "Mushrooms",
          dueDate: new Date().toISOString(),
          type: "Wishlist",
          territory: "PwC Mekong",
          dm_version: "1.1.1",
          description: "description"
        };
        const { data } = await this.$api.ticket.create(ticketTest);
        console.log("data is ", data);
      } catch (e) {
        console.error("error while posting ticket", e);
      }
    },
    async fetchTix() {
      try {
        console.log("filters is ", this.filters);
        const filters = this.filters
        const sort = this.sort
        const { data } = await this.$api.ticket.list({ filters, sort });
        console.log("data is ", data);
        this.tickets = data;
      } catch (e) {
        console.error("error while posting ticket", e);
      }
    },
    async updateStatus(tix) {
      console.log('tix is ', tix)
      try {
        await this.$api.ticket.updateStatus(tix._id, this.newStatus)
      } catch(e) {
        console.error('error while updating status', e)
      }
      
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
