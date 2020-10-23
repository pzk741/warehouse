<template>
  <div class="login">
    <div class="left"></div>
    <div class="right">
      <!-- 表单元素 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <p>千锋管理系统</p>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" native-type="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 视频video -->
    <video
      class="bg-video"
      muted
      src="../../src/assets/video/bg-login.mp4"
      autoplay
      loop
      preload="auto"
    ></video>
  </div>
</template>
<script>
import { login } from "../../api/index";
import { mapMutations } from "vuex"
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      //用户名正则，4到16位（字母，数字，下划线，减号）
      let uPattern = /^[a-zA-Z0-9_-]{3,16}$/;
      //输出 true
      if (uPattern.test(value)) {
        callback();
      } else {
        callback(new Error("请输入4到16位(字母,数字,下划线,减号)"));
      }
    };
    var validatepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatepass, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(['SETUSERINFO']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //如果通过验证，打开loadling
          const loading = this.$loading({
            lock: true,
            text: "正在登录",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          let { username, password } = this.ruleForm;
          login(username, password)
            .then(res => {
              //服务器响应后，关闭loadling
              loading.close();
              if (res.data.state) {
                //如果用户名和密码正确
                this.$message.success('登录成功');
                //将token保存到本地存储
                localStorage.setItem("login-token", res.data.token);
                localStorage.setItem("user-Info", JSON.stringify(res.data.userInfo));
                //将用户信息保存到vuex中
                this.SETUSERINFO(res.data.userInfo)
                this.$router.push("/Welcome")
              } else {
                //如果用户名或密码错误
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("请输入正确的用户名和密码");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.left {
  width: 50%;
  height: 100%;
  background-image: url("../../src/assets/imgs/bg.png");
  background-repeat: no-repeat;
  background-size: 50%;
  position: absolute;
  opacity: 0.7;
  background-position: 60% 65%;
}
.right {
  width: 400px;
  height: 490px;
  z-index: 9;
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  border-radius: 11px;
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
}
.login {
  position: relative;
  overflow: hidden;
  height: 100%;
}
video {
  display: block;
  margin: auto;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 1;
}
.el-form {
  height: 380px;
  padding: 65px 0 45px 0;
  color: #fff;
}
.el-form p {
  font-size: 32px;
  font-weight: 600;
  line-height: 50px;
  margin-bottom: 50px;
}
.el-input {
  width: 250px;
  left: -20px;
}
</style>