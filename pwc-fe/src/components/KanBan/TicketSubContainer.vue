<template>
  <article class="tc-col">
    <header class="tc-head">
      <article :style="borderStyle" class="tc-border">
        <span>{{headerText}}</span>
      </article>
    </header>
    <main class="tc-cao"></main>
  </article>
</template>

<script>
export default {
  name: "TicketContainer",
  props: [
    'status',
    'items'
  ],
  data() {
    return {};
  },
  methods: {},
  computed: {
    borderStyle() {
      switch (this.status) {
        case "SUBMITTED": {
          return {
            borderBottom: '3px red solid'
          };
        }
        case "ASSIGNED": {
          return {
            borderBottom: '3px darkgreen solid'
          }
        }
        case "PENDING": {
          return {
            borderBottom: '3px teal solid'
          }
        }
        case "COMPLETED": {
          return {
            borderBottom: '3px orangered solid'
          }
        }
        default:
          return {};
      }
    },
    headerText() {
      switch (this.status) {
        case "SUBMITTED": {
          return `Submitted (${this.items.length})`;
        }
        case "ASSIGNED": {
          return `Assigned (${this.items.length})`
        }
        case "PENDING": {
          return `Pending for Close (${this.items.length})`
        }
        case "COMPLETED": {
          return `Completed (${this.items.length})`
        }
        default:
          return {};
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
