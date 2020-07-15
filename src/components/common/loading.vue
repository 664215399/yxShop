<template>
  <div>
    <van-overlay :show="$store.state.show">
      <div class="wrapper">
        <van-loading size="24px" color='#fff'>加载中...</van-loading>
      </div>
    </van-overlay>
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

<style scoped lang='scss'>

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  
}
</style>
