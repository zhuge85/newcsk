<template>
  <div class="vuex" v-highlight>
    <h1>vuex取值与设置</h1>
    <div class="item">
      <h2>获取state的 user 值</h2>
      <p>user：{{user}}</p>
    </div>
    <div class="item">
      <h2>获取vuex的modules里xiaozhu 的 user 值</h2>
      <p>user2：{{user2}}</p>
    </div>
    <div class="item">
      <pre><code>// 引入vuex方法
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    // 方法一
    user () {
      return this.$store.state.xiaozhu.user;
    },
    user2 () {
      return this.$store.state.user;
    }

    // 方法二
    ...mapState({
      user: state => state.user,
      user2: state => state.xiaozhu.user
    })

    // 方法三 获取模块里的user
    ...mapState('xiaozhu', {
      user: state => state.user
    })

    // 获取getters
    ...mapGetters([
      'user'
    ]),
    ...mapGetters("xiaozhu", ["user2"])
  }
}
</code></pre>
    </div>
    <div class="item">
      <h2>修改state的 user 值：{{user}}</h2>
      <input class="zhu-input" type="text" v-model="value">
      <button class="btn btn-pink" @click="changeName">改名</button>
    </div>
    <div class="item">
      <h2>修改vuex的modules里xiaozhu 的 user 值：{{user2}}</h2>
      <input class="zhu-input" type="text" v-model="value2">
      <button class="btn btn-pink" @click="changeName2">改名</button>
      <button class="btn btn-green" @click="alertName">获取xiaozhu的user</button>
    </div>
    <div class="item">
      <pre><code>export default {
  methods: {
    changeName() {
      this.$store.dispatch('setUser', this.value);
      // 或
      this.$store.commit('SET_USER', this.value);
    },
    changeName2() {
      this.$store.dispatch('xiaozhu/setUser', this.value2);
      // 或
      this.$store.commit('xiaozhu/SET_USER', this.value2);
    },
    // 调用模块里的方法
    ...mapActions('xiaozhu', [
      'setUser'
    ]),
    ...mapActions('xiaozhu', ['alertName'])
  },
}</code></pre>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      value: '',
      value2: ''
    }
  },
  created() {
  },
  methods: {
    ...mapActions('xiaozhu', [
      'setUser'
    ]),
    changeName() {
      if (!this.value) {
        this.$message('不能为空值', 'warning')
      } else {
        this.$store.dispatch('setUser', this.value)
        this.value = ''
        this.$message('修改成功', 'success')
      }
    },
    changeName2() {
      if (!this.value2) {
        this.$message('不能为空值', 'warning')
      } else {
        this.$store.dispatch('xiaozhu/setUser', this.value2)
        this.value2 = ''
        this.$message('修改成功', 'success')
      }
    },
    ...mapActions('xiaozhu', ['alertName'])
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    ...mapGetters("xiaozhu", ["user2"])
  }
}
</script>