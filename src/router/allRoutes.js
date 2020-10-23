import Attendance from '../../pages/index/Attendance'
import Mine from '../../pages/index/Mine'
import Statistics from '../../pages/index/Statistics'
import Users from '../../pages/index/Users'
import Welcome from '../../pages/index/Welcome'
import StudentManager from '../../pages/index/StudentManager'
import studentProduct from '../../pages/index/StudentManager/studentProduct.vue'
import studentDormitory from '../../pages/index/StudentManager/studentDormitory.vue'
import studentProfile from '../../pages/index/StudentManager/studentProfile.vue'
const allRoutes = [
  {
    path: 'Welcome',
    name: 'Welcome',
    component: Welcome,
    meta: {
      name: '管理首页',
      icon: 'iconfont icon-shouye',
        fullPath:"/Welcome"
    }
  },
  {
    path: 'StudentManager',
    name: 'StudentManager',
    redirect:"StudentManager/studentProduct",
    component: StudentManager,
    meta: {
      name: '学员管理',
      icon: 'iconfont icon-xueyuan'
    },
    children: [
      {
        path: 'studentProduct',
        name: 'studentProduct',
        component: studentProduct,
        meta: {
          name: '学员项目管理',
          icon: 'iconfont icon-wode1',
        },
      },
      {
        path: 'studentProfile',
        name: 'studentProfile',
        component: studentProfile,
        meta: {
          name: '学员资料',
          icon: 'iconfont icon-kaoqin2'
        }
      },
      {
        path: 'studentDormitory',
        name: 'studentDormitory',
        component: studentDormitory,
        meta: {
          name: '学员宿舍',
          icon: 'iconfont icon-shuju2'
        }
      }
    ]
  },
  {
    path: 'Attendance',
    name: 'Attendance',
    component: Attendance,
    meta: {
      name: '考勤管理',
      icon: 'iconfont icon-kaoqin'
    }
  },
  {
    path: 'Users',
    name: 'Users',
    component: Users,
    meta: {
      name: '用户管理',
      icon: 'iconfont icon-yonghu'
    }
  },
  {
    path: 'Statistics',
    name: 'Statistics',
    component: Statistics,
    meta: {
      name: '数据统计',
      icon: 'iconfont icon-shuju1'
    }
  },
  {
    path: 'Mine',
    name: 'Mine',
    component: Mine,
    meta: {
      name: '我的中心',
      icon: 'iconfont icon-wode'
    }
  }
]

export default allRoutes