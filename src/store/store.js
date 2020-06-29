import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
    // 全局状态
    state:{
        num:100,
    },
    // 同步方法结合
    mutations:{},
    // 异步方法集合
    actions:{},
    // 计算数据集合
    getters:{},
    // 模块化
    modules:{},
    // 数据持久化
    plugins: [createPersistedState()]
})