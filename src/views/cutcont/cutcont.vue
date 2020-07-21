<template>
  <div class="shopcont">
    <!-- 轮播图区域 -->
    <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(value,index) in banners" :key="index" class="item">
        <img :src="value.pic" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品简介 -->
    <div class="jianjie">
      <p>{{jianjie.name}}</p>
      <p v-html="jianjie.characteristic"></p>
      <p>
        <span>低价${{jianjie.minPrice}}</span>
        <span>原价${{jianjie.originalPrice}}</span>
        <span>库存{{jianjie.stores}}</span>
      </p>
    </div>
    <!-- 选项卡 -->
    <van-tabs v-model="active" class="xxk">
      <van-tab title="商品介绍" class="xxk-jieshao">
        <p v-html="content"></p>
      </van-tab>
      <van-tab title="商品评价"></van-tab>
    </van-tabs>
    <p @click="goHome" class="return">＜</p>
    
  </div>
</template>

<script>
export default {
  props: ["banners", "content"],
  data() {
    return {
      active: 0,
      pid: 0,
      // 轮播图
      //   banners: [],
      propertyIds: "",
      nums: 1,
      basicInfo: {},
      //   简介
      jianjie: {}
    };
  },
  created() {
    this.pid = this.$route.params.id;
  },
  mounted() {
    this.getData();
    this.getP();
  },
  methods: {
    //   返回
    goHome() {
      this.$router.go(-1);
    },

    getData() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/detail",
        params: {
          id: this.pid
        }
      }).then(res => {
        this.jianjie = res.data.basicInfo;
        console.log(res.data);
      });
    },
    // 获取评价
    getP() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/reputation",
        params: {
          id: this.pid
        }
      }).then(res => {
        // cosnole.log(res.data);
      });
    }
  }
};
</script>

<style lang='scss'>
.shopcont {
  width: 100%;
  .swipe {
    width: 100%;
    height: 10rem;
    .item {
      width: 100%;
      img {
        width: 100%;
        height: 10rem;
      }
    }
  }
  .jianjie {
    width: 100%;
    background: gold;
    p {
      line-height: 0.88rem;
      width: 100%;
    }
    p:nth-of-type(2) {
      font-size: 0.3rem;
      color: #999999;
    }
    p:nth-of-type(3) {
      display: flex;
      justify-content: space-between;
      padding: 0 0.5em;
      box-sizing: border-box;

      span {
        font-size: 0.3rem;
      }
      span:nth-of-type(1) {
        font-size: 0.3rem;
        color: red;
      }
    }
  }

  .return {
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    background: #fff;
    text-align: center;
    line-height: 1rem;
  }
}
</style>
