import Vue from "vue";
import Vuex from "vuex";

import { getMenuList } from "../../api/index"
import recursionRoutes from "../utils/recursionRoutes"
import allRoutes from "../router/allRoutes"
import dynamicRoutes from "../router/dynamicRoutes"
import router from "../router"
import { getLoginLog } from "../../api/index"

Vue.use(Vuex);

//解决刷新页面userInfo为空的问题
let userInfo = localStorage.getItem("user-Info") || "{}";
userInfo = JSON.parse(userInfo)

export default new Vuex.Store({
  state: {
    userInfo,
    sideMenu: [],
    crumbs: [],
    loginlog: []
  },
  mutations: {
    //设置登录日志数据
    SETLOGINLOG(state, payload) {
      state.loginlog = payload
    },
    SETUSERINFO(state, payload) {
      state.userInfo = payload
    },
    //设置菜单栏菜单数据
    SET_SIDEMENU(state, payload) {
      state.sideMenu = payload
      let target = dynamicRoutes.find(item => {
        return item.path == "/"
      })
      target.children = [...state.sideMenu]
      router.addRoutes([...dynamicRoutes])
    },
    //设置面包屑
    SET_CRUMBS(state, payload) {
      state.crumbs = payload
    }
  },
  actions: {
    //请求侧边栏菜单数据
    async FETCH_MENULIST({ commit }) {
      let res = await getMenuList()
      if (res && res.data) {//防止出现空值
        //进行计算得出用户的菜单
        let menuList = res.data.menuList
        let userMenu = recursionRoutes(allRoutes, menuList)//得出用户拥有的内容
        commit("SET_SIDEMENU", userMenu)
      }
    },
    async FETCH_LOGINLOG({ commit }) {
      let res = await getLoginLog()
      commit("SETLOGINLOG", res.data.data)
    }
  },
  getters: {},
  modules: {}
});
