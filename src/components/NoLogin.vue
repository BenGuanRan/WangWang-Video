<template>
  <div class="no_login darkmode-ignore">
    <div class="bg"></div>
    <div class="btn_con">
      <el-button type="primary" @click="login">我要登录</el-button>
      <el-button @click="noLogin">游客访问</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$EventBus.$emit("otherLogin");
    },
    noLogin() {
      this.$router.push("/main/recommend");
    },
  },
};
</script>

<style scoped>
.no_login {
  position: relative;
  height: 100%;
}
.bg {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 80%;
  height: 70%;
  background-image: url(../assets/img/no_login.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.btn_con {
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  position: absolute;
  width: 80%;
  height: 10%;
  text-align: center;
}
</style>
