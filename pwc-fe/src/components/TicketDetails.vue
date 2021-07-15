<template>
  <article class="details-root">
    <header class="details-header" :style="`border-bottom: ${theme} 2px solid`">
      <h3 style="margin-left: 15px;">
        {{ title }}
      </h3>
      <div style="margin-right: 15px; font-weight: bold" @click="close">X</div>
    </header>
    <main class="details-main">
      <h4>Basic Information</h4>
      <article>
          <div class="details-label">
        Subject:
        </div>
        <Input class="details-input" />
      </article>
      <article>
          <div class='details-label'>
        Due Date:
        </div>
        <Input class="details-input" />
      </article>
    </main>
    <footer class="details-foot">
      <button class="details-save" :style="`background: ${theme}`">Save</button>
    </footer>
  </article>
</template>

<script>
export default {
  name: "Details",
  props: ["ticket", "creating"],
  data() {
    return {};
  },
  methods: {
      close() {
          this.$emit('close')
      }
  },
  computed: {
    title() {
      return this.creating ? "New Request" : "";
    },
    status() {
      return this.ticket?.status || "SUBMITTED";
    },
    theme() {
      switch (this.status) {
        case "SUBMITTED":
          return "red";
        case "ASSIGNED":
          return "darkgreen";
        case "PENDING":
          return "aquamarine";
        case "COMPLETED":
          return "orange";
        default:
          return "";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.details-root {
  background: white;
}
.details-foot {
  width: 100%;
  display: flex;
  justify-content: flex-end;
    padding: 15px;
}
.details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
}
.details-save {
  color: white;
  padding: 4px 10px;
}
.details-main {
    display: flex;
  padding: 15px;
  flex-direction: column;
}
.details-main article {
    margin: 5px;
    display: flex;
}
.details-label {
    width: 100px;
}
.details-input {
    border: 1px grey solid;
    width: calc(100% - 100px - 35px)
}
</style>
