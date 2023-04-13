import router from "@/router/index";
//配置路由守卫   实现进入系统先进入登录成功后才能跳转到系统管理首页页面
const whiteList=['/login']//设置白名单
router.beforeEach((to,from,next)=>{

  let token=window.sessionStorage.getItem("token");
  if(token){
    if(to.path==='/login'){//如果是登录请求
      next('/')//跳转到首页
    }else{//如果没有登录请求(已登录过)
      next();//放行  到系统管理首页页面
    }
  }else{
    if(whiteList.includes(to.path)){//如果在白名单内
      next()//不需要登录，直接放行
    }else{//其他的请求  没有登录的活要进行跳转到登录页面
      next('/login')
    }
  }
})