<template>
  <div class="video-wrapper">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="作品标题" prop="desc">
        <el-input
          placeholder="请输入内容"
          style="width: 250px"
          v-model="uploadData.title"
          :maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="作品封面" prop="cover">
        <oss-picture-uploader
          @pictureUploadSuccess="posterUploadSuccess"
        ></oss-picture-uploader>
      </el-form-item>
      <el-form-item label="上传视频" prop="video">
        <oss-video-uploader @videoUploadSuccess="videoUploadSuccess"></oss-video-uploader>
      </el-form-item>
      <el-form-item label="作品描述" prop="desc">
        <el-input
          type="textarea"
          v-model="uploadData.description"
          :maxlength="120"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即发布</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import OssPictureUploader from "@/components/OssPictureUploader.vue";
import OssVideoUploader from "@/components/OssVideoUploader.vue";
import http from "../utils/http";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
        desc: "",
      },
      rules: {},
      uploadData: {
        videoUrl: "", // 视频URL
        cover: "", // 封面URL
        description: "", // 作品描述
        title: "", // 标题
        token: "",
        author: "",
      },
    };
  },
  created() {
    this.uploadData.token = sessionStorage.getItem("token");
    this.uploadData.author = sessionStorage.getItem("userId");
  },
  components: {
    OssPictureUploader,
    OssVideoUploader,
  },
  methods: {
    submitForm() {
      if (!this.verfyForm()) {
        this.$notify.error({
          title: "错误",
          message: "作品上传不完整",
        });
        return;
      }
      http
        .post("/userwork/add", this.uploadData)
        .then((res) => {
          console.log(res);
          this.$message.success("上传成功！");
          window.history.go(-1);
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("上传失败！");
        });
    },
    resetForm() {
      window.history.go(0);
    },
    posterUploadSuccess(res) {
      this.uploadData.cover = res;
      console.log(res);
    },
    videoUploadSuccess(res) {
      this.uploadData.videoUrl = res;
      console.log(res);
    },
    // 表单判空
    verfyForm() {
      for (let item in this.uploadData) {
        if (!this.uploadData[item]) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.video-wrapper {
  margin-top: 30px;
}
</style>
