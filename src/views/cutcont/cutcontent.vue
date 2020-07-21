<template>
  <div class="shopcont">
    <cutcont :banners="banners" :content="content"></cutcont>
    <div class="button">
      <van-button type="danger" block class="dan" @click="jump">立即发起砍价,最低可砍价{{jianjie.minPrice}}元</van-button>
    </div>
  </div>
</template>

<script>
import cutcont from "./cutcont";
export default {
  data() {
    return {
      active: 0,
      pid: 0,
      // 轮播图
      banners: [],
      propertyIds: "",
      nums: 1,
      basicInfo: {},
      //   简介
      jianjie: {},
      //   商品介绍
      content: ""
    };
  },
  components: {
    cutcont
  },
  created() {
       this.pid = this.$route.params.id;
       this.userId=this.$route.params.kjId;
  },
  mounted() {
    this.getData();
    // console.log(this.pid)
  },
  methods: {
    getData() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/detail",
        params: {
          id: this.pid
        }
      }).then(res => {
        this.banners = res.data.pics;
        this.jianjie = res.data.basicInfo;
        this.content = res.data.content;
        this.basicInfo = res.data.basicInfo;
        // console.log(res.data);
      });
    },
    jump(){
        this.$router.push({
            path:"/kanjia",
            query:{
                id:this.pid,
                userId:this.userId
            }
        })
    }
  }
};
</script>

<style lang="scss">
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
  .xxk {
    width: 100% !important;
    .xxk-jieshao {
      width: 100% !important;
      p {
        width: 100% !important;
        img {
          width: 100% !important;
        }
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
  .button{
      position: fixed;
      width:100%;
      bottom: 0rem;
  }
}
</style>
