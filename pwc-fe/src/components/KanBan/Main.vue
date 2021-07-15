<template>
  <section class="kanban-root">
    <section class="kanban-work">
      <header class="kanban-header">
        <h4>All Requests</h4>
        <article class="kanban-header-right">
          <article class="kanban-header-lv">
            <v-icon medium color="grey " style="margin-right: 5px;">
              mdi-arrow-up-bold
            </v-icon>
            <span>List View</span>
          </article>
          <article class="kanban-header-nr">
            <v-icon medium color="grey " style="margin-right: 5px;">
              mdi-arrow-up-bold
            </v-icon>
            <span>New Request</span>
          </article>
        </article>
      </header>
    </section>
  </section>
</template>

<script>
export default {
  name: "KanBan",
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.kanban-root {
  height: calc(100% - 70px);
  background: #ccc;
  width: 100%;
}
.kanban-work {
  margin: 10px 25px;
  height: calc(100% - 20px);
  width: calc(100% - 50px);
  background: white;
}
</style>
