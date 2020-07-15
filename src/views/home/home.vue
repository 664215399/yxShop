<template>
  <div class="home">
    <!-- 轮播图 -->
    <banner :swipe="swipe"></banner>
    <!-- 砍价 -->
    <div class="cut">
      <router-link to="/cutlist" tag="p" class="biaoti">全民砍价 ></router-link>
      <cut :cut="cut"></cut>
    </div>

    <!-- 精选 -->
     <good :good="good"></good>
     <!-- 商品 -->
    <div class="shop">
      <router-link to="/tuijianlist" class="shop-p" tag="p">人气推荐></router-link>
      <tuijian :shop="shop"></tuijian>
    </div>
    
  </div>
</template>

<script>
import banner from "@/components/banner";
import cut from "@/components/cut";
import good from "@/components/good";
import tuijian from "@/components/tuijian";
export default {
  data() {
    return {
      // 轮播图
      swipe: [],
      //   砍价
      cut: [],
      //   精选专题
      good: [],
      //   商品列表
      shop: []
    };
  },
  created() {},
  // 注册组件
  components: {
    banner,
    cut,
    good,
    tuijian
  },
  mounted() {
    //   获取轮播图
    this.getSwipe();
    // 获取砍价数据
    this.getCut();
    // 获取精选
    this.getGood();
    // 获取商品列表
    this.getTj();
  },
  methods: {
    //   获取轮播图数据
    getSwipe() {
      this.$axios({
        url: "https://api.it120.cc/small4/banner/list"
      }).then(res => {
        // console.log(res);
        this.swipe = res.data;
      });
    },
    // 获取砍价
    getCut() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list"
      }).then(res => {
        // console.log(res);
        for (var i in res.data.goodsMap) {
          if (this.cut.length < 3) {
            this.cut.push(res.data.goodsMap[i]);
          }
        }
      });
    },
    // 获取精选专题
    getGood() {
      this.$axios({
        url: " https://api.it120.cc/small4/cms/news/list"
      }).then(res => {
        // console.log(res.data);
        this.good = res.data;
      });
    },
    getTj() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        // console.log(res);
        // console.log(res.data.goodsMap);
        for (var i in res.data) {
          if (this.shop.length < 4) {
            if (i > 4) {
              this.shop.push(res.data[i]);
            }
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
 
  //   砍价
  .cut {
    .biaoti {
      width: 100%;
      text-align: center;
      font-size: 0.5rem;
      line-height: 1rem;
    }
  }
   .shop-p {
    width: 100%;
    text-align: center;
    line-height: 1rem;
  }
}
</style>
