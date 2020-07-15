<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/classify">分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/car" :badge="this.$store.state.nums">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/me">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>

</style>
