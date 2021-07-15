<template>
  <div class="head-root">
    <div class="head-left"><h4>Wishlist Portal</h4></div>
    <div class="head-right">
      <div class="head-home">
        <v-icon small color="orange darken-3" style="margin-right: 5px;">
          mdi-home </v-icon
        >Home
      </div>
      <div class="head-arrow">
        <v-icon medium color="white " style="margin-right: 5px;">
          mdi-arrow-up-bold
        </v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {},
  data() {
    return {
      neighborhoods: []
    };
  },
  methods: {
    async neigh() {
      try {
        const { data } = await this.$api.ping.neigh();
        console.log("data is ", data);
        this.neighborhoods = data;
      } catch (e) {
        console.error("error while fetching neighborhoods", e);
      }
    },
    async ping() {
      try {
        const res = await this.$api.ping.ping();
        console.log("res is ", res);
      } catch (e) {
        console.error("error while pinging", e);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head-root {
  background: white;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  padding-right: 25px;
}
.head-right {
  height: 100%;
  display: flex;
  justify-content:center;
  align-items:center;
}
.head-home {
  color: orangered;
  border-bottom: orangered 5px solid;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.head-arrow {
  background: orangered;
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  padding: 10px 5px 10px 10px;
}
</style>
