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
          <v-icon small color="grey" @click="handleFilters('requestor')">
            mdi-filter
          </v-icon>
        </article>
        <article style="width: 275px;">
          Description
        </article>
        <article style="width: 100px;">
          Tag
          <v-icon small color="grey" @click="handleFilters('tag')">
            mdi-filter
          </v-icon>
        </article>
        <article style="width: 200px;">
          Due Date
          <!--           <v-icon small color="grey" @click="handleFilters('due')">
            mdi-filter
          </v-icon> -->
        </article>
        <article style="width: 200px;">
          Last Modified
            <v-icon small color="grey" @click="curSort='asc'" v-if="curSort==='desc'">
            mdi-chevron-down
          </v-icon>
          <v-icon small color="grey" @click="curSort='desc'" v-if="curSort==='asc'">
            mdi-chevron-up
          </v-icon>
        </article>
      </header>
      <section class="table-body">
        <list-body
          ref="lcontainer"
          @refreshed="handleRefresh"
          @selected="handleSelected"
          :filters="currentFilter"
          :sort="curSort"
        />
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
    <v-dialog v-model="showFilters" max-width="600px">
      <section class="list-filters">
        <h3>Active Filters</h3>
        <article>
          <div>Requestor</div>
          <input
            v-model="filters.assignee"
            :disabled="changingFilter != 'requestor'"
          />
        </article>
        <article>
          <div>Tag</div>
          <select v-model="filters.tag" :disabled="changingFilter != 'tag'">
            <option>Wishlist</option>
            <option>Bug</option>
          </select>
        </article>
        <!--  TODO       <article>
          <div>Due Date Start</div>
          <input
            v-model="filters.dueDateStart"
            :disabled="changingFilter != 'due'"
          />
        </article>
        <article>
          <div>Due Date End</div>
          <input
            v-model="filters.dueDateEnd"
            :disabled="changingFilter != 'due'"
          />
        </article>
        <article>
          <div>Last Modified Start</div>
          <input
            v-model="filters.lastModifiedStart"
            :disabled="changingFilter != 'lm'"
          />
        </article>
        <article>
          <div>Last Modified End</div>
          <input
            v-model="filters.lastModifiedEnd"
            :disabled="changingFilter != 'lm'"
          />
        </article> -->
        <footer>
          <button @click="applyFilters">Apply</button>
          <button @click="clearFilters">Clear</button>
          <button @click="cancelFilters">Cancel</button>
        </footer>
      </section>
    </v-dialog>
    <main v-if="showDetails" class="list-details">
      <ticket-details
        :creating="false"
        @close="showDetails = false"
        :ticket="selected"
      />
    </main>
  </section>
</template>
<script>
import ListBody from "./ListBody";
import TicketDetails from "../TicketDetails";

const DEFAULT_FILTERS = {
  assignee: "*",
  tag: "*",
  lastModifiedStart: "*",
  lastModifiedEnd: "*",
  dueDateStart: "*",
  dueDateEnd: "*"
};
export default {
  name: "List",
  props: {},
  components: { ListBody, TicketDetails },
  data() {
    return {
      showDetails: false,
      curCount: 0,
      showCreate: false,
      selected: {},
      filters: { ...DEFAULT_FILTERS },
      currentFilter: { ...DEFAULT_FILTERS },
      showFilters: false,
      changingFilter: "",
      curSort: 'desc'
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
    },
    handleSelected(v) {
      this.selected = v;
      this.showDetails = true;
    },
    handleFilters(filter) {
      this.changingFilter = filter;
      this.showFilters = true;
    },
    applyFilters() {
      this.currentFilter = { ...this.filters };
      this.showFilters = false;
    },
    cancelFilters() {
      this.showFilters = false;
    },
    clearFilters() {
      console.log("filters is now ", this.filters);
      this.filters = { ...DEFAULT_FILTERS };
      this.currentFilter = { ...this.filters };
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
.list-details {
  width: 50%;
  height: calc(100% - 130px);
  background: white;
  position: absolute;
  top: 85px;
  right: 15px;
  border: 1px #ddd solid;
}
.list-filters {
  padding: 15px;
  background: white;
  display: flex;
  flex-direction: column;
}
.list-filters article {
  display: flex;
  margin: 5px;
}
.list-filters article div {
  width: 150px;
}
.list-filters article input {
  appearance: auto;
  -webkit-appearance: auto;
  padding: 3px 7px;
  border: 1px solid #ddd;
}
.list-filters article input:disabled {
  appearance: auto;
  -webkit-appearance: auto;
  padding: 3px 7px;
  border: 1px solid #ddd;
  background: #aaa;
}
.list-filters article select {
  appearance: auto;
  -webkit-appearance: auto;
  padding: 3px 7px;
  border: 1px solid #ddd;
}
.list-filters article select:disabled {
  appearance: auto;
  -webkit-appearance: auto;
  padding: 3px 7px;
  border: 1px solid #ddd;
  background: #aaa;
}
.list-filters footer button {
  border: grey 1px solid;
  width: 100px;
  margin: 10px;
}
</style>
