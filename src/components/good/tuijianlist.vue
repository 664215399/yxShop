<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="goHome" />
    <div class="shop">
      <ul>
        <router-link :to="'/shopcont/'+value.id" tag="li" v-for="(value,index) in shop" :key="index">
         <img :src="value.pic" alt />
          <p>{{value.name}}</p>
          <p>{{value.characteristic}}</p>
          <p>${{value.minPrice}}</p>
          </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shop: []
    };
  },
  created() {},
  mounted() {
      this.getTj()
  },
  methods: {
    //   获取数据
    getTj() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        console.log(res);
        // console.log(res.data.goodsMap);
        this.shop = res.data;
      });
    },
    goHome() {
      this.$router.push({
        path: "/home"
      });
    }
  }
};
</script>

<style scoped lang="scss">
//   商品
.shop {
  margin-bottom: 2rem;
  .shop-p {
    width: 100%;
    text-align: center;
    line-height: 1rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
      width: 40%;
      img {
        width: 100%;
        height: 3rem;
      }
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-of-type(2) {
        font-size: 0.3rem;
        color: #cccccc;
      }
      p:nth-of-type(3) {
        font-size: 0.3rem;
        color: red;
      }
    }
  }
}
</style>