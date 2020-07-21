<template>
  <div class="shopcont">
    <!-- 轮播图区域 -->
    <!-- <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(value,index) in banners" :key="index" class="item">
        <img :src="value.pic" />
      </van-swipe-item>
    </van-swipe> -->
    <!-- 商品简介 -->
    <!-- <div class="jianjie">
      <p>{{jianjie.name}}</p>
      <p v-html="jianjie.characteristic"></p>
      <p>
        <span>低价${{jianjie.minPrice}}</span>
        <span>原价${{jianjie.originalPrice}}</span>
        <span>库存{{jianjie.stores}}</span>
      </p>
    </div> -->
    <cutcont :banners="banners" :content="content"></cutcont>
    <!-- 选项卡 -->
    <!-- <van-tabs v-model="active" class="xxk">
      <van-tab title="商品介绍" class="xxk-jieshao">
        <p v-html="content"></p>
      </van-tab>
      <van-tab title="商品评价"></van-tab>
    </van-tabs> -->
    <!-- 底部 -->
    <van-goods-action class="good-action">
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="this.$store.state.nums"
        @click="gotoCar"
      />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="0" />
      <van-goods-action-button type="warning" text="加入购物车" @click="add" />
      <van-goods-action-button type="danger" text="立即购买" @click="add" />
    </van-goods-action>
    <p @click="goHome" class="return">＜</p>
    <!-- sku商品规格 -->
    <van-sku
      v-model="skuShow"
      :sku="sku"
      :goods="goods"
      @add-cart="addCar"
      :custom-stepper-config="customStepperConfig"
      @sku-selected="sk"
    />
  </div>
</template>

<script>
import cutcont from '../cutcont/cutcont'
export default {
  data() {
    return {
      active: 0,
      pid: 0,
      // 轮播图
      banners: [],
      propertyIds:"",
      nums:1,
      basicInfo: {},
      //   简介
      jianjie: {},
      //   商品介绍
      content: "",
      skuShow: false,
      sku: {
        // 数据结构见下方文档
        tree: [
          {
            k: "颜色",
            k_s: "c1",
            v: [
              { id: 1, name: "红色" },
              { id: 2, name: "白色" }
            ]
          }
        ],
        list: [
          {
            id: 2259, // skuId
            c1: 1,
            price: 1000, // 价格（单位分）
            stock_num: 10 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId
            c1: 2,
            price: 2000, // 价格（单位分）
            stock_num: 11 // 当前 sku 组合对应的库存
          }
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false // 是否无规格商品
      },
      goods: {
        // 数据结构见下方文档
        picture:""
      },
      nums: 1,
      customStepperConfig: {
        handleStepperChange: currentValue => {
          this.nums = currentValue;
        }
      }
    };
  },
  created() {
    this.pid = this.$route.params.id;
  },  
  // 注册组件
  components:{
    cutcont
  },
  mounted() {
    this.getData();
    this.getP();
    this.$store.commit("count");
  },
  methods: {
    // 进入购物车
    gotoCar(){
      this.$router.push('/car')
    },
    sk(val){
      console.log(val)
      this.propertyIds=`${val.skuValue.propertyId}:${val.skuValue.id}`
    },
    // 添加购物车
    addCar() {
      let data = localStorage.getItem("user");
      if (data == null) {
        this.$router.push({
          path: "/shop/login"
        });
        return false;
      }
      // 用户已经登入信息
      let cartList = this.$store.state.cartList;
      // 添加购物车
      let index = cartList.findIndex(value => {
        return this.pid == value.id;
      });
      if (index == -1) {
        let object = new Object();
        object.id = this.pid;
        object.name = this.basicInfo.name;
        object.price = this.basicInfo.originalPrice;
        object.nums = this.nums;
        object.properties=this.propertyIds
        object.pic=this.goods.picture
        object.checked = true;
        cartList.push(object);
      }else{
        cartList[index].nums+=this.nums
      }

      this.$toast.success("购物车添加成功");
      this.skuShow = false;
      this.$store.commit("addCart", cartList);
      this.$store.commit("count");
    },

    //   返回
    goHome() {
      this.$router.go(-1);
    },
    add() {
      this.skuShow = true;
    },

    setSku(property) {
      // 定义sku属性不存在
      if (property == undefined) {
        return false;
      }
      let tree = [];
      let list = [];
      // 遍历属性
      property.forEach(element => {
        let object = new Object();
        object.k = element.name;
        object.k_s = `c_${element.id}`;
        object.v = element.childsCurGoods;
        tree.push(object);
      });
      this.sku.tree = tree;

      tree.forEach(value => {
        value.v.forEach(val => {
          let obj = new Object();
          obj.id = value.k_s.split("_")[1];
          obj[value.k_s] = val.id;
          obj.price = 10000;
          obj.stock_num = 120;
          list.push(obj);
        });
      });
      console.log(list);
      this.sku.list = list;
    },
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
        this.setSku(res.data.properties);
        this.basicInfo = res.data.basicInfo;
        this.goods.picture=this.banners[0].pic
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
}
</style>
