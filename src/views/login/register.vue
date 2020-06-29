<template>
  <div class="register">
    <div class="log">
      <p class="log_pone">新用户注册</p>
      <p>很高兴您将成为商城的会员(注册只需要一部)</p>
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
        <van-field
          placeholder="确认密码"
          :right-icon="hidepwd1==true?'closed-eye':'browsing-history-o'"
          class="inp1"
          :type="hidepwd1==true?'password':'text'"
          v-model="confirm_pwd"
          @click-right-icon="hidepwd1=!hidepwd1"
        />
        <van-field placeholder="用户名" right-icon="contact" class="inp1" v-model="username" />
        <van-field
          placeholder="图形验证码"
          right-icon="phone-circle"
          class="inp1"
          v-model="piccode"
          @click-right-icon="getImg"
        >
          <template #right-icon>
            <img :src="imgurl" alt />
          </template>
        </van-field>
        <van-field placeholder="城市" class="inp1" right-icon="location-o" @click="show=true" v-model="city"/>
        <van-popup v-model="show" position="bottom">
          <van-area title="选择城市" :area-list="arealist" @cancel="show=false" @confirm="con" />
        </van-popup>
        <van-field placeholder="手机验证" class="inp1" v-model="code">
          <template #button>
            <van-button type="primary" :disabled="btndis" @click="gettel">{{ms}}</van-button>
          </template>
        </van-field>
        <van-button type="info" block class="res" @click=" checkForm">立即注册</van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import area from "@/utils/city";
export default {
  data() {
    return {
      city: "", //城市
      tel: "", //手机号
      pwd: "", //密码
      username: "", //用户名
      confirm_pwd: "", //确认密码
      piccode: "", //图形验证码
      code: "", //手机验证码
      //密码显示隐藏切换
      hidepwd: true,
      hidepwd1: true,
      //   图形验证码
      imgurl: "",
      pickey: "",
      // 弹出层
      show: false,
      arealist: area,
      ms:'发送验证码',
      btndis:false,
    };
  },
  created() {},
  mounted() {
    this.getImg();
  },
  methods: {
    //   表单校验
    checkForm() {
      // 非空判断
      if (
        this.tel == "" ||
        this.pwd == "" ||
        this.username == "" ||
        this.confirm_pwd == "" ||
        this.piccode == "" ||
        this.code == ""
      ) {
        this.$toast.fail("内容不能为空");
        return false;
      }
      // 正则验证手机号
      var reg = /^1[3456789]\d{9}$/;
      if (!reg.test(this.tel)) {
        this.$toast.fail("手机号码格式不正确");
        return false;
      }
      // 验证确认密码
      if (this.pwd != this.confirm_pwd) {
        this.$toast.fail("两次密码不一致");
        return false;
      }
      this.$toast.success("注册成功");
    },
    //   表单校验结束
    //  获取图形验证码
    getImg() {
      this.pickey = new Date().getTime();
      let apiurl = "https://api.it120.cc/small4/verification/pic/get";
      this.imgurl = `${apiurl}?key=${this.pickey}`;
    },
    // 选择地区
    con(val) {
        console.log(val)
        let mm=val.map((value)=>{
            return value.name
        })
        this.city=mm.join('/')
        this.show=false;
    },
    // 倒计时
    countsecond(){
        this.btndis=true
        let time=60
        let timer=setInterval(()=>{
            if(time<1){
                this.btndis=false
                clearInterval(timer)
                this.ms=`重新发送`
                return false
            }
            this.ms=`${time}S后重新发送`
            time--
        },1000)
    },
    // 获取手机验证码
    gettel(){
        this.$axios({
            url:'https://api.it120.cc/small4/verification/sms/get',
            params:{
                mobile:this.tel,
                key:this.pickey,
                picCode:this.piccode,
            }
        }).then(res=>{
            this.countsecond()
        })
    }
  }
};
</script>

<style scoped lang='scss'>
.register {
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
