<template>
  <div>
    <p class="zhu">i'm pc</p>
    <button @click="test">get</button>
    <button @click="test2">get2</button>
    <button @click="test3">post</button>
    {{user}}
    <div v-html="html"></div>
  </div>
</template>
<script>
import { apiUser, apiUser2, apiUser3 } from '@/api'
export default {
  data() {
    return {
      url: '/api/apipage/index.html',
      loading: false,
      html: 'img--asdasd-img'
    }
  },
  mounted() {
    // this.load(this.url)
  },
  methods: {
    test() {
      // this.$axios.get('/api/?results=500').then((res) => {
      //   console.log(res)
      //   this.html = res.data
      // }).catch((err) => {
      //   this.html = '加载失败'
      // })
      apiUser({ results: 100 }).then(res => {
        console.log(res)
      }).catch(err => {

      })
    },
    test2() {
      apiUser2({ results: 300 }).then(res => {
        console.log(res)
      }).catch(err => {

      })
    },
    test3() {
      apiUser3({ results: 300 }).then(res => {
        console.log(res)
      }).catch(err => {

      })
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
}
</script>
