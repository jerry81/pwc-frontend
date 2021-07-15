<template>
  <section class="ticket-container-root">
    <article class="tc-col">
      <header class="tc-head">
        <article style="border-bottom: 3px orangered solid;" class="tc-border">
          <span>Submitted (1)</span>
        </article>
      </header>
      <main class="tc-cao">

      </main>
    </article>
    <article class="tc-col"></article>
  </section>
</template>

<script>
export default {
  name: "TicketContainer",
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ticket-container-root {
  height: 100%;
  width: 100%;
  display: flex;
}
.tc-col {
  height: 100%;
  width: 25%;
  padding: 10px;
}
.tc-head {
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
}
.tc-border {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.tc-cao {
  height: calc(100% - 60px);
  width: 100%;
  background: #ddd;
}
</style>
