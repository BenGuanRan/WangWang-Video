<template>
  <div class="statistic" :class="{ normal: !this.ifOver }">
    <no-login v-if="!ifLogin"></no-login>
    <el-skeleton :rows="6" v-if="!ifOver && ifLogin" animated />
    <el-row v-if="ifLogin && ifOver" class="row">
      <el-col :span="17" :class="ifSmall ? 'bottom' : 'left'">
        <el-row class="card_container" v-if="!ifSmall">
          <div class="card_inner">
            <div class="card">
              <el-card shadow="hover">
                <div class="card_left">
                  <div class="card_o green_color">
                    <span class="el-icon-time"></span>
                  </div>
                </div>
                <div class="card_right">
                  <div class="card_num green_color">{{ cardData.lastLoginTime }}</div>
                  <div class="card_title">上次登录时间</div>
                </div>
              </el-card>
            </div>
            <div class="card">
              <el-card shadow="hover">
                <div class="card_left">
                  <div class="card_o purple_color">
                    <span class="el-icon-view"></span>
                  </div>
                </div>
                <div class="card_right">
                  <div class="card_num purple_color">{{ cardData.dayTime }}h</div>
                  <div class="card_title">今日观影时长</div>
                </div>
              </el-card>
            </div>
            <div class="card">
              <el-card shadow="hover">
                <div class="card_left">
                  <div class="card_o blue_color">
                    <span class="el-icon-files"></span>
                  </div>
                </div>
                <div class="card_right">
                  <div class="card_num blue_color">{{ cardData.publishNum }}</div>
                  <div class="card_title">发布视频数量</div>
                </div>
              </el-card>
            </div>
            <div class="card">
              <el-card shadow="hover">
                <div class="card_left">
                  <div class="card_o yellow_color">
                    <span class="el-icon-star-off"></span>
                  </div>
                </div>
                <div class="card_right">
                  <div class="card_num yellow_color">{{ cardData.favorNum }}</div>
                  <div class="card_title">累计获得收藏</div>
                </div>
              </el-card>
            </div>
          </div>
        </el-row>
        <div class="time_container">
          <div class="time_inner">
            <el-card shadow="hover" class="time_line_chart">
              <h1 class="card_title">发布作品按月统计</h1>
              <echarts-line :lineData="lineData" v-if="ifOver"></echarts-line>
            </el-card>
          </div>
        </div>
        <div class="time_container">
          <div class="time_inner">
            <el-card shadow="hover" class="time_line_chart">
              <h1 class="card_title">已发布作品概览</h1>
              <works-table
                :tableData="tableData"
                @tableChange="tableChange"
              ></works-table>
            </el-card>
          </div>
        </div>
      </el-col>
      <el-col :span="7" :class="ifSmall ? 'top' : 'right'">
        <div class="user_container">
          <div class="user_inner">
            <el-card shadow="hover" class="user_card">
              <user-box :userData="userData" v-if="ifOver"></user-box>
            </el-card>
          </div>
        </div>
        <div class="day_container">
          <div class="day_inner">
            <el-card shadow="hover">
              <h1 class="card_title">登录时间分布</h1>
              <echarts-pie :pieData="pieData" v-if="ifOver"></echarts-pie>
            </el-card>
          </div>
        </div>
        <div class="month_container">
          <div class="month_inner">
            <el-card shadow="hover">
              <h1 class="card_title">近7天被收藏次数</h1>
              <echarts-bar :barData="this.barData" v-if="ifOver"></echarts-bar>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echartsLine from "@/components/statics/echartsLine.vue";
