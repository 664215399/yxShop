<template>
  <div>
    <van-nav-bar title="砍价列表" left-arrow @click-left="goHome" />
    <cut :cut="cut"></cut>
  </div>
</template>

<script>
import cut from "../cut";
export default {
  data() {
    return {
        cut:[]
    };
  },
  components: {
    cut
  },
  created() {},
  mounted() {
    // 获取砍价数据
    this.getCut();
  },
  methods: {
    goHome() {
      this.$router.push({
        path: "/home"
      });
    },
    getCut() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list"
      }).then(res => {
        console.log(res);
        this.cut=res.data.goodsMap
      });
    },
  }
};
</script>

<style scoped>
</style>
