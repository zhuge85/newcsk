export const Index = {
  data() {
    return {
      value: '我是mixins中的msg'
    }
  },
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log(`i'm msg from Mixins`)
    },
    show() {
      this.$message('如果组件中有同名，以组件为准', 'success')
    },
    mixinsShow() {
      this.$message(this.value, 'success')
    }
  }
}
