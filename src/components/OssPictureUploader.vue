<template>
  <div class="oss_picture_uploader">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :http-request="Upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { client, getFileNameUUID } from "@/utils/ali_oss"; //前面的ali-js文件内的两个封装函数
export default {
  data() {
    return {
      imageUrl: "",
      // OSS远程上传配置
      alOssConfig: {
        region: "oss-cn-beijing",
        accessKeyId: "LTAI5tFmpUZzEfxnpzutSssb",
        accessKeySecret: "AZlaVpjTW6cZw793bVWy4UuSlKjoLS",
        bucket: "wangwang-video",
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      return isJPG && isLt2M;
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
              that.$message.success("作品封面上传成功！");
              let url = result.res.requestUrls[0];
              let num = url.lastIndexOf("?");
              if (num !== -1) that.imageUrl = url.slice(0, num);
              else that.imageUrl = url;
              that.$emit("pictureUploadSuccess", that.imageUrl);
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #fe2c55;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.el-icon-plus:before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
