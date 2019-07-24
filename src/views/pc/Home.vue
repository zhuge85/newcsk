<template>
  <div class="home">
    <h2>乘法表</h2>
    <div class="item" v-html="html"></div>
    <h2>v-model.number设置value类型为number</h2>
    <div class="item">
      <input v-model.number="value" class="zhu-input" type="text" placeholder="value的类型">
      <button class="btn" @click="valueType">显示value类型</button>
    </div>
    <h2>正则转化value2为不能以0开头的数字</h2>
    <div class="item">
      <input v-model="value2" @input="value2=value2.replace(/^(0+)|[^\d]+/gi,'')" pattern="[0-9]*" class="zhu-input" type="text" placeholder="输入数字">
    </div>
    <h2>单色按钮</h2>
    <div class="item">
      <button class="btn">默认提示</button>
      <button class="btn btn-info">蓝色提示</button>
      <button class="btn btn-primary">蓝色提示</button>
      <button class="btn btn-danger">错误提示</button>
      <button class="btn btn-warning">警告提示</button>
      <button class="btn btn-success">成功提示</button>
    </div>
    <h2>渐变按钮</h2>
    <div class="item">
      <button class="btn btn-pink">粉色</button>
      <button class="btn btn-green">绿色</button>
      <button class="btn btn-purple">紫色</button>
      <button class="btn btn-orange">橙色</button>
      <button class="btn btn-blue">橙色</button>
    </div>
    <div class="item">
      <div class="btn" @click="openRoom">聊天框</div>
      <div class="btn" @click="open">赛车</div>
    </div>
    <Chat ref="chat" v-if="isVisible" :isVisible="isVisible" @close="toggleisVisible"></Chat>
    <Car :show="show" @close="close"></Car>
  </div>
</template>
<script>
import Child from '@c/pc/Child'
import Chat from '@c/pc/Chat'
import Car from '@c/pc/Car'
export default {
  components: { Child, Chat, Car },
  data() {
    return {
      value: '',
      value2: '',
      html: '',
      timer: null,
      requesttime: 1000,
      isVisible: false,
      show: false
    }
  },
  mounted() {
    this.table()
    // this.time()
  },
  methods: {
    table() {
      let str = '<table class="multiplication-table">';
      for (let i = 1; i < 10; i++) {
        str += '<tr>';
        for (let j = 1; j <= i; j++) {
          str += `<td>${j} x ${i} = ${j * i}</td>`;
        }
        str += '</tr>';
      }
      str += '</table>';
      this.html = str
    },
    valueType() {
      this.$message('this.value的类型是：' + typeof this.value)
    },
    openRoom() {
      this.isVisible ? this.$refs.chat.max() : this.isVisible = true
    },
    open() {
      this.show = true
    },
    close() {
      this.show = false
    },
    toggleisVisible() {
      this.isVisible = !this.isVisible
    },
    time() {
      let time = 10
      this.timer = setInterval(() => {
        console.log(time)
        if (time == 0) {
          clearInterval(this.timer);
          this.timer = null
          this.$message('倒计时结束', 'success')
        } else {
          time--
        }
      }, this.requesttime)
      // 清除定时器
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timer);
        this.timer = null
      })
    }
  }
}
</script>
