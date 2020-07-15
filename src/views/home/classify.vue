<template>
  <div class="classify">
    <van-search placeholder="请输入搜索关键词" input-align="center" @focus='search'/>
    <div>
      <van-tree-select
        :items="allClassify"
        :main-active-index.sync="activeIndex" 
        @click-nav="leftNav"
      >
        <template #content>
          <div class="right_cont" >
            <router-link :to="'/goods/'+value.id" tag="div" v-for="(value,index) in rightList" :key="index">
             <img :src="value.icon" alt />
              <p>{{value.name}}</p>
            </router-link>
          </div>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 左侧分类名字
      allClassify: [{ text: "所有分类" }],
      activeIndex: 0,
      // 分类id集合
      idList: [0],
      // 所有数据
      allList: []
    };
  },
  created() {},
  computed: {
    rightList() {
      let arr = this.allList;
      if (this.activeIndex == 0) {
        return arr;
      }
      return arr.filter(value => {
        return value.pid == this.idList[this.activeIndex];
      });
    }
  },
  mounted() {
    //   获取分类数据
    this.getClassifyData();
  },
  methods: {
    //   获取分类数据
    getClassifyData() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/category/all"
      }).then(res => {
        // console.log(res.data);
        this.allList = res.data;
        res.data.forEach(value => {
          if (value.pid == 0) {
            this.allClassify.push({ text: value.name });
            this.idList.push(value.id);
          }
        });
      });
    },
    // 左侧导航点击事件
    leftNav(i) {
      console.log(i);
    },
  // 跳转搜索页面
  search(){
    this.$router.push({
      path:'/search'
    })
  }
  }
};
</script>

<style scoped lang="scss">
.right_cont {
  position: fixed;
  max-height: 80%;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  
  div{
    width:33%;
    img{
      width:80%;
      height:70%;
    }
    p{
      font-size:0.3rem;
      text-align: center;
    }
  }
}
</style>
