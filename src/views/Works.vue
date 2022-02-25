<template>
  <div class="video-card-box">
    <section v-if="videoList.length > 0 && networkFlag == 1">
      <worksTable :videoList="videoList" />
    </section>

    <section v-else-if="networkFlag == -1">
      <h1>加载发布作品列表失败</h1>
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
import http from "@/utils/http.js";
import NoLogin from "@/components/NoLogin.vue";
import worksTable from "@/components/works/works-table.vue";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      networkFlag: 0, // 0：加载中， 1 加载成功 ， -1 加载失败  2 没登录
      message: "", // 错误提示信息
      videoList: [], // 视频列表
    };
  },
  components: {
    worksTable,
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
        .post("/userwork", {
          userName: this.userName,
        })
        .then((res) => {
          if (res.data.code == 400) {
            this.networkFlag = -1;
            this.message = res.data.data.msg;
          } else if (res.data.code == 200) {
            this.videoList = res.data.data.worksList;
            if (this.videoList.length == 0) {
              this.message = "你还没有发布视频噢~";
            }else{
              this.setWorksNumber(this.videoList.length);
            }
            this.networkFlag = 1;
          }
        })
        .catch((err) => {
          console.log(err);
          this.networkFlag = -1;
          this.message = err;
        });
    },
    ...mapMutations(["setWorksNumber"]),
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
