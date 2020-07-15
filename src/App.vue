<template>
  <div id="app">
    <loading></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import loading from '@/components/common/loading'
export default {
  name: 'App',
  components:{
    loading,
  }
}
</script>

<style>
#app {
  height:100%;
  position: relative;
}
</style>
