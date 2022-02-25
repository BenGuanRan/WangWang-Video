<template>
  <div class="videos_list" ref="list">
    <div class="more">
      <span class="el-icon-more"></span>
    </div>
    <div class="more_inner">
      <h1>{{ title }}</h1>
      <h2>
        <span>@</span>
        {{ nickName }}
      </h2>
      <p>{{ this.description }}</p>
    </div>
    <div class="loding" v-show="showLoading">
      <span class="el-icon-loading"></span>
    </div>
    <div
      class="favor"
      :class="{ 'el-icon-star-on': this.ifFavor, 'el-icon-star-off': !this.ifFavor }"
      @click="favor"
    >
      <div class="favor_num">{{ this.favorNum }}</div>
    </div>
    <ul class="btn_container">
      <li class="btn_last" :class="ifUpEnd" @click="mouseChange(-1)"></li>
      <li class="btn_next" :class="ifDownEnd" @click="mouseChange(1)"></li>
    </ul>
    <ul
      class="container"
      ref="con"
      :class="myClass"
      @touchstart="touchstart"
      @touchmove="touchmove($event)"
      @mousewheel="mouseChange($event)"
    >
      <li class="list" v-for="(item, index) in this.videoList" :key="index">
        <vue-player
          v-if="item.ifPlay"
          :videoUrl="item.videoUrl"
          :cover="item.cover"
          :ifPlay="item.ifPlay"
        ></vue-player>
      </li>
    </ul>
  </div>
