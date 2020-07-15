<template>
  <div class="car">
    <!-- 导航 -->
    <van-nav-bar title="购物车" left-arrow @click-left="goHome" />
    <!-- 商品卡片 -->
    <div class="card" v-for="(value,index) in cartList" :key="index">
      <van-checkbox v-model="value.checked" />
      <van-card
        :num="value.nums"
        class="card_item"
        :price="value.price+'.00'"
        :title="value.name"
        :thumb="value.pic"
      >
        <template #num>
          <van-stepper v-model="value.nums" />
        </template>
      </van-card>
    </div>
    <!-- 提交栏 -->
    <van-submit-bar :price="allMoney" button-text="提交订单" @submit="submitOrder">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
// import storage from '@/utils/storage'
export default {
  data() {
    return {
      cartList: [],
      checked: true
    };
  },
  created() {},
  mounted() {
    this.cartList = this.$store.state.cartList;
  },
  computed: {
    //   总价
    allMoney() {
      let money = 0;
      this.cartList.forEach(value => {
        if (value.checked) {
          money += value.price * value.nums * 100;
        }
      });
      return money;
    }
  },
  watch: {
    cartList: {
      handler(val) {
        this.$store.commit("addCart", val);
        this.$store.commit("count");
        let arr = val.filter(value => {
          return value.checked == true;
        });

        if (arr.length == val.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    }
  },
  methods: {
    goHome() {
      this.$router.go(-1);
    },

    // 提交订单
    submitOrder() {
      this.$toast.loading({
        duration:3000,
        message: "商品准备中",
        overlay:true
      });
      setTimeout(() => {
        this.$router.push({
          path:'/orderlist'
        })
      }, 3000);
    }
  }
};
</script>

<style scoped lang='scss'>
.car {
  width: 100%;
  .card {
    display: flex;
    padding: 0.2rem;
    box-sizing: border-box;
    .card_item {
      flex: 1;
    }
  }
}
</style>
