<template>
  <!--视频框宽高比4:3,卡片宽高比1.146~1.129(7/5~6/5)-->
  <div style="padding: 10px; cursor: pointer" ref="card-container">
    <el-card
      shadow="hover"
      :body-style="{
        padding: '0px',
        width: width + 'px',
        height: (width * 7) / 5 + 'px',
      }"
    >
      <div
        class="video-container"
        @mouseenter="preview()"
        @mouseleave="leavePreview()"
        @click="dialogVisible = true"
      >
        <div class="video-player" v-show="onPreview">
          <video :ref="'videoCard' + id" width="100%" muted loop>
            <source :src="videoUrl" type="video/mp4" />
          </video>
        </div>
        <div class="a" v-show="!onPreview">
          <img :src="coverUrl" />
          <div class="text">
            <div class="text-item">
              <i class="el-icon-star-off" />
              {{ formatLikes(likes) }}
            </div>
            <div class="text-item">{{ timeLength }}</div>
          </div>
        </div>
      </div>
      <div class="video-info">
        <a @click="dialogVisible = true" class="title">{{ title }}</a>
        <div class="create-info">
          <a class="creator-info" href>
            <img class="avatar" :src="avatar" />
            <span class="user-name">{{ userName }}</span>
          </a>
          <span class="create-time">{{ formatCreateTime(createTime) }}</span>
        </div>
      </div>
    </el-card>
    <el-dialog
      class="video-dialog"
      :title="title"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      top="5vh"
      width="70%"
      :modal="!(this.$store.state.theme === 'theme-dark')"
    >
      <video class="dialog-video" controls>
        <source :src="videoUrl" type="video/mp4" />
      </video>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    // 卡片id
    id: {
      type: Number,
      default: 0,
    },
    // 封面图url
    coverUrl: {
      type: String,
      default:
        "http://wangwang-video.oss-cn-beijing.aliyuncs.com/2022-11-9/admin/1644378949882_6f0f71d8.png",
      required: false,
    },
    // 视频预览url（hover播放）
    videoUrl: {
      type: String,
    },
    // 收藏数
    likes: {
      type: Number,
      default: 0,
      required: false,
    },
    // TODO: 视频时间
    durationTime: {
      type: Number,
      default: 0,
      required: false,
    },
    // 标题
    title: {
      type: String,
      default: "加载中...",
      required: false,
    },
    // TODO: 作者头像
    avatar: {
      type: String,
      default:
        "http://wangwang-video.oss-cn-beijing.aliyuncs.com/2022-11-9/admin/1644378669788_b9e3401a.png",
      required: false,
    },
    // TODO: 作者名称
    userName: {
      type: String,
      default: "authorName",
      required: false,
    },
    // 作者id
    userId: {
      type: String,
      default: "id",
      required: false,
    },
    // 发布时间
    createTime: {
      type: String,
      default: "2022-01-19T14:06:25.693Z",
      required: false,
    },
    // 卡片宽度，用于响应式
    width: {
      type: Number,
      default: undefined,
      required: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      onPreview: false,
      player: null,
      timeLength: '',
    };
  },
  methods: {
    formatTimeLength() {
      this.timeLength = this.$refs["videoCard" + this.id].duration;
      var minutes = ("0" + parseInt(this.timeLength / 60, 10).toFixed(0)).slice(
        -2
      );
      var seconds = ("0" + parseInt(this.timeLength % 60, 10).toFixed(0)).slice(
        -2
      );
      this.timeLength = minutes + ":" + seconds;
    },
    formatLikes(likes) {
      let numStr = likes.toString().split(".")[0];
      return numStr.length < 5
        ? numStr
        : numStr.slice(0, numStr.length - 4) + "." + numStr[numStr.length - 4] + "w";
    },
    formatDuration(durationTime) {
      return (
        Math.floor(durationTime / 60) +
        ":" +
        (durationTime % 60 < 10 ? "0" : "") +
        (durationTime % 60)
      );
    },
    formatCreateTime(createTime) {
      const date = new Date(createTime),
        now = new Date();
      if (now.getFullYear() - date.getFullYear()) {
        return now.getFullYear() - date.getFullYear() + "年前";
      } else if (now.getMonth() - date.getMonth()) {
        return now.getMonth() - date.getMonth() + "月前";
      } else if (now.getDate() - date.getDate()) {
        return now.getDate() - date.getDate() + "天前";
      } else if (now.getHours() - date.getHours()) {
        return now.getHours() - date.getHours() + "小时前";
      } else if (now.getMinutes() - date.getMinutes()) {
        return now.getMinutes() - date.getMinutes() + "分钟前";
      } else {
        return "刚刚";
      }
    },
    preview() {
      this.onPreview = true;
      this.player.play();
    },
    leavePreview() {
      this.onPreview = false;
      this.player.pause();
    },
  },
  mounted() {
    this.player = this.$refs["videoCard" + this.id];
    this.$refs["videoCard" + this.id].addEventListener("canplay", this.formatTimeLength);
  },
};
</script>

<style scoped lang="scss">
.a {
  position: relative;
  height: 100%;
  background-color: #000;
}
::v-deep video {
  background-color: #000;
}
.a > img {
  font-size: 0;
  position: absolute;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  filter: none;
}
.video-container {
  width: 100%;
  height: 60%;
  position: relative;
  overflow: hidden;
  .video-player {
    display: flex;
    align-items: center;
  }
  .text {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .text-item {
      margin: 5px 10px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
  }
  .img-container {
    position: relative;
    height: 100%;
    img {
      position: absolute;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
.video-info {
  width: 100%;
  height: 40%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #404040;
    text-decoration: inherit;
    line-height: 24px;
    &:hover {
      color: #000;
    }
  }
  .create-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #404040;
    .creator-info {
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: inherit;
      .avatar {
        border-radius: 50%;
        height: 35px;
        width: 35px;
      }
      .user-name {
        margin-left: 5px;
        color: #606060;
        font-weight: bold;
        &:hover {
          color: red;
        }
      }
    }
  }
}
.dialog-video {
  width: 100%;
  max-height: 72.5vh;
}
</style>
