<template>
  <div class="pay">
    <van-nav-bar title="确认付款" left-arrow @click-left="goHome" />
    <div class="pay_add">
      <van-icon name="location-o" />
      <div>
        <p><span>商品金额:</span><span>{{this.$store.getters.allM}}</span></p>
        <p><span>订单号</span><span>{{this.$store.state.payList.orderNumber}}</span></p>
      </div>
    </div>
    <div class="pay_add">
      <van-icon name="refund-o" />
      <div>
        <p>{{orderList.linkMan}}-{{orderList.mobile}}</p>
        <p>{{orderList.address}}</p>
      </div>
    </div>
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
    goHome() {
      this.$router.push({
        path: "/home"
        
      });
      this.$store.commit('clear')
    },
    getAdd() {
      let data = storage.get("user", true);
      this.$axios({
        url: "https://api.it120.cc/small4/user/shipping-address/default",
        params: {
          token: data.token
        }
      }).then(res => {
        this.orderList = res.data;
        
      });
      this.$store.commit("setorderList");
    }
  }
};
</script>

<style scoped lang='scss'>
.pay {
  width: 100%;
  .pay_add {
    display: flex;
    align-items: center;
    padding: 0.2rem;
    box-sizing: border-box;
    div {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
