import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
    // 全局状态
    state: {
        show: true,
        cartList:[],
        nums:0,
        // 订单商品
        orderList:[],
        payList:[]
    },
    // 同步方法结合
    mutations: {
        setloading(state, load) {
            state.show = load
        },
        addCart(state,load){
            state.cartList=load
        },
        count(state){
            let tmp=0
            state.cartList.forEach(item=>{
                tmp+=item.nums
            })
            state.nums=tmp
        },

        setorderList(state){
            state.orderList=state.cartList.filter(value=>{
                return value.checked==true
            })
        },
        setPay(state,load){
            state.payList=load
        },
        clear(state){
            state.payList=[]
            state.order=[]
            state.cartList=[]
        }

    },
    // 异步方法集合
    actions: {},
    // 计算数据集合
    getters: {
        // 商品总价
        allM(state){
            let num=0
            state.orderList.forEach(value=>{
                return num+=value.price*value.nums
            })
            return num*100
        }
    },
    // 模块化
    modules: {},
    // 数据持久化
    plugins: [createPersistedState()]
})