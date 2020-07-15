<template>
  <div class="good">
    <router-link to="/articlelist" class="biaoti" tag="p">精选专题></router-link>
    <div class="lb">
      <van-swipe :loop="false" :width="300" :height="240" :show-indicators="false">
        <van-swipe-item v-for="(value,index) in good" :key="index" class="van-s">
          <img :src="value.pic" :width="300" :height="200"/>
          <p>{{value.title}}</p>
          <p class="descript">{{value.descript}}</p>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  props: ["good"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
//   精选
.good {
  width: 100%;
  overflow: hidden;
  .van-s {
    margin-right: 0.3rem;
  }
  .biaoti {
    width: 100%;
    text-align: center;
    line-height: 1rem;
  }
  .lb {
    p {
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-of-type(1) {
      font-size: 0.3rem;
    }
    p:nth-of-type(2) {
      font-size: 0.3rem;
      color: #cccccc;
    }
  }
}
</style>
