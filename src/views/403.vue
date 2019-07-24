<template>
  <div class="nopagewrap">
    <div class="nopage">
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="maininner">
        <h1>4 0 3</h1>
        <p>请求被拒绝，你没有此权限！</p>
        <router-link to="/home">返回首页</router-link>
        <a @click="goBack">返回上页</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
