<template>
  <div class="oss_video_uploader">
    <el-upload
      action
      :http-request="Upload"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePreview"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      drag
      :limit="limit"
      :file-list="fileList"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">上传文件大小不能超过 1G</div>
    </el-upload>
    <el-progress
      :text-inside="true"
      :stroke-width="15"
      :percentage="progress"
    ></el-progress>
  </div>
</template>

<script>
import { client, getFileNameUUID } from "@/utils/ali_oss"; //前面的ali-js文件内的两个封装函数
export default {
  data() {
    return {
      // OSS远程上传配置
      alOssConfig: {
        region: "oss-cn-beijing",
        accessKeyId: "LTAI5tFmpUZzEfxnpzutSssb",
        accessKeySecret: "AZlaVpjTW6cZw793bVWy4UuSlKjoLS",
        bucket: "wangwang-video",
      },
      fileList: [], //文件列
      showProgress: false, //进度条的显示
      dataObj: {}, //存签名信息
      progress: 0, //进度条数据
      limit: 1, // 每次上传文件数量
      // 提交视频url
      videoUrl: "",
    };
  },
  methods: {
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`每次只能上传 ${this.limit} 个文件`);
      console.log(files, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file);
    },
    // 删除文件之前的钩子
    beforeRemove(file, fileList) {
      console.log(file, fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.progress = 0;
      console.log(file, fileList);
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
      console.log(response, file, fileList);
    },
    //文件上传前的校验
    beforeAvatarUpload(file) {
      const isLt100M =
        (file.size / 1024 / 1024) * 10 > 1 && file.size / 1024 / 1024 < 1024;
      const isLt30 = file.name.length < 30;
      if (["video/mp4"].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt100M) {
        this.$message.error("上传视频大小要在100kB~1GB之间哦!");
        return false;
      }
      if (!isLt30) {
        this.$message.error("上传视频文件名称长度必须要小于30个文字哦!");
        return false;
      }
    },
    // http-request属性来覆盖默认的上传行为（即action="url"），自定义上传的实现
    Upload(file) {
      const nickname = sessionStorage.getItem("nickname");
      const that = this;
      async function multipartUpload() {
        let temporary = file.file.name.lastIndexOf(".");
        let fileNameLength = file.file.name.length;
        let fileFormat = file.file.name.substring(temporary + 1, fileNameLength);
        let fileName = getFileNameUUID() + "." + fileFormat;
        let myDate = new Date();
        // 已年月日作为文件名
        client(that.alOssConfig)
          .multipartUpload(
            `${
              myDate.getFullYear() +
              "-" +
              Number(myDate.getMonth()) +
              1 +
              "-" +
              myDate.getDate()
            }/${nickname}/${fileName}`,
            file.file,
            {
              progress: function (p) {
                //p进度条的值
                that.showProgress = true;
                that.progress = Math.floor(p * 100);
              },
            }
          )
          .then((result) => {
            //上传成功传递数据给父组件
            if (result.res.status === 200) {
              that.$message.success("视频上传成功！");
              let url = result.res.requestUrls[0];
              let num = url.lastIndexOf("?");
              if (num !== -1) that.videoUrl = url.slice(0, num);
              else that.videoUrl = url;
              that.$emit("videoUploadSuccess", that.videoUrl);
            }
          })
          .catch((err) => {
            console.log("err:", err);
          });
      }
      multipartUpload();
    },
  },
};
</script>

<style></style>
