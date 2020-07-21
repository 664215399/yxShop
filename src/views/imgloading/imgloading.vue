<template>
  <div class="img">
    <div v-for="(value,index) in img" :key="index" class="item">
      <img :src="value.pic"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: []
    };
  },
  created() {},
  mounted() {
    this.getData();
    window.addEventListener("scroll", this.srcChange);
  },
  methods: {
    getData() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        this.img = res.data;
        this.$nextTick(
            this.waterfall,
            this.srcChange
        );
      });
    },

    // srcChange() {
    //   let html = document.documentElement || document.body;
    //   let imgs = document.querySelectorAll("img");
    //   for (var i = 0; i < imgs.length; i++) {
    //     if (html.clientHeight + html.scrollTop > imgs[i].offsetTop) {
    //       imgs[i].src = imgs[i].getAttribute("data_src");
    //     }
    //   }
    // },
    // 瀑布
    waterfall() {
      let item = document.querySelectorAll(".item");
      let cWidth=document.documentElement.clientWidth
      let iwidth=item[0].clientWidth
      let columns=parseInt(cWidth/iwidth)
      let heightArr=[]
        for(var i=0;i<item.length;i++){
            if(i<columns){
                item[i].style.top=0+'px'
                item[i].style.left=iwidth*i+'px'
                heightArr.push(item[i].clientHeight);
            }else{
                let minIndex=0
                let minHeight=heightArr[0]
                for(var m=0;m<heightArr.length;m++){
                    if(heightArr[m]<minHeight){
                        minHeight=heightArr[m]
                        minIndex=m
                    }
                }

                item[i].style.left=item[minIndex].offsetLeft+'px'
                item[i].style.top=minHeight+'px'
                heightArr[minIndex]=minHeight+item[i].clientHeight
            }
        }
    }
  }
};
</script>

<style scoped lang='scss'>
.img {
  width: 100%;
  position: relative;
  div{
    width: 48%;
    position: absolute;
    img {
      width: 100%;
    }
  }
}
</style>
