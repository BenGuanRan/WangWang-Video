<template>
  <div class="user_box">
    <div class="user_container" :class="{ change_ps: this.ifChangePassword }">
      <div class="user_left">
        <div :class="ifSmall ? 'user_small_up' : 'user_top'">
          <div class="photo_container">
            <div class="photo_inner">
              <img :src="avatar" alt />
              <div class="mack">
                <span>点击修改头像</span>
                <oss-picture-uploader
                  ref="avator"
                  @pictureUploadSuccess="changeAvatar"
                ></oss-picture-uploader>
              </div>
            </div>
          </div>
        </div>
        <div class="user_bottom">
          <div class="user_bottom--top">
            <div
              class="nickName_container"
              @mouseenter="nickNameHover"
              @mouseleave="nickNameLeave"
            >
              <span v-show="showNickName">{{ nickName }}</span>
              <el-input
                @blur="nickNameBlur"
                @focus="nickNameFocus"
                v-show="!showNickName"
                v-model="nickName"
                maxlength="15"
                show-word-limit
                size="mini"
              ></el-input>
            </div>
            <div class="email_container">
              <span>邮箱：</span>
              {{ userName }}
            </div>
            <div class="more_container">
              <span class="el-icon-user"></span>尊敬的汪汪视频用户
            </div>
            <div class="sign_container" @mouseenter="signHover" @mouseleave="signLeave">
              <span class="el-icon-edit"></span>
              <span v-show="showSign">{{ userSign }}</span>
              <el-input
                style="width: 80%"
                @blur="signBlur"
                @focus="signFocus"
                v-show="!showSign"
                v-model="userSign"
                maxlength="20"
                show-word-limit
                size="mini"
              ></el-input>
            </div>
          </div>

          <div class="user_bottom--bottom" @click="changePassword">
            <span>修改密码</span>
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>
      </div>
      <div class="user_right">
        <div :class="ifSmall ? 'user_top_small' : 'user_top'">
          <div class="photo_container">
            <div class="photo_inner">
              <img :src="userData.avatar" alt />
            </div>
          </div>
        </div>
        <div :class="ifSmall ? 'user_bottom_small' : 'user_bottom'">
          <el-form
            class="password_container"
            :rules="rules"
            :model="changePassForm"
            ref="changePassForm"
          >
            <el-form-item prop="oldPassWord">
              <div class="password_box">
                <el-input
                  v-model="changePassForm.oldPassWord"
                  placeholder="原始密码"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="newPassWord">
              <div class="password_box">
                <el-input
                  placeholder="新密码"
                  v-model="changePassForm.newPassWord"
                  show-password
                ></el-input>
              </div>
            </el-form-item>
            <div class="password_box">
              <el-button type="primary" @click="change">确定</el-button>
              <el-button @click="back">返回</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http.js";
