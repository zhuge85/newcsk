<template>
  <div>
    <h1>test</h1>
    <p>{{user}}</p>
    <input type="text" v-model="value">
    <button @click="changeName">改名</button>
    <p>{{user2}}</p>
    <input type="text" v-model="value2">
    <button @click="changeName2">改名</button>
    <button @click="alertName">获取user2</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      value: '',
      value2: ''
    }
  },
  created() {
  },
  methods: {
    ...mapActions('xiaozhu', [
      'setUser'
    ]),
    changeName() {
      this.$store.dispatch('setUser', this.value)
    },
    changeName2() {
      this.$store.dispatch('xiaozhu/setUser', this.value2)
    },
    ...mapActions('xiaozhu', ['alertName'])
  },
  computed: {
    // type 1
    // user () {
    //   return this.$store.state.xiaozhu.user
    // },
    // user2 () {
    //   return this.$store.state.user
    // },
    // type2
    // ...mapState({
    //   user: state => state.user,
    //   user2: state => state.xiaozhu.user
    // }),
    // type3
    // ...mapState('xiaozhu', {
    //   user: state => state.user
    // }),
    ...mapGetters([
      'user'
    ]),
    ...mapGetters("xiaozhu", ["user2"])
  }
}
</script>