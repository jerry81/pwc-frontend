<template>
  <div class="head-root">
      <div class="head-left">Wishlist Portal</div>
      <div class="head-right"></div>
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
        const {data} = await this.$api.ping.neigh()
        console.log('data is ', data)
        this.neighborhoods = data
      } catch(e) {
        console.error('error while fetching neighborhoods', e)
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
.head-root {
    background: white;
    width:100%;
    height: 70px;
    display: flex;
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
}
</style>
