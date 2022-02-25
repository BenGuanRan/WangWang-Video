<template>
  <main class="about-slider-content">
    <ul
      class="about-slider"
      :class="{ 'full-slider': fullFlag, 'box-slider': !fullFlag }"
    >
      <li
        v-for="item in sliderInfoList"
        :class="!item.id && sdName + '-selected'"
        :key="item.id"
      >
        <div class="about-slider-txt">
          <h1>{{ item.title_1 }}</h1>
          <h1>{{ item.title_2 }}</h1>
          <font>{{ item.content }}</font>
        </div>
        <div class="about-slider-img"></div>
      </li>
      <ul class="about-slider-spots">
        <li
          v-for="item in sliderInfoList"
          :id="sdName + '-spot' + item.id"
          :class="!item.id && sdName + '-whiteP'"
          @click="clickSpot($event)"
          :key="item.id"
        ></li>
      </ul>
    </ul>
  </main>
</template>
<script>
export default {
  data() {
    return {
      timer: null,
      fullFlag: true,
      sliderNow: 0,
      sdName: `about-slider`,
      sliderInfoList: [
        {
          id: 0,
          title_1: "大千世界、风花雪月",
          title_2: "精彩尽在汪汪视频",
          content:
            "汪汪视频是一个由青训营汪汪队开发的、致敬抖音的短视频流媒体平台。这里视频种类多样，应用功能丰富，是消遣休闲的不二之选",
        },
        {
          id: 1,
          title_1: "　",
          title_2: "「字节青训营」-寒假前端场",
          content:
            "我们欢迎所有热爱前端、迫切期望提升自我的同学参与。为你创造一片天地，去探索、挑战、突破。",
        },
        {
          id: 2,
          title_1: "随时随地，开发现代应用",
          title_2: "欢迎使用轻服务",
          content:
            "轻服务提供开箱即用的云服务和多终端可用的 Web IDE，让开发者无需关心服务器搭建、数据库部署、环境配置和线上运维等繁琐之事，只需专注于产品开发本身。",
        },
        {
          id: 3,
          title_1: "从创作笔记📖开始， ",
          title_2: "成为一个极客创作者吧！",
          content:
            "参与青训营第二期笔记创作活动就有机会获得极客装备，心动不如行动，赶快打开你的掘金插件开始创作吧",
        },
      ],
    };
  },
  methods: {
    sliderTo(idx) {
      let sliderLis = document.querySelectorAll("." + this.sdName + ">li");
      let sliderSpots = document.querySelectorAll(
        "." + this.sdName + "-spots>li"
      );
      sliderSpots[this.sliderNow].className = "";
      sliderLis[this.sliderNow].className = "";
      this.sliderNow = idx;
      sliderLis[this.sliderNow].className = this.sdName + "-selected";
      sliderSpots[this.sliderNow].className = this.sdName + "-whiteP";
    },
    sliderNext() {
      let idx = (this.sliderNow + 1) % this.sliderInfoList.length;
      this.sliderTo(idx);
    },
    clickSpot(e) {
      clearInterval(this.timer);
      let reg = /\d+$/;
      let id = parseInt(reg.exec(e.target.id));
      this.sliderTo(id);
      this.timer = setInterval(() => {
        this.sliderNext();
      }, 5680);
    },
  },
  mounted() {
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.sliderNext();
      }, 3680);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/about-public";
$top-margin: calc(50% - 168px);
.about-slider-content {
  height: 100vh;
  position: relative;
  transition: top 0.5s;
  .full-slider {
    width: 100vw;
    min-width: $minWid;
    height: calc(100vh - 122px);
  }
  .box-slider {
    width: calc(100vw - 240px);
    min-width: calc($minWid - 240px);
    height: calc(100vh - 222px);
    border-radius: 2vw;
    background-position-x: -50px !important;
    .about-slider-txt {
      right: 2vw !important;
    }
    .about-slider-spots {
      right: 40vw !important;
    }
  }
  .about-slider {
    margin: 0 auto;
    position: relative;
    top: 122px;
    transition: all, 0.3s;
    background-image: url("../assets/img/qxy_main_banner.png");
    background-size: cover;
    background-position-x: -115px;
    & > li {
      position: absolute;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      transition: opacity 0.75s;
      opacity: 0;
      .about-slider-txt {
        opacity: 0;
        position: absolute;
        top: $top-margin;
        right: $left-margin;
        font-size: 1.66vw;
        line-height: 4.37vw;
        color: #ddfcf9;
        font {
          opacity: 0;
          display: inline-block;
          width: 45vw;
          padding-top: 2vw;
          margin-top: 2vw;
          border-top: solid 0.1vw rgb(57, 87, 89);
          font-size: 1.16vw;
          line-height: 1.75vw;
          color: #7f5bd7;
        }
      }
    }
    .about-slider-selected {
      opacity: 1;
      .about-slider-txt {
        opacity: 1;
        font {
          opacity: 1;
        }
      }
    }
    .about-slider-spots {
      position: absolute;
      top: calc($top-margin + 18vw);
      right: calc($left-margin + 38vw);
      li {
        width: 0.85vw;
        min-width: 5px;
        height: 0.85vw;
        min-height: 5px;
        float: left;
        border: 0.2vw solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        margin-right: 0.9vw;
        cursor: pointer;
      }
      .about-slider-whiteP {
        border-color: #fff;
        background-color: #fff;
      }
    }
  }
}
@media screen and (max-width: 996px) {
  .about-slider-content .about-slider li .about-slider-txt font {
    line-height: 24px;
  }
  .about-slider-content .about-slider .about-slider-spots {
    top: calc($top-margin + 168px);
  }
}
</style>
