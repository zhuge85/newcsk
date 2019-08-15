<template>
  <div class="chat-box">
    <div ref="chatTitle" v-drag class="chat-header">
      <span class="chat-tips">
        <i class="iconfont icon-shouye"></i>聊天室
      </span>
    </div>
    <div class="chat-fun">
      <i class="iconfont icon-zuixiaohua" v-if="isMax" @click="mini">-</i>
      <i class="iconfont icon-kuang" v-else @click="max">o</i>
      <i class="iconfont icon-guanbi" @click="close">x</i>
    </div>
    <div class="chat-content">
      <div class="chat-list" ref="scbox">
        <template v-for="item in list">
          <div class="chat-item" :key="item.id">
            <div class="chat-block" :class="item.inde ? 'myself' : 'other'">
              <div class="avatar"><img :src="item.image" alt=""></div>
              <div class="content">
                <div class="top"><span class="name">{{item.username}}</span><span class="time">{{item.time | matchTime}}</span></div>
                <div class="bot" v-html="item.content"></div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="chat-footer">
      <div class="chat-textarea">
        <textarea placeholder="输入聊天内容" v-model="value" @keyup.enter="value = value"></textarea>
      </div>
      <div class="chat-btn" @click="sendmsg">发送</div>
    </div>
  </div>
</template>
<script>
import { timestampToTime } from '@a/js/tools'
export default {
  name: 'chat',
  directives: {
    drag(el, bindings) {
      el.onmousedown = function (e) {
        document.body.style.userSelect = 'none'
        let disx = e.pageX - el.parentNode.offsetLeft;
        let disy = e.pageY - el.parentNode.offsetTop;
        document.onmousemove = function (e) {
          let moveWidth = document.documentElement.clientWidth - el.offsetWidth,
            moveHeight = document.documentElement.clientHeight - el.offsetHeight,
            dragX, dragY;
          if (e.pageX - disx < 0) {
            dragX = 0
          } else if ((e.pageX - disx) > moveWidth) {
            dragX = moveWidth
          } else {
            dragX = e.pageX - disx
          }
          if (e.pageY - disy < 0) {
            dragY = 0
          } else if ((e.pageY - disy) > moveHeight) {
            dragY = moveHeight
          } else {
            dragY = e.pageY - disy
          }
          el.parentNode.style.left = dragX + 'px';
          el.parentNode.style.top = dragY + 'px';
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
          document.body.style.userSelect = null
        }
      }
    }
  },
  data() {
    return {
      websock: null,
      isMax: true,
      value: '',
      list: [
        {
          id: 1,
          username: '阿富汗',
          image: 'http://www.zhujianbo.cn/collection/images/a2.jpg',
          time: '2019-05-13 16:01:11',
          content: 'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsf'
        },
        {
          id: 2,
          username: '陈世美',
          image: 'http://www.zhujianbo.cn/collection/images/a4.jpg',
          time: '2019-05-13 16:02:31',
          content: '秒速飞艇'
        },
        {
          id: 3,
          username: '爱米巢',
          image: 'http://www.zhujianbo.cn/collection/images/a1.jpg',
          time: '2019-05-13 16:04:53',
          content: 'sdfgfjgjgf',
          inde: 1
        },
        {
          id: 4,
          username: '非赢不可',
          image: 'http://www.zhujianbo.cn/collection/images/a7.jpg',
          time: '2019-05-13 16:05:14',
          content: '五名不是中了五名不是中了五名不是中了五名不是中了五名不是中了五名不是中了五名不是中了五名不是中了'
        },
        {
          id: 5,
          username: '猎人',
          image: 'http://www.zhujianbo.cn/collection/images/a9.jpg',
          time: '2019-05-13 16:05:42',
          content: '改了没四'
        },
        {
          id: 6,
          username: '爱米巢',
          image: 'http://www.zhujianbo.cn/collection/images/a1.jpg',
          time: '2019-05-13 16:06:07',
          content: '没中',
          inde: 1
        },
        {
          id: 7,
          username: '阿富汗',
          image: 'http://www.zhujianbo.cn/collection/images/a2.jpg',
          time: '2019-05-13 16:06:19',
          content: 'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsf'
        },
        {
          id: 8,
          username: '非赢不可',
          image: 'http://www.zhujianbo.cn/collection/images/a7.jpg',
          time: '2019-05-13 16:06:29',
          content: '五名不是中了五名不是中了五名不是中了五名不是中了五名不是中了五名不是中了五名不是中了五名不是中了'
        },
        {
          id: 9,
          username: '陈世美',
          image: 'http://www.zhujianbo.cn/collection/images/a4.jpg',
          time: '2019-05-13 16:07:12',
          content: '秒速飞艇'
        },
        {
          id: 10,
          username: '猎人',
          image: 'http://www.zhujianbo.cn/collection/images/a9.jpg',
          time: '2019-05-13 16:08:47',
          content: '改了没四'
        }
      ]
    }
  },
  created() {
    if (window.WebSocket) {
      // this.initWebSocket();
    }
    this.$nextTick(() => {
      this.$refs.scbox.scrollTop = this.$refs.scbox.scrollHeight
    })
  },
  beforeDestroy() {
    // this.websock.close() //离开路由之后断开websocket连接
  },
  destroyed() {
  },
  methods: {
    mini() {
      this.$refs.chatTitle.parentNode.style.left = document.documentElement.clientWidth - this.$refs.chatTitle.offsetWidth + 'px'
      this.$refs.chatTitle.parentNode.style.top = document.documentElement.clientHeight - this.$refs.chatTitle.offsetHeight + 'px'
      this.isMax = false
    },
    max() {
      this.$refs.chatTitle.parentNode.style.left = 'auto'
      this.$refs.chatTitle.parentNode.style.top = '0'
      this.isMax = true
    },
    close() {
      this.$emit('close')
    },
    sendmsg() {
      if (!this.value) {
        this.$message('请输入发送内容')
        return
      }
      let id = this.list.length + 1
      let time = new Date().getTime()
      this.value = this.value.replace(/\ /g, '&nbsp;').split(/[\r\n]/g).map(item => `<p>${item}</p>`).join('')
      let val = {
        id,
        username: '爱米巢',
        image: 'http://www.zhujianbo.cn/collection/images/a1.jpg',
        time,
        content: this.value,
        inde: 1
      }
      this.list.push(val)
      this.value = ''
      this.$nextTick(() => {
        this.$refs.scbox.scrollTop = this.$refs.scbox.scrollHeight
      })
    },
    initWebSocket() { //初始化weosocket
      const wsuri = "ws://101.132.144.89:80/wsapi";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() { // 连接建立之后执行send方法发送数据
      let actions = { "test": "12345" };
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() { // 连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) { // 数据接收
      const redata = JSON.parse(e.data);
    },
    websocketsend(Data) { // 数据发送
      this.websock.send(Data);
    },
    websocketclose(e) { // 关闭
      console.log('断开连接', e);
    },
  },
  filters: {
    matchTime(time) {
      if (time.length == 19) {
        return time
      }
      return timestampToTime(time)
    }
  }
}
</script>