<template>
  <div class="index-btn">
    <div class="bg-wraper">
      <span class="circle circle1"></span>
      <span class="circle circle2"></span>
      <span class="circle circle3"></span>
      <span class="circle circle4"></span>
      <div class="icon"></div>
      <span class="triangle triangle1"></span>
      <span class="triangle triangle2"></span>
      <span class="triangle triangle3"></span>
      <span class="triangle triangle1"></span>
      <span class="triangle triangle2"></span>
      <span class="triangle triangle3"></span>
      <div class="bg-rings">
        <div class="ring__ringlet"></div>
        <div class="ring__ringlet"></div>
        <div class="ring__ringlet"></div>
      </div>
    </div>
    <button @click="pathTo" class="btn btn-pink">从左边进</button>
    <img class="logo" src="@img/dog.gif" alt="logo">
    <button @click="pathTo" class="btn btn-green">从右边进</button>
    <!-- <button @click="pathTo" class="btn btn-purple">进入我的世界</button>
      <button @click="pathTo" class="btn btn-orange">进入我的世界</button>
      <button @click="pathTo" class="btn btn-blue">进入我的世界</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    pathTo() {
      this.$router.push('/home')
    }
  }
}
</script>
