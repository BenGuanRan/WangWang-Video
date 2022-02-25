<template lang="">
  <div class="work-table">
    <header class="table-header">
      <!-- <p class="favor-number">作品数：{{videoList.length}}</p> -->
      <div class="header-right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            排序方式<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="createdAt,false">时间排序（新->旧）</el-dropdown-item>
            <el-dropdown-item command="createdAt,true">时间排序（旧->新）</el-dropdown-item>
            <el-dropdown-item command="love,false" divided>收藏排序（多->少）</el-dropdown-item>
            <el-dropdown-item command="love,true">收藏排序（少->多）</el-dropdown-item>
          </el-dropdown-menu>
          
        </el-dropdown>
      </div>
    </header>
    <!-- 大屏分列展示视频 -->
    <section class="table-content-columns" v-if="needColumns">
      <div class="left-bar">
        <worksCard v-for="video in filterList(true)" :key="video._id" :video="video" @deleteVideo="deleteVideo" />
      </div>
      <div class="right-bar">
        <worksCard v-for="video in filterList(false)" :key="video._id" :video="video" @deleteVideo="deleteVideo" />
      </div>
    </section>
    <!-- 小屏一列展示视频 -->
    <section class="table-content-list" v-else>
      <worksCard v-for="(video, index) in videoList" :key="index" :video="video" @deleteVideo="deleteVideo" />
    </section>
    
  </div>
</template>
<script>
import worksCard from "@/components/works/works-card.vue";
// tableData
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 6,
      showList: [],
      barsNum: 2,
      needColumns:true,//分列标志
    };
  },
  components: {
    worksCard,
  },
  props: {
    videoList: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.showList = this.videoList;
    for (let i = 0; i < this.videoList.length; i++) {
      //重构时间类型
      this.videoList[i].createdAt = new Date(this.videoList[i].createdAt);
    }
    this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(this.width<768){//768px为平板电脑标志
      this.needColumns = false;
    }
  },
  methods: {
    deleteVideo(videoId) {
      const index = this.videoList.findIndex(function (obj) {
        return obj._id == videoId;
      });
      this.videoList.splice(index, 1);
    },
    filterList(isLeft) {
      let arr = [];
      for (let i = 0; i < this.videoList.length; i++) {
        if ((isLeft && i % 2 == 0) || (!isLeft && i % 2 != 0)) {
          arr.push(this.videoList[i]);
        }
      }
      return arr;
    },
    handleCommand(command) {
      let arr = command.split(",");
      arr[1] = arr[1] == "true" ? true : false;
      this.sortArray(arr[0], arr[1]);
    },
    // 排序数组
    sortArray(title, isAsc) {
      let sortAsc = function (a, b) {
        return a[title] - b[title];
      };
      let sortDesc = function (a, b) {
        return b[title] - a[title];
      };
      if (isAsc) {
        this.showList.sort(sortAsc);
      } else {
        this.showList.sort(sortDesc);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.work-table {
  width: 100%;
  padding: 10px;

  .table-header {
    display: flex;
    width: 100%;
    height: 32px;
    line-height: 32px;
    justify-content: space-between;
    .header-right {
      margin-right: 1vw;
      margin-left: 1vw;
    }
  }

  .table-content-columns{
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    flex-wrap: wrap;
    flex-grow: 2;
    flex-shrink: 2;

    .left-bar {
      box-sizing: border-box;
      width: 49%;
    }

    .right-bar {
      box-sizing: border-box;
      width: 49%;
    }
  }
  .table-content-list{
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
  
}
</style>