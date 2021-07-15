<template>
  <article class="details-root">
    <header class="details-header" :style="`border-bottom: ${theme} 2px solid`">
      <h3 style="margin-left: 15px;">
        {{ title }}
      </h3>
      <div style="margin-right: 15px; font-weight: bold" @click="close">X</div>
    </header>
    <main class="details-main" v-if="creating">
      <h4>Basic Information</h4>
      <article>
        <div class="details-label">
          Subject:
        </div>
        <input v-model="subject" class="details-input" />
      </article>
      <article>
        <div class="details-label">
          Due Date:
        </div>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dueDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dueDate"
              label="Select due date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dueDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="handleDate">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </article>
      <article>
        <div class="details-label">
          Type:
        </div>
        <select v-model="type" class="details-select">
          <option>Wishlist</option>
          <option>Bug</option>
        </select>
      </article>
      <article>
        <div class="details-label">
          Territory:
        </div>
        <select v-model="territory" class="details-select">
          <option>PwC Mekong</option>
          <option>PwC Shanghai</option>
          <option>PwC Hong Kong</option>
        </select>
      </article>
      <article>
        <div class="details-label">
          DM Version:
        </div>
        <input v-model="dm_version" class="details-input" />
      </article>
      <article>
        <div class="details-label">
          Assignee:
        </div>
        <input v-model="assignee" class="details-input" />
      </article>
      <article>
        <div class="details-label">
          Description:
        </div>
        <input v-model="description" class="details-input" />
      </article>
    </main>
    <main class="details-main" v-if="!creating">
      <h4>Basic Information</h4>
      <article style="margin-bottom: 20px;">
        <div class="details-label">
          Subject:
        </div>
        <span>{{ticket.subject}}</span>
      </article>
      <article>
        <div class="details-label">
          Due Date:
        </div>
        <span>{{ticket.dueDate}}</span>
      </article>
      <article>
        <div class="details-label">
          Type:
        </div>
        <span>{{ticket.type}}</span>
      </article>
      <article>
        <div class="details-label">
          Territory:
        </div>
        <span>{{ticket.territory}}</span>
      </article>
      <article>
        <div class="details-label">
          DM Version:
        </div>
        <span >{{ticket.dm_version}}</span>
      </article>
      <article>
        <div class="details-label">
          Assignee:
        </div>
        <span>{{ticket.assignee}}</span>
      </article>
      <article>
        <div class="details-label">
          Description:
        </div>
        <span>{{ticket.description}}</span>
      </article>
    </main>
    <footer class="details-foot" v-if="creating">
      <button
        class="details-save"
        :style="`background: ${theme}`"
        @click="handleSave"
      >
        Save
      </button>
    </footer>
  </article>
</template>

<script>
export default {
  name: "Details",
  props: ["ticket", "creating", "ticketCount"],
  data() {
    return {
      description: "",
      dueDate: "",
      assignee: "",
      type: "",
      territory: "",
      dm_version: "",
      subject: "",
      menu: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleDate() {
      this.menu = false;
      this.$refs.menu.save(this.dueDate);
      console.log("date is ", this.dueDate);
    },
    handleSave() {
      const newObj = {
        description: this.description,
        dueDate: this.dueDate,
        assignee: this.assignee,
        type: this.type,
        territory: this.territory,
        dm_version: this.dm_version,
        subject: this.subject,
        updatedAt: new Date().toISOString(),
        number: this.ticketCount + 1,
        status: "SUBMITTED"
      };
      this.$emit("save", newObj);
    }
  },
  computed: {
    title() {
      return this.creating ? "New Request" : "Ticket Information";
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
  border: 1px #ddd solid;
  width: calc(100% - 100px - 35px);
  padding: 5px;
  appearance: auto !important;
  -webkit-appearance: auto !important;
}
.details-select {
  border: 1px #ddd solid;
  padding: 5px;
  appearance: auto !important;
  -webkit-appearance: auto !important;
}
</style>
