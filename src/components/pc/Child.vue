<template>
  <div class="slot-child">
    <header class="slot-head">
      <slot name="header" msg="我是插槽的头部" desc="解构方法">slot：头部</slot>
    </header>
    <div class="slot-body">
      <div class="slot-item" v-for="item in list" :key="item.id">
        <slot :name="item.id" :msg="'我是第' + item.id + '条消息'">slot：{{item.title}}</slot>
      </div>
    </div>
    <footer class="slot-foot">
      <slot name="footer" msg="我是插槽的底部" desc="获取属性">slot：底部</slot>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>
