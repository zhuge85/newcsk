<template>
  <header class="header">
    <nav class="navbar">
      <div class="container">
        <div class="logo" title="返回首页">
          <div class="flubber" @click="pathTo"></div>
          <button class="toggle btn btn-green" @click="handlShow">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="navbar-nav">
          <ul v-show="show">
            <li v-for="item in navs" :key="item.id">
              <router-link :to="item.path">{{ item.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Progress></Progress>
  </header>
</template>

<script>
import Progress from '@c/pc/Progress'
import { listFun } from '@a/js/tools'
import { throttle, backtotop } from '@a/js/tools'
export default {
  components: { Progress },
  data() {
    let arr1 = ['首页', '生命周期', 'Observable', 'vuex', 'slot', 'router', 'nextTick', '混入', '请求数据', '组件传值', '自定义插件', '自定义指令'],
      arr2 = ['/home', '/life', '/observable', '/vuex', '/slot', '/router', '/nextTick', '/mixins', '/getdate', '/getvalue', '/plugin', '/directives']
    return {
      navs: listFun(arr1, arr2),
      scrollTop: 0,
      show: true
    }
  },
  created() {
    this.handlShow();
    this.$nextTick(() => {
      let isHas = document.querySelector('#backtotop');
      if (!isHas) {
        let dom = document.createElement('div'),
          child = document.createElement('div');
        dom.setAttribute('id', 'backtotop')
        child.setAttribute('class', 'btnbg')
        dom.appendChild(child);
        document.body.appendChild(dom);
        dom.addEventListener('click', backtotop, false);
        window.addEventListener('scroll', throttle(this.onScroll), false);
      }
    })
  },
  mounted() {
    window.addEventListener('resize', throttle(this.handleResize), false)
  },
  destroyed() {
    window.removeEventListener('resize', throttle(this.handleResize), false)
  },
  methods: {
    pathTo() {
      this.$router.push('/index');
    },
    onScroll() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.update();
    },
    update() {
      var backtotop = document.querySelector('#backtotop');
      if (this.scrollTop >= 500) {
        backtotop.classList.add('showme');
      } else {
        backtotop.classList.remove('showme');
      }
    },
    handlShow() {
      if (this._isMobile() || window.innerWidth < 1100) {
        this.show = !this.show
      }
    },
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    handleResize() {
      if (this._isMobile() || window.innerWidth < 1100) {
        this.show = false
        document.documentElement.classList.add('mb')
      } else {
        this.show = true
        document.documentElement.classList.remove('mb')
      }
    }
  },
  watch: {
    $route(newVal, oldVal) {
      this.handlShow();
    }
  }
}
</script>
