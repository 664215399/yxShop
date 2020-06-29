import axios from 'axios'
import Vue from 'vue'
import store from '../store/store'
axios.interceptors.request.use((config)=>{
    // 显示loading
    store.state.isLoading = true 
    return config
})

//相应拦截器
axios.interceptors.response.use((response)=>{
    // 隐藏loading
    // setTimeout(() => {
        store.state.isLoading = false
        return response
    // }, 2000);
})
// 将axios在原型上定义
Vue.prototype.$axios = axios