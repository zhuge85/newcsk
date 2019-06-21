<template>
  <div>
    <p class="zhu">i'm pc</p>
    <button @click="test">get</button>
    <button @click="test2">get2</button>
    <button @click="test3">post</button>
    <button @click="mockuser">获取mock</button>
    <button @click="mocklogin">获取mock</button>
    {{user}}
    <div v-html="html"></div>
    <Child :list="list">
      <template v-for="item in list" #[item.id]>
        {{item.title}}
      </template>
    </Child>
    <p>-----------------------------</p>
    <Child :list="list">
      <template #header="{msg}">{{msg}}</template>
      <template v-slot:item="{ item }">{{item.title}}1111</template>
      <template #22222>22222</template>
      <template #33333>33333</template>
      <template #footer="msg">{{msg}}</template>
    </Child>
  </div>
</template>
<script>
import { apiUser, apiUser2, apiUser3, mockuser, mocklogin } from '@/api'
import Child from '@c/pc/Child'
export default {
  components: { Child },
  data() {
    return {
      url: '/api/apipage/index.html',
      loading: false,
      html: 'img--asdasd-img',
      list: [
        {
          id: 1,
          title: '11111'
        },
        {
          id: 2,
          title: '22222'
        },
        {
          id: 3,
          title: '33333'
        }
      ]
    }
  },
  mounted() {
    // this.load(this.url)
    this.table()
  },
  methods: {
    test() {
      // this.$axios.get('/api/?results=500').then((res) => {
      //   console.log(res)
      //   this.html = res.data
      // }).catch((err) => {
      //   this.html = '加载失败'
      // })
      apiUser({ results: 100 }).then(res => {
        console.log(res)
      }).catch(err => {

      })
    },
    test2() {
      apiUser2({ results: 300 }).then(res => {
        console.log(res)
      }).catch(err => {

      })
    },
    test3() {
      apiUser3({ results: 300 }).then(res => {
        console.log(res)
      }).catch(err => {
      })
    },
    mockuser() {
      mockuser().then(res => {
        console.log(res)
      }).catch(err => {
      })
    },
    mocklogin() {
      mocklogin({ username: 'admin', password: 123456 }).then(res => {
        console.log(res)
      }).catch(err => {
      })
    },
    table() {
      let str = '<table>';
      for (let i = 1; i < 10; i++) {
        str += '<tr>';
        for (let j = 1; j <= i; j++) {
          str += `<td>${j}*${i}=${j * i}</td>`;
        }
        str += '</tr>';
      }
      str += '</table>';
      this.html = str
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
}
</script>
