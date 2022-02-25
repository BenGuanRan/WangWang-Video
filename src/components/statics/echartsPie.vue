<template>
  <div class="pie_container" ref="pie"></div>
</template>

<script>
export default {
  props: {
    pieData: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "2%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: true,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "35",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 0, name: "0am-3am" },
              { value: 0, name: "3am-6am" },
              { value: 0, name: "6am-9am" },
              { value: 0, name: "9am-12am" },
              { value: 0, name: "12am-3pm" },
              { value: 0, name: "3pm-6pm" },
              { value: 0, name: "6pm-9pm" },
              { value: 0, name: "9pm-12pm" },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    const vm = this;
    window.addEventListener("resize", function () {
      vm.$echarts.init(vm.$refs.pie).resize();
    });
    this.loadLine();
  },
  methods: {
    loadLine() {
      for (let i in this.pieData) {
        this.option.series[0].data[i].value = this.pieData[i];
      }
      this.$echarts.init(this.$refs.pie).setOption(this.option);
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.loadLine);
  },
};
</script>

<style scoped>
.pie_container {
  width: 100%;
  height: 100%;
}
</style>
