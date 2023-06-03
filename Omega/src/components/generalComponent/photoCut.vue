<template>
  <div>
    <el-image
      class="upload"
      v-if="imgUrl"
      :src="imgUrl"
      fit="contain"
      @click="openUpload"
    ></el-image>
    <el-icon v-else class="avatar-uploader-icon" @click="openUpload"
      ><Plus
    /></el-icon>
    <!-- 上传弹窗 -->
    <el-dialog
      v-model="uploadDialog"
      :title="title"
      width="800px"
      :before-close="handleClose"
    >
      <div class="container">
        <!-- 左侧裁剪区 -->
        <div class="left">
          <!-- 大图显示区 -->
          <!-- :style="{ 'background-image': 'url(' + imgUrl + ')' }" -->
          <div class="big-image-preview">
            <img v-if="imgUrl" :src="imgUrl" class="big-image" ref="imageRef" />
            <div v-else class="big-image" @click="chooseImage" />
          </div>
          <div class="tool">
            <p>{{ tips }}</p>
            <el-button @click="chooseImage">上传图片</el-button>
            <el-button @click="chooseImage">更换图片</el-button>
            <el-button @click="zoomImage(0.2)">放大</el-button>
            <el-button @click="zoomImage(-0.2)">缩小</el-button>
            <el-button @click="rotateImage(90)">左转90°</el-button>
            <el-button @click="rotateImage(90)">右转90°</el-button>
          </div>
        </div>
        <!-- 右侧预览区 -->
        <div class="right">
          <!-- 小图预览区域 -->
          <div class="right-top">
            <div class="image-view"></div>
            <div class="view-info">
              <div style="margin-bottom: 20px">
                <span>比例：</span>
                <el-input-number
                  :controls="false"
                  v-model="heightScale"
                  style="width: 50px"
                  @change="proportionFn"
                  placeholder="长"
                ></el-input-number>
                -
                <el-input-number
                  :controls="false"
                  v-model="widthScale"
                  style="width: 50px; margin-right: 20px"
                  @change="proportionFn"
                  placeholder="宽"
                ></el-input-number>
                <el-button @click="proportionCloseFn">X</el-button>
              </div>
              <div style="margin-bottom: 20px">
                <span>宽度：</span>
                <el-input-number
                  v-model="cropperWidth"
                  :min="1"
                  @change="setcropperHW"
                ></el-input-number>
                px
              </div>
              <div>
                <span>高度：</span>
                <el-input-number
                  v-model="cropperHeight"
                  :min="1"
                  @change="setcropperHW"
                ></el-input-number>
                px
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 只用input来实现上传，但是不显示input -->
      <input
        v-show="false"
        ref="fileRef"
        type="file"
        accept="image/png, image/jpeg"
        @change="getImageInfo"
      />
      <template #footer>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitImage">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { ElMessage } from "element-plus";
