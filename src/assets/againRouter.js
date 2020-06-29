// 解决路由重复点击事件
import Router from 'vue-router'
const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}