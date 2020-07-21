<template>
  <div>
    <ul>
      <!-- <router-link :to="'/cutcontent/'+value.id+'/'+this.kjId" tag="li"> -->
        <li v-for="(value,index) in cut" :key="index" @click="jump(value.id)">
          <img :src="value.pic" alt />
          <div class="cont">
            <p v-html="value.name"></p>
            <p v-html="value.characteristic"></p>
            <p>
              <span>${{value.minPrice}}</span>
              <span>${{value.originalPrice}}</span>
              <span>${{value.stores}}</span>
            </p>
            <p>
              <span>低价</span>
              <span>原价</span>
              <span>限量</span>
            </p>
          </div>
        </li>
      <!-- </router-link> -->
      <!-- <li v-for="(value,index) in cut" :key="index"></li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: ["cut", "cutList"],
  data() {
    return {
      kjId:''
    };
  },
  created() {},
  mounted() {},
  methods: {
    jump(id){
      this.cutList.forEach(value => {
        if(value.goodsId==id){
          this.kjId=value.id
        }
      });
      this.$router.push({
        name:"cutcontent",
        params:{
          id:id,
          kjId:this.kjId
          
        }
      })
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    padding: 0.2rem;
    box-sizing: border-box;
    img {
      width: 30%;
    }
    .cont {
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p:nth-of-type(2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-of-type(3) {
        span {
          padding: 0 0.2rem;
          color: #cccccc;
        }
      }
      p:nth-of-type(4) {
        span {
          padding: 0 0.2rem;
          color: #cccccc;
        }
      }
    }
  }
}
</style>
