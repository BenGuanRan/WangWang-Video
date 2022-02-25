<template>
  <div class="about">
    <aboutNavbar />
    <aboutSlider ref="abts" />
    <aboutSnap ref="abtn" />
  </div>
</template>
<script>
import aboutNavbar from "@/components/about-navbar";
import aboutSlider from "@/components/about-slider";
import aboutSnap from "@/components/about-snap";
export default {
  data() {
    return {
      scrollClasses: [".about-navbar", ".about-slider-content", ".about-snap"],
    };
  },
  computed: {
    scrollCnt: {
      get() {
        return this.$refs.abtn.scrollCnt;
      },
      set(num) {
        this.$refs.abtn.scrollCnt = num;
      },
    },
  },
  components: {
    aboutNavbar,
    aboutSlider,
    aboutSnap,
  },
  methods: {
    debounce(fn) {
      let timer = null;
      return function (...arg) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...arg), 300);
      };
    },
    listenScroll(e) {
      let state = e.detail || e.wheelDelta;
      if (!state) return;
      if (this.scrollCnt < 2) this.fullChange(state);
      if (this.scrollCnt === 4 && !this.$refs.abtn.finishThree(state)) return;
      this.setSC(state);
      this.scrollClasses
        .map((i) => document.querySelector(i))
        .forEach((j) => {
          j.style.top = `-${Math.max(this.scrollCnt - 1, 0)}00%`;
        });
    },
    setSC(state) {
      let idx = this.$refs.abtn.snapList.length + 1;
      this.scrollCnt -= state / Math.abs(state);
      if (this.scrollCnt < 0) this.scrollCnt = 0;
      if (this.scrollCnt > idx) this.scrollCnt = idx;
      this.$refs.abtn.snapLast = this.scrollCnt === idx;
    },
    fullChange(state) {
      if (state < 0 && !this.scrollCnt) this.$refs.abts.fullFlag = false;
      else if (state > 0 && this.scrollCnt) this.$refs.abts.fullFlag = true;
    },
  },
  mounted() {
    window.addEventListener(
      "mousewheel",
      this.debounce(this.listenScroll),
      false
    );

    ["body", "html"]
      .map((i) => document.querySelector(i))
      .forEach((j) => {
        j.style.overflowY = "hidden";
      });
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/about-public";
.about {
  min-width: $minWid;
  height: 100vh;
}
</style>
