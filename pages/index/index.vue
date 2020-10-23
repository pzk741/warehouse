<template>
  <div class="index">
    <el-container>
      <!-- 左边部分 -->
      <el-aside width>
        <div class="logo"></div>
        <!-- 菜单选项 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          text-color="#4e5bf8"
          active-text-color="#E47833"
          :router="true"
          :collapse="isCollapse"
        >
          <qf-sub-menu :sideMenu="sideMenu"></qf-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- header头部 -->
        <el-header>
          <!-- 切换按钮 -->
          <span class="iconfont" id="change-button" @click="change_menu">&#xe985;</span>
          <el-row :gutter="20">
            <el-col :span="6" :offset="6" :push="3">
              <div class="grid-content bg-purple">千锋管理系统</div>
            </el-col>
            <el-col :span="6" :offset="6">
              <div class="grid-content bg-purple">
                <el-avatar :src="circleUrl"></el-avatar>&nbsp;&nbsp;&nbsp;
                <span>欢迎您：</span>
                <a href="#" style="color:#fff">{{userInfo.nickname}}</a>&nbsp;&nbsp;&nbsp;
                <span class="quit" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主题部分 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path:'/Welcome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              v-for="item in crumbs"
              :to="{ name:item.name}"
              :key="item.path"
            >{{item.meta.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getLoginLog } from "../../api/index";
import { mapState } from "vuex";
import router from "@/router";
export default {
  // mounted () {
  //   getLoginLog()
  //   .then(res=>{
  //     console.log(res)
  //   })
  // },
  computed: {
    ...mapState(["userInfo", "sideMenu", "crumbs"])
  },
  data() {
    return {
      // 导航菜单
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      isCollapse: false
    };
  },
  methods: {
    quit() {
      //鼠标点击返回登录页,并清除localstoarge
      localStorage.removeItem("user-Info");
      localStorage.removeItem("login-token");
      this.$router.push("/");
      //刷新页面
      window.location.reload();
    },
    change_menu(el) {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        el.target.innerHTML = "&#xe504;";
      } else {
        el.target.innerHTML = "&#xe985;";
      }
    }
  }
};
</script>
<style scoped>
.el-header,
.el-footer {
  width: 100%;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  white-space: nowrap;
}
.el-header {
  background: linear-gradient(135deg, #4c67ff, #5635df);
  position: relative;
}
.el-aside {
  background: linear-gradient(135deg, #4c67ff, #5635df);
  color: #333;
  text-align: center;
  height: 100%;
  position: relative;
}
.el-menu {
  border: 1px solid black;
}
.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.index {
  height: 100%;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  height: 60px;
  color: #fff;
}
.logo {
  height: 60px;
  background-image: url("../../src/assets/imgs/logo..png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 50%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
#change-button {
  position: absolute;
  left: 20px;
  color: #fff;
  border: 0;
  background-color: inherit;
  font-size: 30px;
  z-index: 10;
}
.el-menu-item .iconfont {
  margin-right: 10px;
  font-size: 20px;
  color: inherit;
}
.quit {
  color: #ff69b4;
  cursor: pointer;
}
.el-avatar--circle {
  vertical-align: middle;
}
.el-menu-vertical-demo[data-v-57280228]:not(.el-menu--collapse) {
  min-height: 500px;
  border: 0;
  border-right: 1px solid black;
}
.el-breadcrumb{
  line-height: 1;
  margin-bottom: 20px;
}
</style>
