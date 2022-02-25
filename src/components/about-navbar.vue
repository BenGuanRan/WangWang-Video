<template>
  <nav class="about-navbar" :style="{ height: barHight }">
    <div class="about-navbar-left-float">
      <a href="http://ww.aran.cc/#/main/recommend">
        <img src="../assets/img/logo.png" alt />
      </a>
    </div>
    <ul class="about-navbar-right-float">
      <li
        v-for="li in liList"
        :key="li.id"
        class="about-navbar-item"
        @mouseleave.self="closeColl($event)"
      >
        <a @mousemove.self="openColl($event)" :href="li.name">
          {{ li.val }}
          <arr v-if="collMap.indexOf(li.id) !== -1" class="arr-icon" />
        </a>
        <ul v-if="collMap.indexOf(li.id) !== -1">
          <template v-for="(coList, index) in collapseList">
            <template v-if="collMap[index] === li.id">
              <li v-for="item in coList" :key="item.id">
                <a :href="item.name" target="_blank">{{ item.val }}</a>
              </li>
            </template>
          </template>
        </ul>
      </li>
      <li class="about-navbar-item" @mouseleave.self="closeColl($event)">
        <a
          class="el-icon-connection"
          style="font-size: large"
          href="javascript:;"
          @mousemove.self="openColl($event)"
        ></a>
        <ul>
          <li></li>
          <li>
            <img style="width: 100%" src="../assets/img/QRcode.png" alt />
          </li>
          <li></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script>
import arr from "@/components/about-arr";
export default {
  data() {
    return {
      // 用于自动生成导航栏的url
      homeUrl: "douyin.com",
      barHight: "122px",
      liList: [
        { id: 0, val: "首页", name: "http://ww.aran.cc/#/main/recommend" },
        { id: 1, val: "开发者博客", name: "http://blog.aran.cc" },
        {
          id: 2,
          val: "源码地址",
          name: "https://gitee.com/organizations/wangwang-team/projects",
        },
        {
          id: 3,
          val: "青训营社区",
          name: "https://forum.juejin.cn/youthcamp",
        },
        { id: 4, val: "轻服务", name: "https://qingfuwu.cn/dashboard/qc8eoi/" },
        { id: 5, val: "创作平台", name: "http://ww.aran.cc/#/publish" },
      ],
      // 用于记录有子菜单的导航子项
      collMap: [1, 3],
      // 导航内的数据
      collapseList: [
        [
          { id: 0, val: "　贲冠然", name: "http://blog.aran.cc" },
          {
            id: 1,
            val: "　高佳乐",
            name: "https://eruihniyhbkbnf.github.io/blog",
          },
          { id: 2, val: "　黄友艺", name: "http://yywebsite.cn/#sill" },
        ],
        [
          {
            id: 0,
            val: "综合讨论",
            name: "https://forum.juejin.cn/youthcamp/category/6950604566068985897",
          },
          {
            id: 1,
            val: "技术问答",
            name: "https://forum.juejin.cn/youthcamp/category/6950604566098346019",
          },
          {
            id: 2,
            val: "笔记分享",
            name: "https://forum.juejin.cn/youthcamp/category/6950604566144483364",
          },
          {
            id: 3,
            val: "好文精选",
            name: "https://forum.juejin.cn/youthcamp/category/6950604566068985899",
          },
          {
            id: 4,
            val: "视频课程",
            name: "https://forum.juejin.cn/youthcamp/category/juejinlive",
          },
        ],
      ],
    };
  },
  methods: {
    // 子菜单打开时的操作
    openColl(e) {
      let coList = e.target.nextElementSibling;
      if (!coList) return;
      coList.style.display = "block";
      setTimeout(() => {
        coList.style.opacity = 1;
      }, 200);
      let len = coList.querySelectorAll("li").length;
      this.barHight = 116 + 62 * len + "px";
      let svg = e.target.querySelector("svg");
      if (svg) svg.style.transform = "rotate(180deg) ";
      else e.target.style.transform = "rotate(45deg)";
    },
    // 子菜单关闭时的操作
    closeColl(e) {
      let i = e.target.querySelector("ul");
      if (!i) return;
      new Promise((resolve) => {
        setTimeout(() => {
          i.style.opacity = 0;
          resolve();
        }, 220);
      })
        .then(() => {
          setTimeout(() => {
            i.style.display = "none";
          }, 50);
        })
        .then(() => {
          this.barHight = "122px";
        });
      let svg = e.target.querySelector("svg");
      if (svg) svg.style.transform = "rotate(0deg) ";
      else e.target.querySelector("a").style.transform = "rotate(0deg)";
    },
  },
  components: {
    arr,
  },
  mounted() {
    // ”首页按钮“可以返回到汪汪视频
    let home = document.querySelector(".about-navbar-right-float>li:first-child>a");
    home.addEventListener("click", () => {
      window.history.go(-1);
    });
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/about-public";
.about-navbar {
  width: 100%;
  min-width: $minWid;
  position: relative;
  float: left;
  top: 0;
  background-color: #fff;
  transition: height, top, 0.5s;
  z-index: 1000;
}
.about-navbar-left-float {
  float: left;
  height: 100px;
  width: 135px;
  img {
    width: 100%;
    position: relative;
    top: 40px;
    left: $left-margin;
  }
}
.about-navbar-right-float {
  float: right;
  margin-right: 125px;
  li {
    float: left;
    padding-left: 48px;
    line-height: 122px;
    .selected {
      color: $theme;
      font-weight: bold;
    }
    a {
      color: #909195;
      width: 100%;
      &:hover,
      &:active {
        @extend .selected;
      }
    }
  }
  .arr-icon {
    position: relative;
    top: -3px;
    transition: transform 0.5s;
  }
}
.about-navbar-item {
  position: relative;
  ul {
    position: absolute;
    display: none;
    top: 85px;
    left: 0;
    opacity: 0;
    z-index: 100;
    transition: opacity 0.3s;
    li {
      line-height: 62px;
    }
  }
}
.about-navbar-item:last-child {
  a,
  a:hover {
    transition: transform 0.5s;
  }
  ul {
    position: absolute;
    left: -75px;
    top: 100px;
    li {
      padding-top: 10px;
    }
  }
}
@media screen and (max-width: 1240px) {
  .about-navbar-right-float > li {
    padding-left: 24px;
    font-size: smaller;
  }
  .about-navbar-item li {
    padding-left: 24px;
    font-size: smaller;
  }
}
@media screen and (max-width: 960px) {
  .about-navbar-right-float {
    .arr-icon {
      left: -7px;
    }
    li {
      padding-left: 14px;
    }
  }
  .about-navbar-item li {
    padding-left: 14px;
  }
}
</style>
