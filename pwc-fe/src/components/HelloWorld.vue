<template>
  <div class="hello">
    <button @click="ping">ping</button>
    <button @click="neigh">neighborhoods</button>
    <div><p v-for="(v,i) in neighborhoods" :key="i">{{v}}</p></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
  },
  data () {
    return {
      neighborhoods: []
    }
  },
  methods: {
    async neigh() {
      try {
        const {data} = await this.$api.neigh()
        console.log('data is ', data)
        this.neighborhoods = data
      } catch(e) {
        console.error('error while fetching neighborhoods')
      }
    },
    async ping() {
      try {
        const res = await this.$api.ping.ping()
        console.log('res is ', res)
      } catch(e) {
        console.error('error while pinging', e)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
