import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    name: '首页',
    component: () => import('../views/layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('../views/home/index')
      },
      {
        path: '/user',
        name: '用户管理',
        component: () => import('../views/user/index')
      },
      {
        path: '/bigType',
        name: '商品大类',
        component: () => import('../views/bigType/index')
      },
      {
        path: '/smallType',
        name: '商品小类',
        component: () => import('../views/smallType/index')
      },
      { 
        path: '/salesPicture',
        name: '商品销售图',
        component: () => import('../views/PIChart/index')
      },
      { 
        path: '/product',
        name: '商品管理',
        component: () => import('../views/product/index')
      },
      {
        path: '/order',
        name: '订单管理',
        component: () => import('../views/order/index')
      },
      {
        path: '/modifyPassword',
        name: '修改密码',
        component: () => import('../views/mup/index')
      },
    ]
  },
  { //登录路由
    path: '/login',
    name: '登录',
    component: () => import('../views/login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router