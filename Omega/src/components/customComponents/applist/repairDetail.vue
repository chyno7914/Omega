<template>
  <el-dialog v-model="dialogFormVisible" title="详情">
    <el-form label-position="left" :model="formData">
      <el-row style="height: 30px">
        <el-col :span="6">
          <el-form-item label="学号：">{{ formData.sid }}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名：">{{ formData.sname }}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="宿舍：">{{ formData.tname }} </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="房间：">{{ formData.rid }}</el-form-item>
        </el-col>
      </el-row>
      <el-row style="height: 30px">
        <el-col :span="8">
          <el-form-item label="电话号码：">{{
            formData.telephone
          }}</el-form-item>
        </el-col>
      </el-row>

      <el-row style="height: 30px">
        <el-form-item label="描述信息:"> </el-form-item>
      </el-row>
      <el-row>
        <el-col :offset="1" :span="20">
          <el-form-item>
            <Editor
              style="
                height: 300px;
                overflow-y: hidden;
                border: 1px solid #ccc;
                width: 100%;
              "
              v-model="formData.straight"
              :defaultConfig="editorConfig"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">退出</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          受理
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, shallowRef } from "vue";
import { gatherDetail } from "@/api/apply";
import { IEditorConfig } from "@wangeditor/editor";
import { Editor } from "@wangeditor/editor-for-vue";
defineExpose({
  showDialog: async (applId: number) => {
    dialogFormVisible.value = true;
    ({
      data: {
        message: {
          sid: formData.sid,
          sname: formData.sname,
          tname: formData.tname,
          rid: formData.rid,
          telephone: formData.telephone,
          straight: formData.straight,
          meta: formData.meta,
        },
      },
    } = await gatherDetail(applId));
    console.log(formData.straight);
  },
});
const dialogFormVisible = ref(false);
const target = ref<number>();
const editorRef = shallowRef();
const editorConfig: Partial<IEditorConfig> = {
  readOnly: true,
  autoFocus: false,
};
const formData = reactive({
  sid: "",
  sname: "",
  tname: "",
  rid: "",
  straight: "",
  telephone: "",
  meta: "{}",
});
const dataOther = computed(() => JSON.parse(formData.meta));
</script>
