<template>
  <div>
    <van-nav-bar
      title="分类详情"
      left-arrow
      @click-left="goHome"
    />
    <tuijian :shop="shop" v-if="this.shop.length>0"></tuijian>
    <van-empty image="error" description="没有" v-else />
  </div>
</template>

<script>
import tuijian from '@/components/tuijian'
export default {
  data() {
    return {
      pid:0,
      shop:[],
    };
  },
  components:{
    tuijian
  },
  created() {
    this.pid=this.$route.params.id
    // console.log(this.pid)
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取数据
    getData(){
      this.$axios({
        url:"https://api.it120.cc/small4/shop/goods/list "
      }).then(res=>{
        console.log(res.data)
        res.data.forEach(value=> {
          if(value.categoryId==this.pid){
            this.shop.push(value)
          }
        });
      })
    },
     goHome() {
      this.$router.push({
        path: "/classify"
      });
    }
  }
};
</script>

<style scoped>
</style>
