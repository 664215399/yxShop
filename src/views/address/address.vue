<template>
  <div class="add">

  </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  data() {
    return {
        list:{}
    };
  },
  created() {
      console.log(this.list)
      this.getAdd()
  },
  mounted() {},
  methods: {
    getAdd() {
      let data = storage.get("user", true);
      let formdata = new FormData();
      formdata.append("token", data.token);
      this.$axios
        .post(
          "https://api.it120.cc/small4/user/shipping-address/list",
          formdata
        )
        .then(res => {
            // this.list=res.data
            
        });
    }
  }
};
</script>

<style scoped>
</style>
