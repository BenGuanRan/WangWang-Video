<template>
  <div ref="video-table">
    <el-row
      v-for="row in Array(rows)
        .fill(0)
        .map((_, i) => i)"
      :key="row"
      type="flex"
    >
      <el-col
        v-for="col in Array(cols)
          .fill(0)
          .map((_, i) => i)"
        :key="col"
        :span="24 / cols"
      >
        <video-card
          v-if="videoList[row * cols + col]"
          :id="row * cols + col"
          :width="cardWidth"
          :likes="videoList[row * cols + col].love"
          :title="videoList[row * cols + col].title"
          :videoUrl="videoList[row * cols + col].url"
          :coverUrl="videoList[row * cols + col].cover"
          :userName="videoList[row * cols + col].authorNickName"
          :userId="videoList[row * cols + col].author"
          :createTime="videoList[row * cols + col].createdAt"
          :avatar="videoList[row * cols + col].authorAvatar"
        />
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="4">
        <p style="font-size: 16px; font-weight: bold" ref="video-table-loading">
          <i class="el-icon-loading"></i>
          加载中...
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import http from "@/utils/http.js";
import videoCard from "@/components/video-card.vue";

export default {
  components: {
    videoCard,
  },
  data() {
    return {
      rows: 0,
      cols: 0,
      width: 0,
      videoList: [],
      observer: null,
    };
  },
  methods: {
    async resize() {
      this.width = this.$refs["video-table"].offsetWidth;
      this.cols = Math.round(this.width / 270);
      const response = await http.post("/search/video", {
        target: "",
        count: this.rows * this.cols,
      });
      const list = response.data.data.videoList;
      this.videoList = [];
      for (let i = 0; i < this.rows * this.cols; i++) {
        if (list[i]) {
          this.videoList.push(list[i]);
        }
      }
    },
  },
  mounted() {
    this.resize();
    window.onresize = () => this.resize();
    this.observer = new IntersectionObserver(
      () => {
        this.rows += 3;
        this.resize();
      },
      {
        threshold: 0.1,
      }
    );
    this.observer.observe(this.$refs["video-table-loading"]);
  },
  beforeDestroy() {
    this.resize = () => {};
  },
  computed: {
    cardWidth() {
      return (this.width / this.cols) * 0.9;
    },
  },
};
</script>
