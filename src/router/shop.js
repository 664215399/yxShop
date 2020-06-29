// 定义路由并且导出
import Resister from '../views/login/register'
const shop = [
    // 注册页面路由
    {
        path: '/shop/register',
        name: 'resister',
        component: Resister
    }
]
// 导出
export default shop