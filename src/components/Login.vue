<template>
  <div class="login" v-show="this.show" @click.self="hidden">
    <div class="login_box">
      <el-tabs v-model="activeTab" tab-position="left" type="border-card" :stretch="true">
        <el-tab-pane label="登录" name="first">
          <div class="sign_in">
            <div class="sign_in_header">登录</div>
            <div class="sign_in_body">
              <div class="username">
                <div clss="el-icon-refresh"></div>
                <div>
                  <span class="all" v-if="!loginVerfy.username">*请填写账号</span>
                  <span class="all" v-if="!ifLoginEmailRight && loginVerfy.username"
                    >*请填邮箱类型</span
                  >
                  <span>账号：</span>
                  <input
                    type="text"
                    placeholder="请输入账号"
                    v-model="loginForm.userName"
                  />
                </div>
              </div>
              <div class="password">
                <div>
                  <span class="all" v-if="!loginVerfy.password">*请填写密码6-20位</span>
                  <span>密码：</span>
                  <input
                    :type="ifSee"
                    placeholder="请输入密码"
                    v-model="loginForm.userPwd"
                  />
                  <span
                    class="el-icon-view passWord_eye"
                    @mouseleave="noSee"
                    @mouseenter="see"
                  ></span>
                </div>
              </div>
            </div>
            <div class="sign_in_footer">
              <button class="darkmode-ignore" @click="login">登录</button>
              <button class="darkmode-ignore" @click="cancel">取消</button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <div class="sign_in">
            <div class="sign_in_header">注册</div>
            <div class="sign_in_body flow">
              <div class="username">
                <div>
                  <span class="all" v-if="!enrollVerfy.nickName">*请填写昵称</span>
                  <span>昵称：</span>
                  <input type="text" v-model="registerForm.nickName" placeholder="昵称" />
                </div>
              </div>
              <div class="username">
                <div>
                  <span class="all" v-if="!enrollVerfy.email">*请填写邮箱</span>
                  <span class="all" v-if="!ifRegistEmailRight && enrollVerfy.email"
                    >*邮箱格式不正确</span
                  >
                  <span>邮箱：</span>
                  <input type="email" v-model="registerForm.email" placeholder="邮箱" />
                </div>
              </div>
              <div class="username" ref="btn">
                <div>
                  <span class="all" v-if="!enrollVerfy.verfyCode">*请填写验证码</span>
                  <span>验证码：</span>
                  <input
                    class="verfy"
                    v-model="registerForm.verfyCode"
                    type="text"
                    placeholder="验证码"
                  />
                  <el-button
                    class="get_verfy"
                    @click="getVerfyCode"
                    :disabled="ifDisabled"
                    >获取验证码</el-button
                  >
                </div>
              </div>
              <div class="password">
                <div>
                  <span class="all" v-if="!enrollVerfy.password">*请填写密码6-20位</span>
                  <span>密码：</span>
                  <input
                    required
                    :type="ifSee"
                    v-model="registerForm.password"
                    placeholder="密码"
                  />
                  <span
                    class="el-icon-view passWord_eye"
                    @mouseleave="noSee"
                    @mouseenter="see"
                  ></span>
                </div>
              </div>
            </div>
            <div class="sign_in_footer">
              <button class="darkmode-ignore" @click="register">注册</button>
              <button class="darkmode-ignore" @click="cancel">取消</button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http.js";