import echartsPie from "@/components/statics/echartsPie.vue";
import echartsBar from "@/components/statics/echartsBar.vue";
import WorksTable from "@/components/statics/WorksTable.vue";
import UserBox from "@/components/statics/UserBox.vue";
import NoLogin from "@/components/NoLogin.vue";
import http from "../utils/http";
export default {
  mounted() {
    if (this.verfyLogin()) {
      this.ifLogin = true;
      this.userName = sessionStorage.getItem("username");
      this.getData();
    } else {
      this.ifLogin = false;
    }
    if (window.innerWidth < 900) {
      this.ifSmall = true;
    }
  },
  created() {},
  data() {
    return {
      ifLogin: false,
      ifOver: false,
      userId: "",
      // 折线图
      lineData: [],
      // 条形图
      barData: [],
      // 饼形图
      pieData: [],
      // 表格
      tableData: [],
      //四个卡片
      cardData: {
        lastLoginTime: "", //上次登录时间
        dayTime: 0, // 今日观影时长
        publishNum: 0, // 发布视频数量
        favorNum: 0, // 累计获得收藏数
      },
      // 用户信息(待定)
      userData: {},
      ifSmall: false,
    };
  },
  components: {
    echartsLine,
    echartsPie,
    echartsBar,
    WorksTable,
    UserBox,
    NoLogin,
  },
  methods: {
    // 检验是否登录
    verfyLogin() {
      if (sessionStorage.getItem("token")) return true;
      return false;
    },
    getData() {
      http
        .post("user/detail", {
          userName: this.userName,
        })
        .then((res) => {
          let userData = res.data.data.userDetailInfo;
          if (res.data.code === 200) {
            this.barData = userData.barData;
            this.lineData = userData.lineData;
            this.cardData = userData.cardData;
            this.tableData = userData.tableData;
            this.userData = userData.userData;
            this.pieData = userData.pieData;
            this.ifOver = true;
            this.cardData.dayTime =
              Math.floor(
                (Date.parse(new Date()) - sessionStorage.getItem("loginTime")) / 10 / 3600
              ) / 100;
          } else {
            this.ifOver = true;
            sessionStorage.clear();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tableChange() {
      this.getData();
    },
  },
};
</script>

<style scoped>
.row {
  position: relative;
}
.normal {
  height: 80% !important;
  overflow: hidden;
}
div {
  height: 100%;
}
.user_card {
  padding: 0 !important;
}
.statistic {
  background-color: #f5f5f5;
  height: 200%;
  padding: 10px;
}

.left {
  float: left;
  width: 60%;
  margin: 0;
}
.top {
  position: absolute;
  top: 0;
  float: none;
  width: 100%;
  height: auto;
}
.right {
  float: left;
  width: 40%;
  margin: 0;
}
.bottom {
  position: absolute;
  top: 0;
  transform: translateY(95%);
  float: none;
  width: 100%;
  height: auto;
}
/* 成比例缩放 */
.card_container {
  position: relative;
  background-color: red;
  padding-bottom: 33%;
  height: 0;
}
.card_inner {
  position: absolute;
  width: 100%;
  height: 100%;
}
.card {
  float: left;
  width: 50%;
  height: 50%;
  background-color: #f5f5f5;
  box-sizing: border-box;
  padding: 10px;
}
.el-card {
  width: 100%;
  height: 100%;
}
.el-card /deep/ .el-card__body {
  padding: 0;
  height: 100%;
}
.card_left {
  float: left;
  position: relative;
  padding: 10px;
  vertical-align: middle;
  width: 29%;
}
.card_o {
  position: absolute;
  top: 0;
  width: 80%;
  height: 80%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  text-align: center;
  line-height: 100%;
}
.card_o > span {
  font-size: 2vw;
  display: inline-block;
  overflow: hidden;
  font-size: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.green_color {
  color: #91cd76;
}
.purple_color {
  color: #a3a1fd;
}
.yellow_color {
  color: #ffdc83;
}
.blue_color {
  color: #53dbfd;
}

.card_right {
  display: flex;
  float: left;
  width: 71%;
  flex-direction: column;
}
.time_container {
  position: relative;
  height: 0;
  padding-bottom: 68%;
  background-color: #f5f5f5;
}
.card_num {
  text-indent: 0.5em;
  box-sizing: border-box;
  padding-top: 4%;
  font-size: 2vw;
  vertical-align: middle;
  flex: 0.6;
  font-weight: 600;
}
.card_title {
  text-indent: 1em;
  flex: 0.4;
  background-color: #fff;
  font-size: 1vw;
  font-weight: 600;
  color: rgb(107, 106, 106);
}
.time_inner {
  padding: 10px;
  position: absolute;
  width: 100%;
  height: 100%;
}
.time_line_chart {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.user_container {
  height: 0;
  position: relative;
  width: 100%;
  padding-bottom: 88.5%;
}
.day_inner {
  position: absolute;
  padding: 10px;
  width: 100%;
  height: 100%;
}
.day_container {
  height: 0;
  position: relative;
  width: 100%;
  padding-bottom: 90%;
}
.month_inner {
  top: 0;
  position: absolute;
  padding: 10px;
  width: 100%;
  height: 100%;
}
.month_container {
  height: 0;
  position: relative;
  width: 100%;
  padding-bottom: 75%;
}
.user_inner {
  position: absolute;
  padding: 10px;
  width: 100%;
  height: 100%;
}
.card_title {
  text-align: center;
}
.el-card {
  padding: 10px;
}
.bottom .time_container:nth-of-type(2) {
  padding-bottom: 200%;
}
</style>
