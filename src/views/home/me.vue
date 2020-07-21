<template>
  <div class="me">
    <div class="header">
      <div>
        <img src="@/assets/123.jpg" />
      </div>
      <div>
        <p>
          积分:
          <span>300</span>
        </p>
        <p>退出登入</p>
      </div>
    </div>
    <van-notice-bar left-icon="volume-o" text="新上线更稳定的付费快递查询接口" :autoplay="3000" scrollable />
    <!-- 我的订单 -->
    <router-link to tag="p" class="order">
      <van-icon name="chat-o" />
      <span>我的订单</span>
      <van-icon name="arrow" />
    </router-link>

    <van-grid>
      <van-grid-item icon="ecard-pay" text="待付款" />
      <van-grid-item icon="peer-pay" text="待发货" />
      <van-grid-item icon="balance-pay" text="待收货" />
      <van-grid-item icon="notes-o" text="待评价" />
    </van-grid>

    <van-grid :column-num="3">
      <van-grid-item text="我的余额">
        <template #icon>
          <van-icon name="balance-o" color="red" size="1rem" />
        </template>
      </van-grid-item>
      <van-grid-item text="我的砍价">
        <template #icon>
          <van-icon name="edit" color="gold" size="1rem" />
        </template>
      </van-grid-item>
      <van-grid-item text="我的礼券">
        <template #icon>
          <van-icon name="records" color="skyblue" size="1rem" />
        </template>
      </van-grid-item>
      <van-grid-item text="我的收藏">
        <template #icon>
          <van-icon name="like-o" color="yellow" size="1rem" />
        </template>
      </van-grid-item>
      <van-grid-item text="我的地址">
        <template #icon>
          <van-icon name="location-o" color="sandybrown" size="1rem" @click="getAdd()" />
        </template>
      </van-grid-item>
      <van-grid-item text="联系客服">
        <template #icon>
          <van-icon name="phone-o" color="fuchsia" size="1rem" />
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  data() {
    return {};
  },
  created() {
    this.getAdd()
  },
  mounted() {},
  methods: {
   
    getAdd(){
      let data=storage.get('user',true)
      let formdata=new FormData()
      formdata.append('token',data.token)
      this.$axios.post("https://api.it120.cc/small4/user/shipping-address/list",formdata
      ).then(res=>{
        this.$router.push({
          path:"/address"
        })
      })
    }
  }
};
</script>

<style scoped lang='scss'>
.me {
  width: 100%;
  .header {
    width: 100;
    background: gold;
    height: 4rem;
    display: flex;
    padding: 1rem 0.5rem;
    box-sizing: border-box;
    div:nth-of-type(1) {
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 2rem;
        height: 2rem;
      }
    }
    div:nth-of-type(2) {
      padding: 1.2rem 0.5rem;
      box-sizing: border-box;
      p {
        font-size: 0.4rem;
      }
      p:nth-of-type(1) {
        width: 3rem;
        background: #ddd;
        border-radius: 0.2rem;
        text-indent: 0.2rem;
      }
      p:nth-of-type(2) {
        line-height: 1rem;
      }
    }
  }
  //   订单
  .order {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.2rem;
    box-sizing: border-box;
    align-items: center;
    border-top: 0.2rem solid #ddd;
    border-bottom: 0.02rem solid #ddd;
    height: 2rem;
  }
}
</style>
