<template>
  <section class="ticket-container-root">
    <ticket-sub-container v-for="(v,i) in subcontainers" :key="i" :status="v.status" :items="v.items"/>
  </section>
</template>

<script>
import TicketSubContainer from './TicketSubContainer'
export default {
  name: "TicketContainer",
  props: {},
  data() {
    return {
      subcontainers: [
        {
          status: 'SUBMITTED',
          items: []
        },
        {
          status: 'ASSIGNED',
          items: []
        },
        {
          status: 'PENDING',
          items: []
        },
        {
          status: 'COMPLETED',
          items: []
        }
      ]
    };
  },
  methods: {},
  components: {TicketSubContainer}
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
