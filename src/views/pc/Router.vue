<template>
  <div v-highlight>
    <h1>路由</h1>
    <h2>获取路由参数</h2>
    <div class="item">
      <RouterParams></RouterParams>
    </div>
    <h2>router.push(location)</h2>
    <p>这个方法会向 history 栈添加一个新的记录，当用户点击浏览器后退按钮时，则回到之前的 URL。</p>
    <h3>声明式：</h3>
    <div class="item">
      <pre><code>// 等同于调用 router.push(...)
&lt;router-link to="..."&gt;&lt;/router-link&gt;
// 二级路由
&lt;router-view /&gt;</code></pre>
    </div>
    <h3>编程式：router.push(...)//该方法的参数可以是一个字符串路径，或者一个描述地址的对象。</h3>
    <div class="item">
      <pre><code>// 字符串
router.push('/home')
// 对象
this.$router.push({ path: '/login?url=' + this.$route.path });
// 带查询参数，变成/backend/order?selected=2
this.$router.push({ path: '/backend/order', query: { selected: "2" }});
// 命名的路由
this.$router.push({ name: 'user', params: { userId: 123 }})</code></pre>
    </div>
    <h2>router.replace(location)</h2>
    <p>设置 replace 属性（默认值: false）的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。即使点击返回按钮也不会回到这个页面。</p>
    <p>加上replace: true后，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。</p>
    <h3>声明式：</h3>
    <div class="item">
      <pre><code>// 等同于调用 router.replace(...)
&lt;router-link to="..." replace&gt;&lt;/router-link&gt;</code></pre>
    </div>
    <h3>编程式：</h3>
    <div class="item">
      <pre><code>// 字符串
this.$router.replace('/home')
// push方法也可以传replace
this.$router.push({ path: '/home', replace: true })</code></pre>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    RouterParams: resolve => require(['@c/pc/RouterParams.vue'], resolve)
  }
}
</script>