export default {
  mounted() {
    // 获取get验证码按钮
    this.btn = this.$refs.btn.querySelector("button");
  },
  created() {},
  props: {
    ifShow: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    ifShow(n) {
      this.show = n;
    },
  },
  data() {
    return {
      ifDisabled: false,
      activeTab: "first",
      show: this.ifShow,
      userName: "",
      nickName: "",
      token: "",
      userId: "",
      ifLogin: false,
      loginForm: {
        userName: "",
        userPwd: "",
      },
      // 注册表单
      registerForm: {
        nickName: "",
        email: "",
        password: "",
        verfyCode: "",
      },
      verfyCode: "", // 验证码
      loginVerfy: {
        username: true,
        password: true,
      },
      enrollVerfy: {
        nickName: true,
        email: true,
        verfyCode: true,
        password: true,
      },
      ifRegistEmailRight: true,
      ifLoginEmailRight: true,
      btn: this.$refs.btn,
      ifSee: "password",
    };
  },
  methods: {
    hidden() {
      this.show = false;
      this.$emit("childrenChange", this.show);
    },
    cancel() {
      this.hidden();
    },
    login() {
      this.resetRegister();
      if (!this.verfyLogin()) return;
      http
        .post("/login", {
          userName: this.loginForm.userName,
          userPwd: this.loginForm.userPwd,
        })
        .then((res) => {
          if (res.data.code != 200) {
            this.$message({
              showClose: true,
              message: res.data.data.msg,
              type: "warning",
            });
            this.loginForm.userPwd = "";
            return;
          }
          window.history.go(0);
          let { nickName, token, userName, userId } = res.data.data;
          this.nickName = nickName;
          this.token = token;
          this.userName = userName;
          this.ifLogin = true;
          this.userId = userId;
          // 传递给父组件告知登录成功
          this.$emit("hasLogin");
          this.show = false;
          sessionStorage.setItem("token", this.token);
          sessionStorage.setItem("username", this.userName);
          sessionStorage.setItem("nickname", this.nickName);
          sessionStorage.setItem("userId", this.userId);
          sessionStorage.setItem("loginTime", new Date().getTime());
          this.$message({
            showClose: true,
            message: this.nickName + "，欢迎登录!",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    register() {
      this.resetLogin();
      if (!this.verfyEnroll()) return;
      if (this.registerForm.verfyCode != this.verfyCode) {
        this.$message.error("验证码错误");
        return;
      }
      http
        .post("/register", {
          userName: this.registerForm.email,
          userPwd: this.registerForm.password,
          nickName: this.registerForm.nickName,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.$message.success("注册成功，请登录！");
            this.activeTab = "first";
          } else {
            this.$message.error("改邮箱已被注册，请登录！");
            this.activeTab = "first";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    verfyLogin() {
      let ifPass = true;
      if (!this.loginForm.userName) {
        this.loginVerfy.username = false;
        ifPass = false;
      }
      if (!this.loginForm.userPwd) {
        this.loginVerfy.password = false;
        ifPass = false;
      }
      // 正则验证邮箱格式
      if (
        !new RegExp(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(
          this.loginForm.userName
        )
      ) {
        this.ifLoginEmailRight = false;
        ifPass = false;
      }
      return ifPass;
    },
    verfyEnroll() {
      let ifPass = true;
      if (!this.registerForm.nickName) {
        this.enrollVerfy.nickName = false;
        ifPass = false;
      }
      if (!this.registerForm.email) {
        this.enrollVerfy.email = false;
        ifPass = false;
      }
      if (!this.registerForm.verfyCode) {
        this.enrollVerfy.verfyCode = false;
        ifPass = false;
      }
      if (
        !this.registerForm.password ||
        this.registerForm.password.length < 6 ||
        this.registerForm.password.length > 20
      ) {
        this.enrollVerfy.password = false;
        ifPass = false;
      }
      // 若邮箱正则匹配且邮箱不为空时触发
      if (
        !new RegExp(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(
          this.registerForm.email
        )
      ) {
        this.ifRegistEmailRight = false;
        ifPass = false;
      }
      return ifPass;
    },
    getVerfyCode() {
      this.ifDisabled = true;
      this.btn.innerText = "90s后重试";
      if (!this.registerForm.email) {
        this.$message({
          showClose: true,
          message: "请填写邮箱先~",
          type: "warning",
        });
        return;
      }
      http
        .post("/user/sendemail", {
          userName: this.registerForm.email,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.verfyCode = res.data.data.passCode;
            this.$message({
              showClose: true,
              message: "亲，验证码已发送，请注意查收~",
              type: "success",
            });
          } else {
            this.$message.error("服务器错误~");
          }
          let self = this;
          let time = 90;
          let timer = window.setInterval(function () {
            time--;
            self.btn.innerText = time + "s后重试";
            if (time === 0) {
              self.btn.innerText = "获取验证码";
              clearInterval(timer);
              timer = null;
              self.ifDisabled = false;
            }
          }, 1000);
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "业务繁忙，请稍后再试~",
            type: "error",
          });
          console.log(err);
        });
    },
    resetLogin(deep = false) {
      if (deep) {
        for (let i in this.loginForm) {
          this.loginForm[i] = "";
        }
      }
      for (let i in this.enrollVerfy) {
        this.enrollVerfy[i] = true;
      }
      this.ifRegistEmailRight = true;
    },
    resetRegister(deep = false) {
      if (deep) {
        for (let i in this.registerForm) {
          this.registerForm[i] = "";
        }
      }
      for (let item in this.loginVerfy) {
        this.loginVerfy[item] = true;
      }
      this.ifLoginEmailRight = true;
    },
    // 随机生成四位数验证码
    randomVerfyCode() {
      let first = (parseInt(Math.random() * 10) % 9) + 1;
      this.verfyCode = parseInt(first + Math.random() * 10000) + "";
      alert("那个验证码本月限制50次，已超额！验证码只好alert出来了：" + this.verfyCode);
    },
    // 是否显示密码
    see() {
      this.ifSee = "text";
    },
    noSee() {
      this.ifSee = "password";
    },
  },
};
</script>

<style scoped>
.flow {
  overflow: scroll;
  overflow-x: hidden;
}
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
}
.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 640px;
  height: 455px;
  background-color: #fff;
  border-radius: 5px;
}
.el-tabs {
  height: 100%;
}
.sign_in {
  height: 100%;
}
.sign_in_header {
  text-align: center;
  height: 100px;
  line-height: 100px;
  font-weight: 600px;
  font-size: 30px;
}
.sign_in_body {
  display: flex;
  flex-direction: column;
  height: 200px;
}
.sign_in_body > div,
form > div {
  box-sizing: border-box;
  flex: 1;
  padding: 20px 70px;
  text-align: center;
  line-height: 60px;
}
.sign_in_body > div > div {
  background-color: #f8f9fd;
}
.sign_in_body::-webkit-scrollbar {
  width: 4px;
  background-color: rgb(228, 228, 228);
  /*height: 4px;*/
}
.sign_in_body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.sign_in_body ::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

.sign_in_body span {
  float: left;
  height: 100%;
  font-size: 20px;
  margin-left: 20px;
}
.sign_in_body input {
  height: 60px;
  width: 280px;
  background-color: #f8f9fd;
  outline: none;
  border: none;
  font-size: 20px;
  padding-left: 10px;
}
input::-webkit-input-placeholder {
  color: #a8a8ad;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #a8a8ad;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #a8a8ad;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #a8a8ad;
}
.sign_in_footer {
  display: flex;
  height: 100px;
  align-content: center;
  justify-content: center;
}
.sign_in_footer button {
  height: 48px;
  width: 110px;
  margin: 40px;
  background-color: #ff7d43;
  left: 48px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.sign_in_footer button:hover {
  background-color: #ff9769;
}
.verfy {
  width: 100px !important;
  float: left !important;
}
.get_verfy {
  float: right;
  margin: 10px 20px;
}
.username,
.password {
  background: #f8f9fd;
  margin: 20px 70px;
  padding: 0 !important;
  height: 60px !important;
  position: relative;
}
.all {
  position: absolute;
  font-size: 14px !important;
  color: red;
  left: 0;
  top: -65%;
  left: -5%;
}
.passWord_eye {
  cursor: pointer;
  display: inline-block;
  width: 40px;
  height: 40px !important;
  position: absolute;
  text-align: center;
  line-height: 40px;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.passWord_eye:hover {
  color: #ff7d43;
}
</style>
