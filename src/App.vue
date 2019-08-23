<template>
  <div id="app">
    <Header></Header>
    <div class="body">
      <div class="container">
        <router-view />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@c/pc/Header'
import Footer from '@c/pc/Footer'
export default {
  components: { Header, Footer },
  created() {
    document.documentElement.classList.add('loaded')
    setTimeout(() => {
      let dom = document.getElementById('loading-wrapper')
      dom ? document.body.removeChild(dom) : '';
      // document.documentElement.removeAttribute('class', 'loaded')
      document.documentElement.classList.remove('class', 'loaded')
    }, 1200)
    if (this._isMobile() && this.$route.path.indexOf('/m/') == -1) {
      this.$router.push('/m/');
    } else if (this.$route.path.indexOf('/m/') !== -1 && !this._isMobile()) {
      this.$router.push('/');
    }
    if (sessionStorage.user) {
      const code = JSON.parse(sessionStorage.user);
      this.$store.dispatch('setIsAutnenticated', !this.isEmpty(code));
      this.$store.dispatch('setUser', code);
    }
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      );
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
