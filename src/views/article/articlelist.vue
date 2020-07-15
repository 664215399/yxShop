<template>
  <div class="article">
    <van-nav-bar title="严选专栏" left-arrow @click-left="goHome" />
    <div class="list">
      <div v-for="(value,index) in good" :key="index" @click="goContent(value.id)">
        <img :src="value.pic" alt />
        <p v-html="value.title"></p>
        <p v-html="value.descript"></p>
        <p>
          <van-button round type="default" style="background:none; color:#fff;">查看详情</van-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      good: []
    };
  },
  created() {},
  mounted() {
    this.getGood();
  },
  methods: {
    goHome() {
      this.$router.go(-1);
    },
    //   获取数据
    // 获取精选专题
    getGood() {
      this.$axios({
        url: " https://api.it120.cc/small4/cms/news/list"
      }).then(res => {
        console.log(res.data);
        this.good = res.data;
      });
    },
    // 跳转详情页
    goContent(id){
        console.log(id)
        this.$router.push({
            path:'/content',
            query:{
                id:id
            }
        })
    }
  }
};
</script>

<style scoped lang='scss'>
.article {
  width: 100%;
  .list {
    width: 100%;
    div {
      width: 100%;
      padding: 0.2rem;
      box-sizing: border-box;
      position: relative;
      img {
        width: 100%;
        height: 4.5rem;
      }
      p {
        position: absolute;
        width: 90%;
        left: 5%;
        color:#fff;
        text-align: center;
      }
      p:nth-of-type(1) {
          top:0.6rem;
          font-size: 0.4rem;
      }
       p:nth-of-type(2) {
          top:1.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.3rem;
      }
      p:nth-of-type(3) {
          top:2.6rem;

      }
    }
  }
}
</style>
