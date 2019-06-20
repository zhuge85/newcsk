<template>
  <div id="app">
    <router-link to="/index">index</router-link>
    <router-link to="/demo">test</router-link>
    <router-link to="/date">date</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    document.documentElement.classList.add('loaded')
    setTimeout(() => {
      document.body.removeChild(document.getElementById('loading-wrapper'));
      document.documentElement.removeAttribute('class')
      // document.documentElement.classList.remove('loaded')
    }, 1200)
    if (this._isMobile() && this.$route.path.indexOf('/m/') == -1) {
      this.$router.push('/m/');
    } else {
      if (this.$route.path.indexOf('/m/') !== -1) {
        this.$router.push('/');
      }
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