</template>
<script>
import VuePlayer from "@/components/VuePlayer.vue";
import http from "../utils/http";
export default {
  data() {
    return {
      token: "",
      userId: "",
      myClass: {
        if_have_transition: false,
      },
      ifUpEnd: {
        upDisabled: true,
      },
      ifDownEnd: {
        downDisabled: false,
      },
      con: {},
      list: {},
      nowIndex: 0,
      lastIndex: 0,
      liNum: 0,
      liClassName: {
        clearTransition: false,
      },
      height: 0,
      flag: true, // 记录节流标记
      favorFlag: true, // 记录节流标记
      ifFavor: false,
      favorNum: 0,
      title: "",
      nickName: "",
      description: "",
      showLoading: false,
      startX: 0,
      startY: 0,
    };
  },
  components: {
    VuePlayer,
  },
  props: {
    videoList: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.userId = sessionStorage.getItem("userId");
    this.getMessage();
    this.con = this.$refs.con;
    this.list = this.$refs.list;
    this.liNum = this.videoList.length;
    this.height = this.list.offsetHeight;
    this.con.style.height = this.height * 100 + "px";
    this.resize();
    // this.box.addEventListener('scroll', this.handleScroll, true);
    var self = this;
    // 监听键盘上下
    // 节流
    document.addEventListener(
      "keyup",
      this.throttle(function (e) {
        if (e.keyCode == 38) self.lastVideo();
        if (e.keyCode == 40) self.nextVideo();
        // if (e.keyCode == 32) self.videoList[self.nowIndex].ifPlay = false
      }, 400)
    );
    window.addEventListener("resize", this.resize);
  },
  watch: {
    nowIndex(newValue, oldValue) {
      // 上一个视频喜欢是否被修改
      // const ifChangeFavor = this.ifFavor != this.videoList[oldValue].isLove;
      this.lastIndex = oldValue;
      this.nowIndex = newValue;
      if (newValue === this.videoList.length - 1) this.ifDownEnd.downDisabled = true;
      else this.ifDownEnd.downDisabled = false;
      if (newValue === 0) this.ifUpEnd.upDisabled = true;
      else this.ifUpEnd.upDisabled = false;
      this.getMessage();
      console.log(this.nowIndex + "/" + this.videoList.length);
      if (this.nowIndex >= this.videoList.length - 12) {
        this.$emit("toEnd", this.videoList[newValue].videoId);
        this.liNum++;
        this.resize();
      }
    },
    ifDownEnd: {
      handler(newValue, oldValue) {
        if (newValue.downDisabled) {
          this.showLoading = true;
        } else this.showLoading = false;
        oldValue;
      },
      deep: true,
    },
  },
  created() {},
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    // 自适应函数
    resize() {
      this.myClass.if_have_transition = false;
      this.height = this.$refs.list.offsetHeight;
      this.con.style.height = this.height * 100 + "px";
      this.con.children.forEach((i) => {
        i.style.height = this.height + "px";
      });
      this.myClass.if_have_transition = true;
    },
    // 节流函数
    throttle(fn, delay) {
      let flag = true;
      return function () {
        if (!flag) {
          return;
        }
        flag = false;
        setTimeout(() => {
          fn.apply(this, arguments);
          flag = true;
        }, delay);
      };
    },
    nextVideo() {
      if (this.nowIndex >= this.videoList.length - 1) return;
      this.nowIndex++;
      this.moveNode(this.nowIndex - 1, this.nowIndex);
    },
    lastVideo() {
      this.ifDownEnd.downDisabled = false;
      if (this.nowIndex === 0) {
        return;
      }
      this.nowIndex--;
      this.moveNode(this.nowIndex + 1, this.nowIndex);
    },
    moveNode(lastIndex, nowIndex) {
      this.myClass.if_have_transition = true;
      this.con.style.top = -1 * nowIndex * 100 + "%";
      this.videoList[lastIndex].ifPlay = false;
      this.videoList[nowIndex].ifPlay = true;
      // toward：0向上1向下
    },
    touchstart(e) {
      // 如果你要阻止点击事件，请反注释下一行代码
      // e.preventDefault()
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    },
    touchmove(e) {
      // e.preventDefault()
      this.moveX = e.touches[0].clientX;
      this.moveY = e.touches[0].clientY;
      if (this.startY - this.moveY >= 100) {
        this.nextVideo();
      }
      if (this.startY - this.moveY <= -100) {
        this.lastVideo();
      }
    },
    mouseChange(e) {
      if (!this.flag) {
        return;
      }
      this.flag = false;
      let self = this;
      setTimeout(function () {
        if (e.deltaY < 0 || e < 0) {
          self.lastVideo();
        } else if (e.deltaY > 0 || e > 0) {
          self.nextVideo();
        }
        self.flag = true;
      }, 500);
    },
    // 控制收藏
    favor() {
      if (this.token && this.userId) {
        // 点赞防抖
        if (!this.favorFlag) {
          return;
        }
        this.favorFlag = false;
        let self = this;
        setTimeout(function () {
          self.ifFavor = !self.ifFavor;
          if (self.ifFavor) self.favorNum++;
          else self.favorNum--;
          self.favorFlag = true;
          http
            .post(`/favour/${!self.ifFavor ? "delete" : "add"}`, {
              videoId: self.videoList[self.nowIndex].videoId,
              userId: self.userId,
            })
            .then(() => {
              if (self.ifFavor) self.videoList[self.nowIndex].love++;
              else self.videoList[self.nowIndex].love--;
              self.videoList[self.nowIndex].isLove = !self.videoList[self.nowIndex]
                .isLove;
            })
            .catch((err) => {
              console.log(err);
            });
        }, 500);
      } else {
        this.$EventBus.$emit("otherLogin");
      }
    },
    getMessage() {
      this.ifFavor = this.videoList[this.nowIndex].isLove;
      this.favorNum = this.videoList[this.nowIndex].love;
      this.title = this.videoList[this.nowIndex].title;
      this.nickName = this.videoList[this.nowIndex].authorNickName;
      this.description = this.videoList[this.nowIndex].description;
    },
    // js监听窗口大小
  },
};
</script>

