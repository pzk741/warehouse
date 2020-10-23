import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入基础css文件和自定义css文件
import "@/assets/style/base.css"
import "@/assets/style/el_reset.css"
import "@/assets/iconFonts/iconfont.css"

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//创建全局element
Vue.use(ElementUI);
//引入submenu组件
import qfSubMenu from "qf-sub-menu"
Vue.use(qfSubMenu)

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


//路由前置钩子(导航守卫)
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 注册和登入可以给用户访问
  // 其它页面不给访问
  if (to.path === '/login') { // 访问登入页面 那么放行
    next()
  } else { // 访问别的页面
    // 判断是否登入 判断是否有token
    const token = localStorage.getItem('login-token')
    if (token) {
      // 判断vuex中sideMenu是不是一个空数组 如果是空数组,那么要触发action获取用户菜单
      const { sideMenu } = store.state

      if (sideMenu && sideMenu.length > 0) {
        next()
      } else {
        store.dispatch('FETCH_LOGINLOG')
        store.dispatch('FETCH_MENULIST')
          .then(function () {
            next({ path: to.path })// 这里要注意, next里面要传参数即要进入的页面的路由信息，因为next传参数后，当前要进入的路由会被废止，转而进入参数对应的路由，虽然是同一个路由，这么做主要是为了确保addRoutes生效了。
          })
      }
    } else {
      // ElementUI.Message.error("身份验证失效")
      // 跳转到登入页
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

//使用路由后置钩子处理面包屑
router.afterEach((to,from) => {
  let crumblist = to.matched.slice(1)
  store.commit("SET_CRUMBS",crumblist)
  NProgress.done()
})




import "./utils/recursionRoutes.js"


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
