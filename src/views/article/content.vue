<template>
  <div class="content">
    <van-nav-bar
      title="专栏详情"
      left-arrow
      @click-left="goHome"
    />
    <div class="content_cont">
        <p v-html="object.title"></p>
        <img :src="object.pic" alt="">
        <p v-html="object.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pid: 0,
      object:{}
    };
  },
  created() {},
  mounted() {
    this.pid = this.$route.query.id;
    this.getData()
  },
  methods: {
    //   返回
    goHome(){
        this.$router.go(-1)
    },
    // 获取数据
    getData() {
        this.$axios({
            url:"https://api.it120.cc/small4/cms/news/detail",
            methods:'post',
            params:{
                id:this.pid
            }
        }).then(res=>{
            this.object=res.data
            console.log(res.data)
        })
    }
  }
};
</script>

<style scoped lang="scss">
.content{
    width:100%;
    .content_cont{
        width:100%;
        p:nth-of-type(1){
            width:100%;
            text-align: center;
            line-height: 1rem;
        }
        img{
            width:100%;
            height:5rem;
        }
         p:nth-of-type(2){
            width:100%;
            font-size: 0.3rem;
            line-height: 1rem;
            text-indent: 1rem;
        }
    }
}
</style>
