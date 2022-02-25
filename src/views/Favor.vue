<template>
  <div class="video-card-box">
    <section v-if="videoList.length > 0 && networkFlag == 1">
      <favorTable :videoList="videoList" />
    </section>

    <section v-else-if="networkFlag == -1">
      <h1>加载收藏列表失败</h1>
      <h3>错误原因：{{ message }}</h3>
      <div class="reload-button">
        <el-button @click="reload()">重新刷新</el-button>
      </div>
      <img src="https://source.acexy.cn/view/X6Zhlp6" alt />
    </section>

    <section v-else-if="videoList.length == 0 && networkFlag == 1">
      <h1>{{ message }}</h1>
    </section>

    <section v-else-if="videoList.length == 0 && networkFlag == 2">
      <no-login></no-login>
    </section>

    <section v-else>
      <el-skeleton :rows="6" animated />
    </section>
  </div>
</template>
<script>
// import axios from 'axios';
import http from "@/utils/http.js";
import favorTable from "@/components/favor/favor-table.vue";
import { mapMutations } from "vuex";
import NoLogin from "@/components/NoLogin.vue";

export default {
  data() {
    return {
      networkFlag: 0, // 0：加载中， 1 加载成功 ， -1 加载失败  2 没登录
      message: "", // 错误提示信息
      videoList: [], // 视频列表
    };
  },
  components: {
    favorTable,
    NoLogin,
  },
  mounted() {
    this.reload();
  },
  methods: {
    reload() {
      //重新发请求
      this.networkFlag = 0;
      let userName = sessionStorage.getItem("username");
      if (userName) {
        this.userName = userName;
      } else {
        setTimeout(() => {
          this.networkFlag = 2;
          this.message = "你还没有登录，请先登录。";
        }, 200);
        return;
      }
      http
        .post("/favour", {
          userName: this.userName,
        })
        .then((res) => {
          if (res.data.code == 400) {
            this.networkFlag = -1;
            this.message = res.data.data.msg;
          } else {
            this.videoList = res.data.data.favoritesInfoList;
            if (this.videoList.length == 0) {
              this.message = "你还没有收藏视频噢，前往首页查找你喜欢的视频吧~";
            } else {
              this.setFavorNumber(this.videoList.length);
            }
            this.networkFlag = 1;
          }
        })
        .catch((err) => {
          this.networkFlag = -1;
          this.message = err;
        });
    },
    ...mapMutations(["setFavorNumber"]),
  },
};
</script>
<style lang="css" scoped>
section {
  width: 100%;
  height: 500px;
}
.video-card-box {
  width: 100%;
  min-width: 450px;
  display: flex;
  flex-wrap: wrap;
}

.reload-button {
  margin-top: 20px;
}
</style>