import OssPictureUploader from "../OssPictureUploader.vue";
export default {
  props: {
    userData: {
      type: Object,
      require: true,
    },
  },
  components: { OssPictureUploader },
  data() {
    return {
      ifSmall: false,
      userName: "",
      userId: "",
      nickName: "",
      userSign: "",
      avatar: "",
      showNickName: true,
      ifNickNameFocus: false,
      showSign: true,
      ifSignFocus: false,
      ifChangePassword: false,
      changePassForm: {
        oldPassWord: "",
        newPassWord: "",
      },
      rules: {
        oldPassWord: [
          { required: true, message: "请填写旧密码", trigger: "blur" },
          { required: true, message: "请填写旧密码", trigger: "change" },
        ],
        newPassWord: [
          { required: true, message: "请填写新密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    if (window.innerWidth < 900) {
      this.ifSmall = true;
    }
    this.userId = sessionStorage.getItem("userId");
    this.nickName = this.userData.userNickName;
    this.userName = this.userData.userName;
    this.userSign = this.userData.sign;
    this.avatar = this.userData.avatar;
  },
  created() {
  },
  methods: {
    nickNameHover() {
      this.showNickName = false;
    },
    nickNameLeave() {
      if (!this.ifNickNameFocus) this.showNickName = true;
    },
    nickNameFocus() {
      this.ifNickNameFocus = true;
    },
    nickNameBlur() {
      this.ifNickNameFocus = false;
      this.showNickName = true;
      http
        .post("/user/nickname", {
          userId: this.userId,
          nickName: this.nickName,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signHover() {
      this.showSign = false;
    },
    signLeave() {
      if (!this.ifSignFocus) this.showSign = true;
    },
    signFocus() {
      this.ifSignFocus = true;
    },
    signBlur() {
      this.ifSignFocus = false;
      this.showSign = true;
      http
        .post("/user/sign", {
          userId: this.userId,
          sign: this.userSign,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改密码
    changePassword() {
      this.ifChangePassword = true;
    },
    back() {
      this.reset();
      this.ifChangePassword = false;
    },
    change() {
      this.$refs.changePassForm.validate((valid) => {
        if (!valid) {
          return;
        }
        http
          .post("/user/changepwd", {
            userName: this.userName,
            userPwd: this.changePassForm.oldPassWord,
            userNewPwd: this.changePassForm.newPassWord,
          })
          .then((res) => {
            if (res.data.code === 200) {
              this.$notify({
                title: "success",
                message: "密码修改成功，请重新登陆。",
                type: "success",
              });
              sessionStorage.clear();
              window.history.go(0);
            } else {
              this.$notify({
                title: "error",
                message: "密码输入错误~",
                type: "error",
              });
            }
          })
          .catch(() => {
            this.$message.error("出错啦，请联系开发人员！");
          });
      });
    },
    // 重置
    reset() {
      this.$refs.changePassForm.resetFields();
    },
    // 修改头像
    changeAvatar(url) {
      this.avatar = url;
      this.$refs.avator.imageUrl = "";
      http
        .post("/user/avatar", {
          userId: this.userId,
          avatar: this.avatar,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.el-form-item {
  padding: 0;
  margin: 0;
}
/deep/.el-form-item__error {
  left: 120px;
}
.avatar-uploader {
  width: 100%;
  height: 100%;
}
/deep/.el-upload {
  position: absolute;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  border: none !important;
}
.el-icon-plus:before {
  content: "";
}
.user_box {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}
.user_container {
  transition: all 0.3s;
  left: 0;
  position: absolute;
  display: flex;
  width: 200%;
  height: 100%;
}
.user_left {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.user_top,
.user_bottom {
  flex: 1;
  overflow: scroll;
}
.user_right {
  flex: 1;
  width: 50%;
}
.user_top {
  text-align: center;
  overflow: hidden;
  background-color: #ff7d43;
}
.photo_container {
  display: inline-block;
  position: relative;
  width: 24%;
  padding-bottom: 24%;
  margin-top: 10%;
}
.photo_inner {
  position: relative;
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-sizing: border-box;
  border: 4px solid #fff;
  overflow: hidden;
}
.photo_inner:hover .mack {
  top: 0;
}
.mack {
  top: 100%;
  transition: all 0.2s;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.363);
  z-index: 2;
}
.mack > span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 14px;
}
.photo_inner > img {
  width: 100%;
  height: 100%;
}
.user_bottom--top {
  padding: 10px 20px;
  height: 80%;
}
.user_bottom--bottom {
  cursor: pointer;
  position: relative;
  height: 20%;
  box-sizing: border-box;
  border-top: 2px solid #b7b7b7;
  padding: 0 40px;
  font-size: 14px;
}
.user_bottom--bottom:hover {
  background-color: rgba(243, 242, 242, 0.445);
}
.user_bottom--bottom > span {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.user_bottom--bottom > span:nth-of-type(2) {
  right: 5%;
}
.user_bottom--top > div {
  cursor: pointer;
  height: 25%;
  width: 100%;
  line-height: 40px;
}
.nickName_container {
  font-size: 20px;
}
.email_container {
  cursor: text !important;
  font-size: 14px;
  color: #1d5f5f;
}
.more_container {
  font-size: 14px;
}
.sign_container {
  font-size: 14px;
}
.more_container > span {
  margin-right: 15px;
}
.sign_container > span {
  margin-right: 15px;
}
.change_ps {
  left: -100%;
}
.user_right {
  display: flex;
  flex-direction: column;
}
.password_container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.password_box:nth-child(1) {
  padding: 20px 120px 0 120px;
}
.password_box:nth-child(3) {
  padding: 20px 120px 0 120px;
}

.password_box {
  min-width: 350px;
  text-align: center;
  flex: 1;
  padding: 0 120px 0 120px;
}
.password_box .el-button {
  width: 40% !important;
  height: 50px;
  padding: 0;
}

.password_box .el-button:nth-child(1) {
  float: left;
}
.password_box .el-button:nth-child(2) {
  float: right;
}
.user_top_small {
  display: none;
}
.user_bottom_small {
  width: 100%;
}
.user_bottom_small .password_box {
  padding: 15px;
  min-width: 0;
}
.user_small_up {
  height: 60px;
  text-align: center;
  /* background-color: #ff7d43; */
  /* position: relative; */
}
.user_small_up .photo_container {
  margin-top: 0;
}
</style>
