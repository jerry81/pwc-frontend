<template>
  <v-app>
    <section class="root">
      <Header />
      <Kanban />
    </section>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Kanban from './components/KanBan/Main'
export default {
  name: "App",
  components: {
    Header,
    Kanban
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
