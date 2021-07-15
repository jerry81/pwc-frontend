<template>
  <v-app>
    <section class="root">
      <Header />
    </section>
  </v-app>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Header
  },

  data: () => ({
    //
  })
};
</script>
<style scoped>
.root {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #ccc;
}
</style>
