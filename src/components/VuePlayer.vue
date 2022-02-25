<template>
  <!--在视频外面加一个容器-->
  <div class="vue_player darkmode-ignore">
    <div class="darkmode-ignore input_video" ref="video">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        id="my_player"
        :playsinline="true"
        :options="playerOptions"
        @pause="onPlayerPause($event)"
      ></video-player>
    </div>
  </div>
</template>
<script>
export default {
  name: "BusImg",
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    ifPlay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 视频播放
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        sources: [
          {
            type: "",
            src: this.videoUrl, //videoUrl地址
          },
        ],
        cover: this.cover, //你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, //当前时间和持续时间的分隔符
          durationDisplay: true, //显示持续时间
          remainingTimeDisplay: false, //是否显示剩余时间功能
          fullscreenToggle: true, //全屏按钮
        },
      },
    };
  },

  mounted() {
    // this.$refs.video.after
  },
  methods: {
    onPlayerPause(e) {
      console.log(e);
    },
  },
};
</script>
<style scoped>
/* .input_video {
    z-index: 1;
} */
.vue_player {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.vue_player /deep/ video {
  background-color: #000 !important;
  filter: none;
}
</style>
