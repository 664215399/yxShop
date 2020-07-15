<template>
  <div class="login">
    <div class="log">
      <p class="log_pone">用户注册</p>
      <p>虾米-严选商城欢迎您</p>
      <van-form>
        <van-field placeholder="手机号码" right-icon="phone-circle" class="inp1" v-model="tel" />
        <van-field
          placeholder="密码"
          :right-icon="hidepwd==true?'closed-eye':'browsing-history-o'"
          class="inp1"
          :type="hidepwd==true?'password':'text'"
          v-model="pwd"
          @click-right-icon="hidepwd=!hidepwd"
        />
        <van-button type="info" block class="res" @click="checklogin">立即登入</van-button>
      </van-form>
      <a style="text-align:center; margin:0.5rem 0rem; display:block; color:#999999">忘记密码</a>
      <a
        href="http://localhost:8080/#/shop/register"
        style="color:blue;margin:0 auto; display:block;text-align:center;"
      >没有账号？立即注册</a>
    </div>
  </div>
</template>

<script>
// 引入本地存贮
import storage from "@/utils/storage";
export default {
  data() {
    return {
      tel: "",
      pwd: "",
      hidepwd: true
    };
  },
  created() {},
  mounted() {},
  beforeRouteEnter: (to, from, next) => {
    let data = storage.get("user", true);
    if (data != null) {
      next("/");
    } else {
      next();
    }
  },
  methods: {
    checklogin() {
      if (this.tel == "" || this.pwd == "") {
        this.$toast.fail("用户名密码不能为空");
        return false;
      }
      var reg = /^1[3456789]\d{9}$/;
      if (!reg.test(this.tel)) {
        this.$toast.fail("手机号码格式不正确");
        return false;
      }
      this.dologin();
    },
    dologin() {
      this.$axios({
        url:
          "https://api.it120.cc/small4/user/m/login?deviceId=007&deviceName=monkey",
        params: {
          mobile: this.tel,
          pwd: this.pwd
        }
      }).then(res => {
        console.log(res);
        if (res.code != 0) {
          this.$toast.fail(res.msg);
          return false;
        }
        let user = new Object();
        user.uid = res.data.uid;
        user.token = res.data.token;
        user.account = this.tel;
        storage.set("user", JSON.stringify(user));
        this.$toast.success("登入成功");
        this.$router.go(-1);
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.login {
  height: 100%;
  padding: 0.26rem;
  margin: 0 auto;
  box-sizing: border-box;
  .log {
    color: #999999;
    padding: 0.3rem;
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    border: 0.03rem solid #ddd;
    .log_pone {
      font-size: 0.8rem;
      color: black;
      line-height: 2rem;
    }
    .inp1 {
      border: 0.03rem solid #ddd;
      margin-top: 0.2rem;
      border-radius: 0.3rem;
    }

    ::placeholder {
      color: #999999 !important;
    }
    img {
      width: 4rem;
    }
    .res {
      width: 80%;
      margin: 0 auto;
      margin-top: 0.2rem;
      border-radius: 0.3rem;
      background: linear-gradient(90deg, #5ea6f8, #bb87f6);
      text-align: center;
      line-height: 0.57rem;
      font-size: 0.5rem;
      color: white;
      outline: none;
      border: none;
    }
  }
}
</style>
