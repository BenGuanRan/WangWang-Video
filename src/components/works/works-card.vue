<template>
  <el-card class="video-card">
    <div
      class="video-img-box"
      @mouseover="handlePreview(true)"
      @mouseleave="handlePreview(false)"
    >
      <el-button
        class="delete-button"
        type="danger"
        icon="el-icon-delete"
        @click="handleDelete()"
        circle
      ></el-button>

      <a class="can-tap" ref="box">
        <img
          :src="video.cover"
          :alt="video.title"
          v-show="!isPreview"
          ref="img"
        />
        <video
          :src="video.url"
          ref="video"
          autoplay
          loop
          v-show="isPreview"
          :poster="video.cover"
          :title="video.desc"
        ></video>
      </a>

      <div class="darkmode-ignore video-img-text" v-show="!isHover">
        <p class="img-left-text wrap-line1">
           {{video.desc}}
          <!-- <span class="iconfont icon-shoucang favor-icon"></span>
          {{ formatLikes(video.love) }} -->
        </p>
        <p class="video-card-time">{{ timeLength }}</p>
      </div>
      <div class="progress-box">
        <span class="progress-line" ref="progress"></span>
      </div>
    </div>
    <div
      class="video-content-box"
      @mouseover="handleEnter(true)"
      @mouseleave="handleEnter(false)"
    >
      <div class="content-box">
        <a href="#" class="video-title wrap-line2">{{ video.title }}</a>
      </div>

      <div class="video-bottom">
        <div class="flex">
          <p title="发布时间">
            <i class="iconfont icon-shijian"></i
            >{{ formatTime(video.createdAt) }}
          </p>
          <p title="收藏数" class="favor-text">
            <i class="iconfont icon-shoucang1"></i>{{ formatLikes(video.love) }}
          </p>
        </div>
        <!-- <div v-show="isEnter == true">
          <el-button >删除</el-button>
        </div> -->
      </div>
    </div>
  </el-card>
</template>
<script>
// import { mapState } from "vuex";
import http from "@/utils/http.js";

