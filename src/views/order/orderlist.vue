<template>
  <div class="order">
    <van-nav-bar title="确认订单" left-arrow @click-left="goHome" />
    <div class="order_list">
      <van-icon name="location-o" />
      <div class="order_cont">
        <p>{{orderList.linkMan}}-{{orderList.mobile}}</p>
        <p>{{orderList.address}}</p>
      </div>
      <van-icon name="arrow" />
    </div>
    <div class="order_shop">
      <p>商品列表</p>
      <van-card
        v-for="(value,index) in this.$store.state.orderList"
        :key="index"
        :num="value.nums"
        :price="value.price"
        :title="value.name"
        :thumb="value.pic"
      />
      <p>
        <span>配送方式</span>
        <span>快递</span>
      </p>
      <p>
        <van-field placeholder="如需备注请输入" label="备注" />
      </p>
      <p>
        <span>商品金额</span>
        <span>{{this.$store.getters.allM/100}}</span>
      </p>
    </div>
    <van-submit-bar :price="this.$store.getters.allM" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import storage from "@/utils/storage";
export default {
  data() {
    return {
      orderList: []
    };
  },
  created() {},
  mounted() {
    this.getAdd();
  },
  methods: {
    //   返回
    goHome() {
      this.$router.go(-1);
    },
    // 获取默认收货地址
    getAdd() {
      let data = storage.get("user", true);
      this.$axios({
        url: "https://api.it120.cc/small4/user/shipping-address/default",
        params: {
          token: data.token
        }
      }).then(res => {
        console.log(res);
        if (res.code != 0) {
          this.$toast.fail("请先登入");
          this.$router.push("/shop/login");
        }
        this.orderList = res.data;
      });
      this.$store.commit("setorderList");
    },
    // 创建订单

    onSubmit() {
      let data = storage.get("user", true);
      let arr = [];
      this.$store.state.orderList.forEach(value => {
        let obj = new Object();
        obj.goodsId = value.id;
        obj.number = value.nums;
        obj.propertyChildIds = value.properties;
        obj.logisticsTyp = 0;
        arr.push(obj);
      });
      console.log(arr)
      let formdata = new FormData();
      formdata.append("token", data.token);
      formdata.append("goodsJsonStr", JSON.stringify(arr));
      this.$axios
        .post("https://api.it120.cc/small4/order/create", formdata)
        .then(res=>{
            this.$toast.loading({
                message:'订单努力生成中',
                overlay:true
            })
            this.$store.commit('setPay',res.data)
            setTimeout(() => {
              this.$router.push({
                  path:'/paylist'
              })  
            },2000);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.order {
  width: 100%;
  .order_list {
    width: 100%;
    display: flex;
    padding: 0.2rem;
    box-sizing: border-box;
    align-items: center;
    .order_cont {
      flex: 1;
      p {
        font-size: 0.5rem;
        text-indent: 0.5rem;
      }
    }
  }
  .order_shop {
    padding: 0.5rem;
    box-sizing: border-box;
    p {
      display: flex;
      justify-content: space-between;
      padding: 0 0.2rem;
    }
  }
}
</style>
