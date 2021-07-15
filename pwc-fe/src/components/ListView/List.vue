<template>
  <section class="list-root">
    <header class="list-header">
      <h3>All Requests</h3>
      <article class="list-header-right">
        <article class="list-header-lv" @click="$emit('toggle')">
          <v-icon medium color="grey " style="margin-right: 5px;">
            mdi-monitor-dashboard
          </v-icon>
          <span class="list-tool">Board View</span>
        </article>
        <article class="list-header-nr" @click="showCreate = true">
          <v-icon
            small
            color="grey "
            style="margin-right: 5px; padding: 1px; border-radius: 20px; border: 3px solid grey;"
          >
            mdi-plus
          </v-icon>
          <span class="list-tool">New Request</span>
        </article>
      </article>
    </header>
    <main class="list-main">
      <header class="list-table-header">
        <article style="width: 175px;">
          Requestor
          <v-icon small color="grey ">
            mdi-filter
          </v-icon>
        </article>
        <article style="width: 275px;">
          Description
        </article>
        <article style="width: 100px;">
          Tag
          <v-icon small color="grey ">
            mdi-filter
          </v-icon>
        </article>
        <article style="width: 200px;">
          Due Date
          <v-icon small color="grey ">
            mdi-filter
          </v-icon>
        </article>
        <article style="width: 200px;">
          Last Modified
          <v-icon small color="grey ">
            mdi-filter
          </v-icon>
        </article>
      </header>
      <section class="table-body">
        <list-body ref="lcontainer" @refreshed="handleRefresh"/>
      </section>
    </main>
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
import ListBody from "./ListBody";
import TicketDetails from '../TicketDetails'

export default {
  name: "List",
  props: {},
  components: { ListBody, TicketDetails },
  data() {
    return {
      showDetails: false,
      curCount: 0,
      showCreate: false,
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
        this.$refs.lcontainer.refresh();
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
.list-root {
  height: calc(100% - 80px);
  background: white;
  width: calc(100% - 30px);
  margin: 15px;
}
.list-work {
  margin: 10px 25px;
  height: calc(100% - 20px);
  width: calc(100% - 50px);
  background: white;
}
.list-header {
  height: 70px;
  display: flex;
  width: calc(100% - 40px);
  flex-direction: row;
  align-items: center;
  margin: 0 20px;
  justify-content: space-between;
}
.list-header-right {
  display: flex;
}
.list-tool {
  font-size: 12px;
}
.list-header-lv {
  margin-right: 15px;
}
.list-main {
  height: calc(100% - 70px);
  width: 100%;
}
.list-table-header {
  width: calc(100% - 30px);
  margin: 0 15px;
  display: flex;
  background: black;
  color: white;
  align-items: center;
  height: 60px;
}
.list-table-header article {
  padding-left: 15px;
}
.table-body {
  height: calc(100% - 100px);
  margin: 0 15px;
  width: calc(100% - 30px);
}
</style>