export default {
  data() {
    return {
      isShowMore: false,
      isFavor: true,
      userId: null,
      isHover: false,
      isEnter: false,
      isPreview: false,
      previewTimer: null,
      showTimer: null,
      timeLength: "",
      height: "",
    };
  },
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    let userId = sessionStorage.getItem("userId");
    if (userId) {
      this.userId = userId;
    }
    this.$refs.video.addEventListener("canplay", this.formatTimeLength);
  },
  beforeDestroy() {
    if (this.showTimer) {
      clearInterval(this.showTimer);
      this.showTimer = null;
    }
    if (this.previewTimer) {
      clearTimeout(this.previewTimer);
      this.previewTimer = null;
    }
  },
  methods: {
    formatLikes(likes) {
      // get from video-card
      let numStr = likes.toString().split(".")[0];
      return numStr.length < 5
        ? numStr
        : numStr.slice(0, numStr.length - 4) +
            "." +
            numStr[numStr.length - 4] +
            "w";
    },
    formatTimeLength() {
      this.timeLength = this.$refs.video.duration;
      this.$refs.video.volume = 0;
      var minutes = ("0" + parseInt(this.timeLength / 60, 10).toFixed(0)).slice(
        -2
      );
      var seconds = ("0" + parseInt(this.timeLength % 60, 10).toFixed(0)).slice(
        -2
      );
      this.timeLength = minutes + ":" + seconds; //获取时长
    },
    formatTime(d) {
      d = new Date(d);
      let resDate =
        d.getFullYear() +
        "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + d.getDate()).slice(-2);
      let resTime =
        ("0" + d.getHours()).slice(-2) +
        ":" +
        ("0" + d.getMinutes()).slice(-2) +
        ":" +
        ("0" + d.getSeconds()).slice(-2);
      return resDate + " " + resTime; // 将 发布时间 转成了一个 格式化的时间字符串  yyyy-MM-dd HH:mm:ss
    },
    trackProgress() {
      //计算并修改进度条
      let duration = this.$refs.video.duration;
      let progress = this.$refs.video.currentTime;
      this.$refs.progress.style.width =
        (parseFloat(progress) / parseFloat(duration)) * 100 + "%";
    },
    handleEnter(flag) {
      this.isEnter = flag;
    },
    handlePreview(flag) {
      this.isHover = flag;
      this.isEnter = flag;
      if (flag) {
        //进入
        if (this.previewTimer) {
          clearTimeout(this.previewTimer);
        }
        this.previewTimer = setTimeout(() => {
          if (this.$refs.img.height != 0 && this.height == "") {
            this.height = this.$refs.img.height;
          }
          this.isPreview = true;
          if (this.height != "") {
            this.$refs.video.style.height = this.height + "px";
          }
          if (this.$refs.video) {
            this.$refs.video.play();
            this.$refs.video.volume = 1;
          }
          if (this.showTimer) {
            clearInterval(this.showTimer);
            this.showTimer = null;
          }
          this.showTimer = setInterval(() => {
            this.trackProgress();
          }, 500);
        }, 500);
      } else {
        //离开
        this.isPreview = false;
        this.height = "";
        if (this.showTimer) {
          clearInterval(this.showTimer);
          this.showTimer = null;
          this.$refs.video.pause();
        }
        if (this.previewTimer) {
          clearTimeout(this.previewTimer);
          this.$refs.video.volume = 0;
        }
      }
    },
    handleDelete() {
      this.$confirm("此操作将永久删除该视频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("deleteVideo", this.video._id);

          http
            .post("/userwork/delete", {
              videoId: this.video._id,
            })
            .then((res) => {
              if (res.data.code == 400) {
                this.$message({
                  type: "error",
                  message: res.data.data.msg,
                });
              } else {
                this.$message({
                  type: "success",
                  message: "删除成功",
                });
              }
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
/* 清除浮动 */
.clearfix {
  clear: both;
}

/* 多行文本限制 */
.wrap-line2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.wrap-line1 {
  overflow: hidden;
  text-overflow: ellipsis;
}

a {
  text-decoration: none;
}

.yellow {
  color: rgb(231, 231, 21);
}

.can-tap {
  cursor: pointer;
}

// 深度作用选择器
::v-deep .el-card__body {
  padding: 0;
}
.flex {
  display: flex;
  margin-left: 5px;
}



// 兼容移动端的响应式
@media (min-width: 320px) {
  .video-card {
    width: 55%;
  }
}
@media (min-width: 375px) {
  .video-card {
    width: 69%;
  }
}
@media (min-width: 425px) {
  .video-card {
    width: 80%;
  }
}
@media (min-width: 500px) {
  .video-card {
    width: 100%;
  }
}




/* 视频卡片 */
.video-card {
  display: block;
  margin-top: 15px;
  overflow: hidden;
  padding: 0;
  border-radius: 5px;
  .video-img-box:hover {
    .delete-button {
      transform: rotate(0deg);
      top: 0px;
    }
  }
  .video-img-box {
    width: 100%;
    height: 100%;
    max-height: 80vh;
    position: relative;
    margin: 0;
    overflow: hidden;
    display: inline-block;
    .delete-button {
      position: absolute;
      top: -50px;
      right: 1px;
      z-index: 999;
      transition: all 0.5s;
      transform: rotate(180deg);
    }

    img {
      width: 100%;
      height: 100%;
      max-height: 80vh;
      transition: all 0.5s;
      opacity: 0.95;
    }
    video {
      width: 100%;
      max-height: 80vh;
      background: black 50% 50% no-repeat;
      transition: all 0.5s;
      opacity: 0.95;
    }
    img:hover {
      /* 放大特效 */
      transform: scale(1.5, 1.5);
    }
    .video-img-text {
      display: flex;
      position: absolute;
      bottom: 5px;
      width: 100%;
      justify-content: space-between;
      //  图片左下方： 播放量 || 赞同
      .img-left-text {
        display: block;
        width: 70%;
        height: 30px;
        line-height: 30px;
        font-size: large;
        color: rgb(255, 255, 255);
        margin-left: 8px;
        opacity: 0.9;
      }
      .favor-icon {
        color: yellow;
        font-size: larger;
      }
      //  时长
      .video-card-time {
        display: block;
        height: 20px;
        font-size: large;
        color: rgb(255, 255, 255);
        opacity: 0.9;
        margin-right: 5px;
      }
    }
    .progress-box {
      position: absolute;
      bottom: 1px;
      width: 100%;
      height: 2px;
      z-index: 99;
      .progress-line {
        display: block;
        background-color: rgb(89, 0, 255);
        height: 3px;
        width: 0%;
      }
    }
  }
  .video-content-box {
    width: 100%;
    
    .content-box {
      display: block;
      width: 100%;
      top: 0;
      color: white;
      margin-left: 8px;
      opacity: 0.9;
      // 视频标题
      .video-title {
        margin-top: 5px;
        margin-bottom: 5px;
        color: #222;
        font-weight: bold;
        font-size: 1.2em;
        text-overflow: ellipsis;
        &:hover{
          color:#111;
        }
      }

    }
    .video-bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;

      p {
        font-size: 1.2rem;
        opacity: 0.95;
        line-height: 40px;
      }
      .iconfont {
        font-size: 1.1em;
      }
      .favor-text {
        margin-left: 1vw;
        .iconfont {
          color: rgba(236, 236, 26, 0.925);
        }
      }

      // 关注的按钮
      .video-card-menu {
        float: right;
        cursor: pointer;
      }
      // 视频荣誉标签
      .honor {
        display: inline-block;
        font-size: small;
        color: red;
        text-align: center;
        background-color: #fff0ea;
      }

      .video-release {
        font-size: small;
        color: grey;
      }
    }
  }
}

.video-menu-item {
  float: right;
  position: absolute;
  width: 200px;
  overflow: hidden;
  transition: all 1s;
  background-color: #fff;
}

/* 关注收藏的按钮 */
.el-icon-star-on::before,
.el-icon-star-off::before {
  font-size: 2rem;
}

/* 阿里巴巴图标库 */
@font-face {
  font-family: "iconfont"; /* Project id 3148618 */
  src: url("//at.alicdn.com/t/font_3148618_mjp3oji3mfj.woff2?t=1644147405358")
      format("woff2"),
    url("//at.alicdn.com/t/font_3148618_mjp3oji3mfj.woff?t=1644147405358")
      format("woff"),
    url("//at.alicdn.com/t/font_3148618_mjp3oji3mfj.ttf?t=1644147405358")
      format("truetype"),
    url("//at.alicdn.com/t/font_3148618_mjp3oji3mfj.svg?t=1644147405358#iconfont")
      format("svg");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-24gl-play:before {
  content: "\ea6d";
}

.icon-shoucang:before {
  content: "\e602";
}

.icon-shoucang1:before {
  content: "\e8c6";
}

.icon-shijian:before {
  content: "\e64d";
}
</style>