import axios from "axios";
import { portrait } from "@/api/user";
const props = withDefaults(
  defineProps<{
    imgUrl?: string;
    title?: string;
    tips?: string;
    api?: string;
    size?: number;
  }>(),
  {
    imgUrl: "",
    api: "/api/apps/common/Index/file",
    title: "上传图片",
    tips: "",
    size: 10000,
  }
);
//   imgUrl: {
//     // 回显需求
//     type: String,
//     default: "",
//   },
//   title: {
//     //弹框标题
//     type: String,
//     default: "上传图片",
//   },
//   tips: {
//     //图片下的提示语
//     type: String,
//     default: "",
//   },
//   api: {
//     //上传的api
//     type: String,
//     default: "/api/apps/common/Index/file",
//   },
//   size: {
//     //允许上传最大图片MB
//     type: Number,
//     default: 10000,
//   },
// });
// 默认显示的图片
const imgUrl = ref(props.imgUrl);
const tips = ref(props.tips);
const isCreate = ref(false);
// 裁剪对象
const cropper = ref<null | Cropper>(null);
const title = ref(props.title);
const api = ref(props.api);
const size = ref(props.size);
const http = axios.create();
const env = import.meta.env;
const info = ref();
const imageRef = ref(null);
const cropperHeight = ref();
const cropperWidth = ref();
const widthScale = ref();
const heightScale = ref();
const uploadDialog = ref(false);
const fileRef = ref<null | HTMLInputElement>(null);
const fileName = ref();
const emit = defineEmits<{
  (e: "upload", data: any): void;
}>();
// 打开弹窗方法
const openUpload = () => {
  uploadDialog.value = true;
  if (imgUrl.value && cropper.value) {
    cropper.value.setData(info.value);
  }
};
// 关闭弹窗
const handleClose = () => {
  uploadDialog.value = false;
};
// 选择图片
const chooseImage = () => {
  // 当input的type属性值为file时，点击方法可以进行选取文件
  if (fileRef.value) fileRef.value.click();
};
// 上传头像
const submitImage = () => {
  if (cropper.value) {
    // console.log(env.VITE_BASE_URL, api.value);
    const cas = cropper.value.getCroppedCanvas();
    // const base64url = cas.toDataURL('image/jpeg')
    cas.toBlob((e: Blob | null) => {
      imgUrl.value = window.URL.createObjectURL(e ?? new Blob());
    });
    info.value = cropper.value.getData();
    uploadDialog.value = false;
  }
};
// 上传
const uploadImage = () => {
  if (cropper.value) {
    const ca = cropper.value.getCroppedCanvas();
    const formData = new FormData();
    ca.toBlob((e: Blob | null) => {
      if (e) {
        formData.append("omega_protrait", e, fileName.value);
        portrait(formData).then((res) => {
          emit("upload", res.data);
          //   ElMessage({
          //   message: res.data.status
          //     ? res.data.message
          //     : `${censusForm.sname},${res.data.message}`,
          //   type: res.data.status ? "error" : "success",
          // });
          // 上传成功，将组件回复到初始状态
          imgUrl.value = "";
          tips.value = "";
          isCreate.value = false;
          cropperHeight.value = null;
          cropperWidth.value = null;
          widthScale.value = null;
          heightScale.value = null;
          if (cropper.value) {
            cropper.value.destroy();
            cropper.value = null;
          }
        });
      }
    });
  }
};
// 获取文件信息
const getImageInfo = (e: any) => {
  // 上传的文件
  const file = e.target.files[0];
  const fileSize = Number((file.size / 1024).toFixed(2));
  if (fileSize > size.value * 1024) {
    ElMessage.warning(`'图片大小必须在${size.value}MB以内！'`);
    return false;
  }
  fileName.value = file.name;
  //fileName.vallue = file.name;//
  // 获取 window 的 URL 工具
  const URL = window.URL || window.webkitURL;
  // 通过 file 生成目标 url
  imgUrl.value = URL.createObjectURL(file);
  // console.log('图片：', imgUrl);
  nextTick(() => {
    // 判定裁剪对象是否存在
    // 存在销毁重新创建（这里不替换图片，图片不一样大时会变形），不存在创建对象
    if (cropper.value) {
      cropper.value.destroy();
      cropImage();
    } else {
      cropImage();
    }
    isCreate.value = true;
  });
};
// 裁剪图片
const cropImage = () => {
  if (imageRef.value) {
    cropper.value = new Cropper(imageRef.value, {
      // 宽高比
      aspectRatio: widthScale.value / heightScale.value, //设置裁剪框为固定的宽高比
      // initialAspectRatio: [100, 200],
      viewMode: 1,
      // 预览
      preview: ".image-view",
      // cropBoxResizable: false,
      background: false,
      crop(event: any) {
        cropperHeight.value = parseInt(event.detail.height);
        cropperWidth.value = parseInt(event.detail.width);
      },
    });
    isCreate.value = true;
  }
};
// 旋转
const rotateImage = (angle: any) => {
  if (isCreate.value && cropper.value) {
    cropper.value.rotate(angle);
  }
};
// 缩放
const zoomImage = (num: number) => {
  if (isCreate.value && cropper.value) {
    cropper.value.zoom(num);
  }
};
const setcropperHW = () => {
  if (isCreate.value && cropper.value) {
    cropper.value.setData({
      height: cropperHeight.value ? +cropperHeight.value : 0,
      width: cropperWidth.value ? +cropperWidth.value : 0,
    });
  }
};
const proportionFn = () => {
  if (isCreate.value && cropper.value) {
    if (widthScale.value && heightScale.value) {
      cropper.value.destroy();
      cropImage();
    } else if (!widthScale.value && !heightScale.value) {
      cropper.value.destroy();
      cropImage();
    }
  }
};
const proportionCloseFn = () => {
  if (isCreate.value && cropper.value) {
    widthScale.value = null;
    heightScale.value = null;
    cropper.value.destroy();
    cropImage();
  }
};
defineExpose({
  uploadImage,
});
</script>

<style scoped lang="scss">
//上传的基本样式
.upload {
  width: 142px;
  height: 142px;
  // border: 5px solid #eeeeee;
  box-sizing: border-box;
  cursor: pointer;
  background-position: center center;
  background-size: 100%;
  border-radius: 6px;
  background: #eee;
}

//hover的基本样式
.base-hover {
  position: absolute;
  width: 100%;
  height: 100%;
  content: "更换头像";
  background: black;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
}

.container {
  width: 800px;
  height: 500px;
  display: flex;
  margin: 20px 20px 0px;
  .left {
    width: 65%;
    height: 100%;
    .big-image-preview {
      width: 100%;
      height: 85%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      border: 1px solid #999;
    }
    .tool {
      width: 100%;
      height: 15%;
      font-size: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin: 0px 10px;
        cursor: pointer;
      }
    }
    .big-image {
      width: 100%;
      height: 100%;
      display: block;
      max-width: 100%;
    }
  }
  .right {
    width: 240px;
    height: 100%;
    font-size: 14px;
    .right-top {
      width: 100%;
      height: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .image-view {
        // border: 1px solid gray;
        overflow: hidden;
        min-width: 200px;
        height: 200px;
      }
      .view-info {
        position: absolute;
        top: 340px;
      }
    }
    .right-bottom {
      width: 100%;
      height: 30%;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
    }
  }
}
:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 142px;
  height: 142px;
  text-align: center;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
}
:deep(.cropper-point.point-se) {
  height: 5px;
  width: 5px;
}
</style>
