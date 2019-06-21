<template>
  <div>
    <header>
      <slot name="header" msg="myhead">头部</slot>
    </header>
    <main>
      <div v-for="item in list" :key="item.id">
        <slot :name="item.id">{{item.id}}</slot>
      </div>
    </main>
    <footer>
      <slot name="footer" msg="myfoot">底部</slot>
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
