import axios from 'axios'
import Vue from 'vue'
import store from '../store/store'
axios.interceptors.request.use((config) => {
    // 显示loading
    store.state.show = true
    // store.commit('setloading',true)
    return config
})

//相应拦截器
axios.interceptors.response.use((response) => {
    // 隐藏loading
    setTimeout(() => {
        store.state.show = false
        // store.commit('setloading',false)
    }, 2000);
    if (response.status == 200) {
        return response.data
    }
})
// 将axios在原型上定义
Vue.prototype.$axios = axios