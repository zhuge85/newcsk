<template>
  <div>
    <p class="zhu">i'm pc</p>
    <button @click="test">btn</button>
    {{user}}
    <div v-html="html"></div>
  </div>
</template>
<script>
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
    load(url) {
      if (url && url.length > 0) {
        // 加载中
        this.loading = true
        let param = {
          accept: 'text/html, text/plain'
        }
        this.$axios.get(url).then((response) => {
          this.loading = false
          // 处理HTML显示
          this.html = response.data
          this.html = this.html.replace(/href="/g, 'href="http://120.78.208.59:8082/apipage/')
          this.html = this.html.replace(/src="/g, 'src="http://120.78.208.59:8082/apipage/')

        }).catch((err) => {
          this.loading = false
          this.html = '加载失败'
        })
      }
    },
    test() {
      // window.open(window.location.herf = 'http://120.78.208.59:8082/apipage/index.html?kaijiangjieguo=1', '', 'width=1082,height=650,left=200,top=300')
      // let userinfo = {
      //   name: 'xiaozhu',
      //   age: 30,
      //   sex: 'man'
      // }
      // // console.log()
      // console.log(this.$store.state.xiaozhu)
      // this.$store.state.xiaozhu.dispatch('setUser', userinfo);
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
}
</script>
