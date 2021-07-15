<template>
  <section class="kanban-root">
    <section class="kanban-work">
      <header class="kanban-header">
        <h3>All Requests</h3>
        <article class="kanban-header-right">
          <article class="kanban-header-lv">
            <v-icon medium color="grey " style="margin-right: 5px;">
              mdi-menu
            </v-icon>
            <span class="kanban-tool">List View</span>
          </article>
          <article class="kanban-header-nr">
            <v-icon small color="grey " style="margin-right: 5px; padding: 1px; border-radius: 20px; border: 3px solid grey;">
              mdi-plus
            </v-icon>
            <span class="kanban-tool">New Request</span>
          </article>
        </article>
      </header>
      <main class="kanban-main">
        <ticket-container/>
      </main>
    </section>
  </section>
</template>

<script>
import TicketContainer from './TicketContainer'
export default {
  name: "KanBan",
  props: {},
  components: {
    TicketContainer
  },
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
.kanban-header {
    height: 70px;
    display:flex;
    width: calc(100% - 40px);
    flex-direction:row;
    align-items: center;
    margin: 0 20px;
    justify-content: space-between;
}
.kanban-header-right {
    display:flex;
}
.kanban-tool {
    font-size: 12px;
}
.kanban-header-lv {
    margin-right: 15px;
}
.kanban-main {
    height: calc(100% - 70px);
    width: 100%;
}
</style>
