<template>
  <div
    class="darkmode-ignore recommend"
    v-loading="!ifOver"
    :element-loading-text="lodingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.9)"
    target=".recommend"
  >
    <video-list
      :videoList="videoList"
      v-if="ifOver"
      ref="videoList"
      @toEnd="toEnd"
    ></video-list>
  </div>
</template>
<script>
import http from "@/utils/http.js";
import VideoList from "@/components/VideosList.vue";
export default {
  data() {
    return {
      userName: "",
      videoList: [],
      ifOver: false,
      lodingText: "星际信号接收中，请稍后~",
      videoId: [],
    };
  },
  methods: {
    // 获视频列表
    getVideoList() {
      this.ifOver = false;
      http
        .post("/recommend", { userName: this.userName })
        .then((res) => {
          if (res.data.code === 200) {
            this.videoList = res.data.data.videoList;
            this.ifOver = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toEnd(id) {
      this.videoId.push(id);
      if (this.videoId.length < 7) return;
      this.videoId = [];
      http
        .post("/recommend/more", {
          videoId: this.videoId,
          userName: this.userName,
        })
        .then((res) => {
          if (res.data.code === 200) {
            if (res.data.data.videoInfo instanceof Object) {
              this.videoList.push(...res.data.data.videoInfo);
              this.$refs.videoList.ifDownEnd.downDisabled = false;
            } else {
              window.history.go(0);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    // DPlayer,
    VideoList,
  },
  created() {
    this.userName = sessionStorage.getItem("username") || "";
    this.getVideoList();
  },
};
</script>
<style scoped>
.recommend {
  height: 100%;
  background-color: #f5f5f5;
}
/deep/.el-loading-mask {
  z-index: 1;
}
</style>
