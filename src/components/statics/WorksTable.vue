<template>
  <div class="works_table">
    <template>
      <el-table
        height="250"
        :data="
          tableData.filter(
            (data) => !search || data.title.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column align="center" label="发布日期" prop="date"></el-table-column>
        <el-table-column align="center" label="标题" prop="title"></el-table-column>
        <el-table-column
          align="center"
          label="被收藏次数"
          prop="favorNum"
        ></el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              @change="handelSearch(scope)"
              placeholder="输入标题搜索"
              clearable
            />
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import http from "@/utils/http.js";
export default {
  created() {},
  props: {
    tableData: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除视频
    handleDelete(index, row) {
      console.log(index, row);
      http
        .post("/userwork/delete", { videoId: this.tableData[index].videoId })
        .then((res) => {
          if (res.data.code === 200) {
            this.$message.success("作品《" + this.tableData[index].title + "》删除成功");
          }
          this.tableData.splice(index, 1);
          this.$emit("tableChange");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSearch(scope) {
      console.log(scope);
    },
  },
};
</script>

<style scoped>
.works_table {
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}
.works_table::-webkit-scrollbar {
  width: 5px;
}
.works_table::-webkit-scrollbar-track {
  background-color: #ffffff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.works_table::-webkit-scrollbar-thumb {
  background-color: #e7e7ec;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.el-table {
  height: 100% !important;
}
</style>
