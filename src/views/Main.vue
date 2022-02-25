<template>
  <div id="main">
    <login
      :ifShow="this.ifShow"
      @childrenChange="(a) => (this.ifShow = a)"
      @hasLogin="hasLogin"
    ></login>
    <el-container>
      <el-aside :width="sideWidth">
        <el-menu
          router
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          background-color="#f1f2f5"
          text-color="#909195"
          active-text-color="#000000"
          style="height: 100%"
          :collapse="ifCollapse"
          :collapse-transition="false"
        >
          <div class="darkmode-ignore logo">
            <div
              class="logo_inner"
              :class="!ifCollapse ? 'logo_img' : 'logo_img_s'"
            ></div>
          </div>
          <h1 class="collapse_btn" @click="handleCollapse">
            <i class="el-icon-d-arrow-right" v-if="ifCollapse"></i>
            <i class="el-icon-d-arrow-left" v-else></i>
          </h1>
          <el-menu-item index="home">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="recommend">
            <i class="el-icon-thumb"></i>
            <span slot="title">推荐</span>
          </el-menu-item>
          <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>我的</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="statistics" @click="limit">
                <i class="el-icon-info"></i>
                <span slot="title">信息概览</span>
              </el-menu-item>
              <el-menu-item index="favor" @click="limit">
                <i class="el-icon-star-off"></i>
                <span slot="title">收藏 {{$store.state.favorNumber}}</span>
              </el-menu-item>
              <el-menu-item index="works" @click="limit">
                <i class="el-icon-files"></i>
                <span slot="title">我的发布 {{$store.state.worksNumber}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header :height="headerHeight">
          <div class="head_inner" v-show="ifHidden">
            <button
              class="darkmode-ignore"
              :class="ifSmall ? 'btnsmall el-icon-s-custom' : 'login_btn'"
              @click="login"
              v-if="!ifLogin"
            >
              <span v-show="!ifSmall">登录 / 注册</span>
            </button>
            <button
              class="darkmode-ignore"
              :class="ifSmall ? 'btnsmall el-icon-s-custom' : 'login_btn'"
              @click="logout"
              v-else
            >
              <span v-show="!ifSmall">退出登录</span>
            </button>
            <button
              class="darkmode-ignore"
              :class="ifSmall ? 'btnsmall el-icon-upload' : 'login_btn'"
              @click="publishVideo"
            >
              <span v-show="!ifSmall">发布视频</span>
            </button>
            <button
              class="darkmode-ignore"
              :class="ifSmall ? 'btnsmall ' : 'theme_btn'"
              @click="changeTheme"
            >
              <i v-if="ifLight" class="el-icon-moon"></i>
              <i v-else class="el-icon-sunny"></i>
            </button>
            <el-link @click="aboutUs" :class="ifSmall ? 'linksmall' : 'about_btn'"
              >关于我们</el-link
            >
          </div>
          <div
            class="hidden_btn"
            :class="{ 'el-icon-arrow-up': upDown, 'el-icon-arrow-down': !upDown }"
            @click="handleHidden"
          ></div>
        </el-header>

        <el-main>
          <router-view ref="c" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  data() {
    return {
      ifShow: false, // 默认不显示
      ifLogin: false,
      sideWidth: "200px",
      ifCollapse: false,
      headerHeight: "60px",
      ifHidden: true,
      upDown: true,
      activeMenu: "recommend",
      ifSmall: false,
      ifLight: true,
    };
  },
  mounted() {
    this.ifLight = localStorage.getItem("wangwang-theme") === "theme-light";
    this.$EventBus.$on("otherLogin", () => {
      this.login();
    });
    this.activeMenu = this.$route.name.toLowerCase();
    if (sessionStorage.getItem("token")) {
      this.ifLogin = true;
    }
    if (window.innerWidth < 900) {
      this.ifCollapse = true;
      this.sideWidth = "60px";
      this.ifSmall = true;
    }
  },
  methods: {
    login() {
      this.ifShow = true;
    },
    logout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "狠心离开",
        cancelButtonText: "我点错了",
        type: "warning ",
      })
        .then(() => {
          this.ifLogin = false;
          this.$message({
            showClose: true,
            message: "呜呜呜qwq",
          });
          sessionStorage.clear();
          window.history.go(0);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "谢少侠不杀之恩，小的感激涕零~",
          });
        });

      localStorage.removeItem("token");
    },
    hasLogin() {
      this.ifLogin = true;
      this.ifShow = false;
    },
    publishVideo() {
      if (sessionStorage.getItem("token")) this.$router.push("/publish");
      else this.ifShow = true;
    },
    clickFavor() {
      if (sessionStorage.getItem("token")) this.$router.push("/main/favor");
      else this.ifShow = true;
    },
    // 控制菜单缩放
    handleCollapse() {
      if (this.ifCollapse) {
        (this.ifCollapse = false), (this.sideWidth = "200px");
      } else {
        this.ifCollapse = true;
        this.sideWidth = "60px";
      }
    },
    handleHidden() {
      this.upDown = !this.upDown;
      this.ifHidden = !this.ifHidden;
      if (this.ifHidden) this.headerHeight = "60px";
      else this.headerHeight = "25px";
      setTimeout(this.reset, 0);
    },
    reset() {
      this.$refs.c.$refs.videoList.resize();
    },
    aboutUs() {
      this.$router.push("/about");
    },
    limit() {
      if (this.verfyLogin()) return;
      this.login();
    },
    // 检验是否登录
    verfyLogin() {
      if (sessionStorage.getItem("token")) return true;
      return false;
    },
    changeTheme() {
      this.ifLight = !this.ifLight;
      this.$store.commit("changeTheme");
    },
  },
  components: {
    Login,
  },
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
  background-color: #f5f5f5;
}
.el-header {
  line-height: 59px;
  padding: 0 30px;
  border-bottom: 1px solid rgb(238, 236, 236) !important;
  position: relative;
  background-color: #f5f5f5;
}
.head_inner {
  width: 100%;
  height: 100%;
}
.el-menu {
  border-right: none;
}
.el-menu img {
  margin-top: 15px;
}
.logo {
  padding: 10px;
  display: block;
  height: 70px;
  text-align: center;
  line-height: 40px;
  overflow: hidden;
}
.logo_inner {
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
}
.logo_img {
  background-image: url(../assets/img/logo.png);
}
.logo_img_s {
  background-image: url(../assets/img/logo_s.png);
}
.el-menu-item:hover {
  background-color: #f1f2f5 !important;
}
.el-header {
  padding: 0;
}
.login_btn {
  cursor: pointer;
  float: right;
  margin: 10px 20px 0 0;
  width: 104px;
  height: 38px;
  border-radius: 5px;
  border: none;
  font-weight: 600;
  color: #fff;
  background-color: #ff7d43;
}
.theme_btn {
  @extend .login_btn;
  width: 52px;
}
.login_btn:hover {
  background-color: #ff9769;
}
.collapse_btn {
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  font-size: 18px;
  background-color: rgb(230, 227, 227);
}
.el-aside {
  overflow: hidden;
}
.hidden_btn {
  position: absolute;
  text-align: center;
  background-color: #e6e3e3;
  width: 60px;
  height: 20px;
  line-height: 20px;
  left: 50%;
  top: 100%;
  color: #fff;
  transform: translate(-50%, -100%);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: rgba(0, 0, 0, 0.336);
  cursor: pointer;
}
.hidden_btn:hover {
  background-color: rgba(0, 0, 0, 0.623);
}
.about_btn {
  margin-top: 15px;
  margin-right: 30px;
  float: right;
  height: 30px;
  font-weight: bold;
  font-size: 16px;
}
::v-deep .el-submenu__title:hover {
  background-color: #f1f2f5 !important;
}
.btnsmall {
  cursor: pointer;
  float: right;
  margin: 10px 20px 0 0;
  width: 40px;
  height: 38px;
  border-radius: 50%;
  border: none;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  background-color: #ff7d43;
}
.linksmall {
  float: right;
  margin-right: 20px;
}
</style>
