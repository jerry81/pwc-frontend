<template>
  <div id="app">
    <button @click="createTix">create tix</button>
    <button @click="fetchTix">fetch tix</button>
    <div style="margin:15px">
      <p v-for="(v, i) in tickets" :key="i">{{ v }}</p>
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
      tickets: []
    };
  },
  methods: {
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
        const { data } = await this.$api.ticket.list();
        console.log("data is ", data);
        this.tickets = data
      } catch (e) {
        console.error("error while posting ticket", e);
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
