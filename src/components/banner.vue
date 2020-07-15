<template>
  <div class="swipe">
    <!-- 轮播图区域 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(value,index) in swipe" :key="index">
        <img :src="value.picUrl" alt />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图区域结束 -->
    <!-- 四个小按钮 -->
    <ul class="btn">
      <li>
        <van-icon name="like-o" color="red" size="0.8rem" />
        <p>签到</p>
      </li>
      <li>
        <van-icon name="point-gift-o" color="red" size="0.8rem" />
        <p>礼券</p>
      </li>
      <li>
        <van-icon name="gem-o" color="red" size="0.8rem" />
        <p>砍价</p>
      </li>
      <router-link to="/articlelist" tag="li">
        <van-icon name="bullhorn-o" color="red" size="0.8rem" />
        <p>专栏</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["swipe"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.swipe {
  border-bottom: 0.5rem solid #dfdfdf;
  width: 100%;
  position: relative;
  img {
    width: 100%;
  }
  ul {
    width: 100%;
    background: #ffffff;
    height: 3rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding: 0.2rem;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    li {
      padding: 0.5rem;
      p {
        font-size: 0.5rem;
      }
    }
  }
}
</style>
