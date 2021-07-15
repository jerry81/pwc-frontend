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
          <article class="kanban-header-nr" @click="showCreate = true">
            <v-icon
              small
              color="grey "
              style="margin-right: 5px; padding: 1px; border-radius: 20px; border: 3px solid grey;"
            >
              mdi-plus
            </v-icon>
            <span class="kanban-tool">New Request</span>
          </article>
        </article>
      </header>
      <main class="kanban-main">
        <ticket-container ref="tcontainer" @refreshed="handleRefresh" />
      </main>
    </section>
    <v-dialog v-model="showCreate" max-width="600px">
      <ticket-details
        @close="showCreate = false"
        :creating="true"
        :ticketCount="curCount"
        @save="handleSave"
      />
    </v-dialog>
  </section>
</template>

<script>
import TicketContainer from "./TicketContainer";
import TicketDetails from "../TicketDetails";
export default {
  name: "KanBan",
  props: {},
  components: {
    TicketContainer,
    TicketDetails
  },
  data() {
    return {
      showCreate: false,
      curCount: 0
    };
  },
  methods: {
    handleRefresh(count) {
      console.log("count is ", count);
      this.curCount = count;
    },
    async handleSave(obj) {
      this.showCreate = false;
      try {
        const { data } = await this.$api.ticket.create(obj);
        this.$refs.tcontainer.refresh()
        console.log("data is ", data);
      } catch (e) {
        console.error("error while posting ticket", e);
      }
    }
  }
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
  display: flex;
  width: calc(100% - 40px);
  flex-direction: row;
  align-items: center;
  margin: 0 20px;
  justify-content: space-between;
}
.kanban-header-right {
  display: flex;
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
