<template>
  <div class="video_player">
    <div id="dplayer"></div>
  </div>
</template>

<script>
import DPlayer from "dplayer";

export default {
  mounted() {
    this.initPlayer(); // 初始化播放器
  },
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    initPlayer() {
      const dp = new DPlayer({
        container: document.getElementById("dplayer"),
        video: {
          url: this.url,
        },
      });
      dp.play();
    },
  },
};
</script>
<style scoped>
.video_player {
  height: 100%;
}
#dplayer {
  height: 100%;
}
</style>
