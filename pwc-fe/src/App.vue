<template>
  <div id="app">
    <button @click="createTix">create tix</button>
  </div>
</template>

<script>
export default {
  name: "App",
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
