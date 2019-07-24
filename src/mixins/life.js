import { mapState, mapActions, mapGetters } from 'vuex'
// import { GameHeader } from '@/mixins'
export const TheAll = {
  // mixins: [GameHeader],
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    },
    color: {
      inserted: function(el) {
        el.style.color = 'red'
      }
    },
    drag(el, bindings) {
      el.onmousedown = function(e) {
        document.body.style.userSelect = 'none'
        let disx = e.pageX - el.parentNode.offsetLeft
        let disy = e.pageY - el.parentNode.offsetTop
        document.onmousemove = function(e) {
          let moveWidth = document.documentElement.clientWidth - el.offsetWidth,
            moveHeight =
              document.documentElement.clientHeight - el.offsetHeight,
            dragX,
            dragY
          if (e.pageX - disx < 0) {
            dragX = 0
          } else if (e.pageX - disx > moveWidth) {
            dragX = moveWidth
          } else {
            dragX = e.pageX - disx
          }
          if (e.pageY - disy < 0) {
            dragY = 0
          } else if (e.pageY - disy > moveHeight) {
            dragY = moveHeight
          } else {
            dragY = e.pageY - disy
          }
          el.parentNode.style.left = dragX + 'px'
          el.parentNode.style.top = dragY + 'px'
        }
        document.onmouseup = function() {
          document.onmousemove = document.onmouseup = null
          document.body.style.userSelect = null
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate') //暂时不生效，版本问题
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    // 清除定时器
    if (sessionStorage.getItem('getResoucesIntervalId')) {
      window.clearInterval(
        parseInt(sessionStorage.getItem('getResoucesIntervalId'))
      )
    }
    next()
  },
  beforecreated() {},
  created() {
    this.$nextTick(() => {
      console.log('我在加载后执行')
    })
  },
  beforemounted() {},
  mounted() {},
  beforeupdated() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  computed: {
    user() {
      return this.$store.state.xiaozhu.user
    },
    user2() {
      return this.$store.state.user
    },
    ...mapState({
      user3: state => state.user,
      user4: state => state.xiaozhu.user
    }),
    ...mapState('xiaozhu', {
      user5: state => state.user
    }),
    ...mapGetters(['user']),
    ...mapGetters('xiaozhu', ['user2'])
  },
  methods: {
    userStore() {
      this.$store.dispatch('setUser', this.value)
      this.$store.commit('SET_USER', this.value)
      this.$store.dispatch('xiaozhu/setUser', this.value2)
      this.$store.commit('xiaozhu/SET_USER', this.value2)
    }
  },
  provide: { value: 1 }, // 父组件引用
  inject: ['value'], // 子孙组件使用
  props: {
    msg: String,
    users: Array,
    name: {
      type: String,
      default: 'zhuge'
    }
  },
  filters: {},
  watch: {
    $route(newVal, oldVal) {
      console.log(this.$route.params)
    }
  }
}
