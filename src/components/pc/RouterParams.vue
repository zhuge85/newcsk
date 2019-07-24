<template>
  <div class="router-child" v-highlight>
    <div class="item">
      <ul>
        <li><b>this.$route.params:</b></li>
        <li>{{this.$route.params}}</li>
        <li><b>this.$route.query:</b></li>
        <li>{{this.$route.query}}</li>
      </ul>
    </div>
    <div class="item">
      <button class="btn btn-success" @click="param" type="primary">随机param</button>
      <button class="btn btn-danger" @click="query" type="danger">随机query</button>
    </div>
    <div class="item">
      <pre><code>export default {
  data() {
    return {
      word: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      id: 1,
      keyword: {
        name: 'zhu',
        age: 30
      }
    }
  },
  methods: {
    param() {
      this.id = this.random(200)
    },
    query() {
      let len = this.word.length
      this.keyword.name = this.word[this.random(len)] + this.word[this.random(len)]
      this.keyword.age = this.random(50)
    },
    random(num) {
      return Math.floor(Math.random() * num)
    }
  },
  created() {
    this.$router.replace(`/router/params/${this.id}?name=${this.keyword.name}&age=${this.keyword.age}`)
  },
  watch: {
    'id': function (newVal, oldVal) {
      this.$router.replace(`/router/params/${this.id}?name=${this.keyword.name}&age=${this.keyword.age}`)
    },
    'keyword': {
      handler(curVal, oldVal) {
        this.$router.replace(`/router/params/${this.id}?name=${this.keyword.name}&age=${this.keyword.age}`)
      },
      deep: true
    }
  }
}</code></pre>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      word: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      id: 1,
      keyword: {
        name: 'zhu',
        age: 30
      }
    }
  },
  methods: {
    param() {
      this.id = this.random(200)
    },
    query() {
      let len = this.word.length
      this.keyword.name = this.word[this.random(len)] + this.word[this.random(len)]
      this.keyword.age = this.random(50)
    },
    random(num) {
      return Math.floor(Math.random() * num)
    }
  },
  created() {
    this.$router.replace(`/router/params/${this.id}?name=${this.keyword.name}&age=${this.keyword.age}`)
  },
  watch: {
    'id': function (newVal, oldVal) {
      this.$router.replace(`/router/params/${this.id}?name=${this.keyword.name}&age=${this.keyword.age}`)
    },
    'keyword': {
      handler(curVal, oldVal) {
        this.$router.replace(`/router/params/${this.id}?name=${this.keyword.name}&age=${this.keyword.age}`)
      },
      // immediate deep
      deep: true
    }
  }
}
</script>
