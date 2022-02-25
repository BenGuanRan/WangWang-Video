<template>
  <div class="line_container" ref="line"></div>
</template>

<script>
export default {
  props: {
    lineData: {
      type: Array,
      default: () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.lineData,
            type: "line",
          },
        ],
      },
    };
  },
  mounted() {
    const vm = this;
    window.addEventListener("resize", function () {
      vm.$echarts.init(vm.$refs.line).resize();
    });
    this.loadLine();
  },
  methods: {
    loadLine() {
      this.$echarts.init(this.$refs.line).setOption(this.option);
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.loadLine);
  },
};
</script>

<style scoped>
.line_container {
  width: 100%;
  height: 100%;
}
</style>
