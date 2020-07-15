<template>
  <div>
    <van-search placeholder="请输入搜索关键词" v-model="keywords" @keydown.enter="setHistory" @focus="hidden">
        <template #left>
                <van-icon name="arrow-left" size="20"  @click="gohome()"/>
        </template>
    </van-search>
    <div class="history" v-show="show">
      <div class="history_top" >
        <p>历史记录</p>
        <van-icon name="delete" @click="removeHistory"/>
      </div>
      <div class="history_bottom">
        <p v-for="(value,index) in historyList" :key="index">{{value}}</p>
      </div>
    </div>
    <tuijian :shop="getList"></tuijian>
  </div>
</template>

<script>
import tuijian from "@/components/tuijian";
// 导入本地存贮
import storage from '@/utils/storage'
export default {
  data() {
    return {
      keywords: "",
      shop: [],
      show:true,
      historyList:[]
    };
  },
  components: {
    tuijian
  },
  created() {},
  //   计算属性
  computed: {
    getList() {
      if (this.keywords == "") {
        return [];
      }
      return this.shop.filter(value => {
        return value.name.indexOf(this.keywords) > -1;
      });
    }
  },
  mounted() {
    //   获取数据
    this.getData();
    this.getHistory()
  },
  methods: {
    //   获取数据
    getData() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        console.log(res.data);
        this.shop = res.data;
      });
    },
    // 获取历史记录
    getHistory(){
        let data=storage.get('yx-history',true)
        this.historyList=(data==null?[]:data)
    },
    // 设置历史记录
    setHistory(){
        if(this.keywords==''){
            return false
        }
        this.historyList.unshift(this.keywords)
        if(this.historyList.length>6){
            this.historyList.pop()
        }
        storage.set('yx-history',this.historyList,true)
    },
    // 删除历史记录
    removeHistory(){
        storage.remove('yx-history',true)
        this.getHistory()
        
    },
    // 历史记录显示隐藏
    hidden(){
        this.show=false
    },
    // 返回
    gohome(){
        this.$router.go(-1)
    }

  }
};
</script>

<style scoped lang="scss">
.history {
  width: 100%;
  .history_top {
    display: flex;
    justify-content: space-between;
    padding: 0 0.3rem;
    box-sizing: border-box;
  }
  .history_bottom {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    > p {
      width: 33%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

