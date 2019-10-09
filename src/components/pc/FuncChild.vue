<template functional>
  <div>
    <p v-for="item in props.items" :key="item.id" @click="props.itemClick(item);">{{ item }} <button class="btn btn-blue">点我试试</button></p>
  </div>
</template>
