<template>
  <div class="bar_container" ref="bar"></div>
</template>

<script>
export default {
  props: {
    barData: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      time: Date.now(),
      oneTime: 86400000,
      option: {
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.barData,
            type: "bar",
          },
        ],
      },
    };
  },
  mounted() {
    for (let i = 0; i < 7; i++) {
      let myDate = new Date(this.time - this.oneTime * i);
      this.option.xAxis.data.unshift(myDate.getDate() + "日");
    }
    const vm = this;
    window.addEventListener("resize", function () {
      vm.$echarts.init(vm.$refs.bar).resize();
    });
    this.loadLine();
  },
  methods: {
    loadLine() {
      this.$echarts.init(this.$refs.bar).setOption(this.option);
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.loadLine);
  },
};
</script>

<style scoped>
.bar_container {
  width: 100%;
  height: 100%;
}
</style>
