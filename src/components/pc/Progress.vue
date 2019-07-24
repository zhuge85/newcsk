<template>
  <progress id="reading-progress" class="progress"></progress>
</template>
<script>
import { throttle } from '@a/js/tools'
export default {
  data() {
    return {
      windowHeight: '',
      scrollTop: '',
      scrollHeight: '',
    }
  },
  created() {
    this.$nextTick(() => {
      this.init();
      window.addEventListener('scroll', throttle(this.onScroll, 10), false);
      window.addEventListener('resize', throttle(this.onResize, 10), false);
    })
    // this.update();
  },
  methods: {
    onScroll() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.update()
    },
    onResize() {
      this.init()
      this.update()
    },
    init() {
      this.windowHeight = document.documentElement.clientHeight
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // console.log(this.windowHeight, this.scrollTop, this.scrollHeight)
    },
    update() {
      var progressBar = document.querySelector('#reading-progress');
      var header = document.querySelector('.header');
      var progressMax = this.scrollHeight - this.windowHeight;
      var lastScrollY = this.scrollTop
      progressBar.setAttribute('max', progressMax);
      progressBar.setAttribute('value', lastScrollY);
    }
  },
  watch: {
    $route(newval, oldval) {
      this.$nextTick(() => {
        this.init()
      })
    }
  }
}
</script>
