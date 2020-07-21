<template>
  <div class="kanjia">
    <div class="kanjia_cont">
      <van-icon name="user-circle-o" size="2rem" color="white" />
      <p>我发现一件好货,来帮我砍到底价吧</p>
      <div class="cont">
        <img :src="goods.pic" alt />
        <div>
          <p v-html="goods.name"></p>
          <p>
            <span>低价${{goods.minPrice}}</span>
            <s>原价${{goods.originalPrice}}</s>
          </p>
        </div>
      </div>
      <p>
        当前价
        <span>{{goods.originalPrice-list.curPrice}}</span>元,已砍价
        <span>{{list.curPrice}}</span>元
      </p>
    </div>
    <div class="kk">
        <p>以当前价格购买</p>
        <p>邀请好友砍价</p>
    </div>
    <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒"  class="time"/>
    <p @click="goHome" class="return">＜</p>
  </div>
</template>

<script>
import storage from "@/utils/storage";
export default {
  data() {
    return {
      id: "",
      goods: {},
      userId: "",
      list:{},
      time:1000*60*60*24
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.userId = this.$route.query.userId;
    
    this.getData();
    this.getCut();
    console.log(this.id,this.userId )
  },
  mounted() {
  },
  methods: {
    //   返回
    goHome() {
      this.$router.go(-1);
    },

    // 获取数据
    getData() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/detail",
        params: {
          id: this.id
        }
      }).then(res => {
        this.goods = res.data.basicInfo;
        console.log(res.data);
      });
    },
    // 获取砍价信息
    getCut() {
      let f = new FormData();
      let data = storage.get("user", true);
      console.log(data.token)
      f.append("token", data.token);
      f.append("kjid",this.userId);
      this.$axios
        .post("https://api.it120.cc/small4/shop/goods/kanjia/join",f)
        .then(res => {
            console.log(1)
            this.list=res.data
          console.log(res);
        });
    }
  }
};
</script>

<style scoped lang='scss'>
.kanjia {
  width: 100%;
  background: linear-gradient(to right top, #e7d9bf, #b7a47c);
  height: 11rem;
  .time{
      width:100%;
      text-align: center;
  }
  .kk{
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding:0 2rem;
    box-sizing: border-box;
    p:nth-of-type(1){
            width: 4rem;
    height: 0.61rem;
    border-radius: 0.06rem;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.61rem;
    background: #b0a48c;
    }
     p:nth-of-type(2){
          width: 3rem;
    height: 0.6rem;
    border-radius: 0.06rem;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.61rem;
    border: 1px solid #b19e75;
    color: #b3a079;
    }
  }
  .kanjia_cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:0.5rem ;
    box-sizing: border-box;
    > p:nth-of-type(1) {
      font-size: 0.3rem;
    }
    > p:nth-of-type(2) {
      line-height: 2rem;
    }
  }
  .cont {
    width: 6rem;
    height: 2rem;
    border-radius: 0.1rem;
    background: #f6edde;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 0.18rem;
    -webkit-box-shadow: 0 0 10px 1px #a7a7a7;
    box-shadow: 0 0 10px 1px #a7a7a7;
    img {
      width: 1.1rem;
      height: 1.1rem;
      display: block;
      margin-left: 0.06rem;
    }
    div {
      height: 1.1rem;
      margin-left: 0.12rem;
      p:nth-of-type(1) {
        margin-top: 0.12rem;
        font-size: 0.2rem;
        color: #000;
      }
      p:nth-of-type(2) {
        span,
        s {
          font-size: 0.2rem;
          color: #000;
        }
        span {
          margin-right: 1rem;
        }
        margin-top: 0.37rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
    }
  }

  // 返回
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
