<template>
  <div class="publish">
    <div class="publish_header">
      <button class="darkmode-ignore" @click="goBack">
        <i class="el-icon-arrow-left"></i>返回
      </button>
      <h1>发布视频</h1>
    </div>
    <div class="publish-body">
      <publish-video v-if="isVideo" />
    </div>
  </div>
</template>

<script>
import publishVideo from "@/components/publish-video.vue";
export default {
  data() {
    return {
      isVideo: true,
    };
  },
  components: {
    publishVideo,
  },
  methods: {
    goBack() {
      window.history.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.publish {
  width: 100%;
  height: 100%;
  .publish_header {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    height: 60px;
    line-height: 60px;
    button {
      float: left;
      margin: 10px;
      cursor: pointer;
      width: 65px;
      height: 38px;
      border-radius: 5px;
      border: none;
      font-weight: 600;
      color: #fff;
      background-color: #ff7d43;
      text-align: center;
    }
    button:hover {
      background-color: #ff9769;
    }
    h1 {
      display: inline-block;
    }
  }
  .publish-body {
    background-color: #fff;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
  }
}
</style>