<style>
.videos_list {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: #000;
  list-style: none;
  position: relative;
}
.videos_list:hover .btn_container {
  display: inline-block;
}
.btn_container {
  opacity: 0.5;
  transition: all 0.5s;
  cursor: pointer;
  display: none;
  position: absolute;
  overflow: hidden;
  top: 30%;
  right: 15px;
  z-index: 2;
  width: 36px;
  height: 80px;
  border-radius: 36px;
  background-color: #34343f;
}
.btn_container:hover {
  opacity: 0.8;
}
.btn_container > li {
  text-align: center;
  line-height: 40px;
  transition: all 0.5s;
}
.btn_container > li:after {
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: #fff;
  border: 3px solid #fff;
  border-radius: 5px;
  transition: all 0.2s;
}
.btn_container:hover .btn_last:after {
  background-color: transparent;
  transform: rotate(45deg);
  border-bottom: 3px solid transparent;
  border-right: 3px solid transparent;
  width: 10px;
  height: 10px;
}
.btn_container:hover .btn_next:after {
  background-color: transparent;
  transform: rotate(45deg);
  border-top: 3px solid transparent;
  border-left: 3px solid transparent;
  width: 10px;
  height: 10px;
}
.loding {
  width: 38px;
  height: 38px;
  position: absolute;
  z-index: 2;
  text-align: center;
  line-height: 38px;
  color: #fff;
  font-size: 20px;
  right: 15px;
  top: 30%;
  transform: translateY(-100%);
}
.container {
  /* display: flex; */
  flex-direction: column;
  top: 0;
  width: 100%;
  list-style: none;
  position: absolute;
}
.list {
  overflow: hidden;
}
.if_have_transition {
  transition: all 0.3s;
}
.input_video {
  height: 100% !important;
}
.video-player {
  height: 100%;
}
.video-js {
  height: 100%;
}
video {
  height: 100%;
}
.upDisabled {
  cursor: not-allowed;
  opacity: 0.2;
  visibility: none;
}
.downDisabled {
  cursor: not-allowed;
  opacity: 0.2;
  visibility: none;
}
.favor {
  display: none !important;
  position: absolute;
  color: rgba(255, 0, 0, 0.5);
  width: 38px;
  height: 38px;
  top: 30%;
  right: 15px;
  z-index: 2;
  transition: all 0.2s;
  cursor: pointer;
  transform: translateY(100px);
  line-height: 36px !important;
  text-align: center;
  font-size: 36px;
}
.videos_list:hover .favor {
  display: inline-block !important;
}
.favor:hover {
  color: #f61713;
  font-size: 39px;
}
.favor_num {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.521);
}
.favor:hover .favor_num {
  color: #fff;
}
.more {
  transition: all 0.2s;
  opacity: 0.5;
  position: absolute;
  width: 36px;
  height: 36px;
  z-index: 3;
  background-color: #fff;
  right: 15px;
  top: 30%;
  transform: translateY(190px);
  border-radius: 50%;
  text-align: center;
  line-height: 36px;
  background-color: #34343f;
  color: #fff;
  display: none;
  cursor: pointer;
}
.more:hover {
  opacity: 0.8;
  border-radius: 0;
}
.more:hover + .more_inner {
  padding-left: 10px;
  right: 0;
  opacity: 0.8;
  position: absolute;
  width: 100%;
  height: 150px;
  background-color: #34343f;
  top: 100%;
  transform: translateY(-100%);
}
.more_inner {
  color: #fff;
  overflow: hidden;
  box-sizing: border-box;
  opacity: 0.5;
  transform: translateY(190px);
  position: absolute;
  transition: all 0.2s;
  width: 1px;
  height: 1px;
  right: 15px;
  top: 30%;
  background-color: #34343f;
  z-index: 2;
}
.videos_list:hover .more {
  display: inline-block !important;
}
.more_inner > h1 {
  margin-top: 10px;
}
.more_inner > h2 {
  font-size: 16px;
  margin: 10px 0;
}
.more_inner > h2 > span {
  color: #ff5003;
}
.more_inner > p {
  font-size: 14px;
}
</style>
