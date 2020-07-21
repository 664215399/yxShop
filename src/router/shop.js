// 定义路由并且导出
import Resister from '../views/login/register'
import login from '../views/login/login'
import home from '../views/home/home'
import tab from '../views/home/tab'
import classify from '../views/home/classify'
import me from '../views/home/me'
import car from '../views/home/car'
import cutlist from '@/components/good/cutlist'
import tuijianlist from '@/components/good/tuijianlist'
import tuijian from '@/components/tuijian'
import goods from '../views/contList/goods'
import articlelist from '../views/article/articlelist'
import cutcont from '../views/cutcont/cutcont'
import cutcontent from '../views/cutcont/cutcontent'
import kanjia from '../views/cutcont/kanjia'
import address from '../views/address/address'
import addressCreate from '../views/address/addressCreate'
import content from '../views/article/content'
import shopcont from '../views/shopcont/shopcont'
import search from '@/components/good/search'
import orderlist from '../views/order/orderlist'
import paylist from '../views/order/paylist'
// 图片懒加载
import imgloading from '../views/imgloading/imgloading'

const shop = [
    // 注册页面路由
    {
        path: '/shop/register',
        name: 'resister',
        component: Resister,
        meta: {
            title: "注册页面"
        }
    },
    // 登入页面路由
    {
        path: '/shop/login',
        name: 'login',
        component: login,
        meta: {
            title: "登入页面"
        }
    },
    // 砍价详情页
    {
        path: '/cutlist',
        name: 'cutlist',
        component: cutlist,
        meta: {
            title: "全民砍价"
        }
    },
    // 人气推荐详情页
    {
        path: '/tuijianlist',
        name: 'tuijianlist',
        component: tuijianlist,
        meta: {
            title: "人气推荐"
        }
    },
    {
        path: '/tuijian',
        name: 'tuijian',
        component: tuijian,
        meta: {
            title: "推荐"
        }
    },
    // 分类详情页
    {
        path: '/goods/:id',
        name: 'goods',
        component: goods,
        meta: {
            title: "分类详情"
        }
    },
    //搜索
    {
        path: '/search',
        name: 'search',
        component: search,
        meta: {
            title: "搜索"
        }
    },
    // 精选专题列表
    {
        path: '/articlelist',
        name: 'articlelist',
        component: articlelist,
        meta: {
            title: "精选专题-列表"
        }
    },
    //商品详情页
    {
        path: '/shopcont/:id',
        name: 'shopcont',
        component: shopcont,
        meta: {
            title: "商品详情"
        }
    },
    // 精选专题详情
    {
        path: '/content',
        name: 'content',
        component: content,
        meta: {
            title: "精选专题-详情"
        }
    },
    // 订单路由
    {
        path: '/orderlist',
        name: 'orderlist',
        component: orderlist,
        meta: {
            title: "订单详情"
        }
    },
     // 支付路由
     {
        path: '/paylist',
        name: 'paylist',
        component: paylist,
        meta: {
            title: "支付详情"
        }
    },
      // 砍价详情页
      {
        path: '/cutcont',
        name: 'cutcont',
        component: cutcont,
        meta: {
            title: "砍价详情"
        }
    },
     // 注册页面路由
     {
        path: '/address',
        name: 'address',
        component: address,
        meta: {
            title: "收货地址"
        }
    },
      // 注册页面路由
      {
        path: '/addressCreate',
        name: 'addressCreate',
        component: addressCreate,
        meta: {
            title: "添加收货地址"
        }
    },
    {
        path: '/cutcontent/:id/:userId',
        name: 'cutcontent',
        component: cutcontent,
        meta: {
            title: "砍价详情"
        }
    },
    {
        path: '/kanjia',
        name: 'kanjia',
        component: kanjia,
        meta: {
            title: "砍价详情"
        }
    },
    // tab
    {
        path: '/tab',
        name: 'tab',
        component: tab,
        children: [
            {
                path: '/home',
                name: 'home',
                component: home,
                meta: {
                    title: "主页"
                }
            },
            {
                path: '/classify',
                name: 'classify',
                component: classify,
                meta: {
                    title: "分类"
                }
            },
            {
                path: '/me',
                name: 'me',
                component: me,
                meta: {
                    title: "个人中心"
                }
            },
            {
                path: '/car',
                name: 'car',
                component: car,
                meta: {
                    title: "购物车"
                }
            },
        ]
    },
    // 图片懒加载
      {
        path: '/imgloading',
        name: 'imgloading',
        component: imgloading,
        meta: {
            title: "图片懒加载"
        }
    },

]
// 导出
export default shop