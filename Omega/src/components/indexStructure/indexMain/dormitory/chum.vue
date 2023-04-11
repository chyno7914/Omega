<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        placeholder="学号"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.sid"
        :formatter="(value:string) => value.replace(/[^\d]/g, '')"
        clearable
      />
      <el-input
        placeholder="姓名"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.sname"
        :formatter="(value:string) => value.replace(/[^\u4e00-\u9fa5a-zA-Z_]/g, '')"
        clearable
      />
      <el-select-v2
        v-model="searchList.flat"
        filterable
        :options="flatsOptions"
        placeholder="公寓"
        class="filter-item"
        style="width: 130px"
        clearable
      />
      <el-input
        placeholder="房间"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.room"
        :formatter="(value:string) => value.replace(/[^\d]/g, '')"
        clearable
      />
      <el-select-v2
        v-model="searchList.major"
        filterable
        :options="majorsOptions"
        placeholder="专业"
        class="filter-item"
        style="width: 179px"
        multiple
        collapse-tags
        clearable
      />
      <el-select-v2
        v-model="searchList.grade"
        filterable
        :options="gradesOptions"
        placeholder="年级"
        class="filter-item"
        style="width: 179px"
        multiple
        collapse-tags
        clearable
      />
      <el-select-v2
        v-model="searchList.class"
        filterable
        :options="classesOptions"
        placeholder="班级"
        class="filter-item"
        style="width: 179px"
        multiple
        collapse-tags
        clearable
      />
      <el-button class="filter-item" type="primary" style="" @click="fetchChum">
        <span style="margin-left: 5px"> 查找</span>
      </el-button>
      <el-button class="filter-item" type="primary" style=""> 导出 </el-button>
    </div>
    <el-table border fit highlight-current-row style="width: 100%">
      <el-table-column
        label="学号"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      >
        <template slot-scope="{ row }">
          <span>5+56+</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>545656</span>
        </template>
      </el-table-column>
      <el-table-column label="公寓" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>545656</span>
        </template>
      </el-table-column>
      <el-table-column label="房间" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>545656</span>
        </template>
      </el-table-column>
      <el-table-column label="床位" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>4346 684 6 </span>
        </template>
      </el-table-column>
      <el-table-column label="专业" align="center" width="150">
        <template slot-scope="{ row }">
          <span>0</span>
        </template>
      </el-table-column>
      <el-table-column label="年级" align="center" width="150">
        <template slot-scope="{ row }">
          <span>0</span>
        </template>
      </el-table-column>
      <el-table-column label="班级" align="center" width="150">
        <template slot-scope="{ row }">
          <span>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        class-name="status-col"
        width="100"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-tag> 666 </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Imp" width="80px">
        <template slot-scope="{ row }">
          <svg-icon icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column> -->
      <el-table-column
        label="功能"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini"> Edit </el-button>
          <el-button type="success"> Publish </el-button>
          <el-button size="mini"> Draft </el-button>
          <el-button size="mini" type="danger"> Delete </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog>
      <el-form
        ref="dataForm"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="Type" prop="type">
          <el-select class="filter-item" placeholder="Please select">
            <el-option />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input />
        </el-form-item>
        <el-form-item label="Status">
          <el-select class="filter-item" placeholder="Please select">
            <el-option />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top: 8px"
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button> Cancel </el-button>
        <el-button type="primary"> Confirm </el-button>
      </div>
    </el-dialog>

    <el-dialog title="Reading statistics">
      <el-table border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { estimate, searchTname, gatherChum } from "@/api/table";
import { useHermesStore, useDemeterStore } from "@/store";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const Hermes = useHermesStore();
const Demeter = useDemeterStore();
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const chumData: any[] = reactive([]);
const searchList = reactive({
  sid: null,
  sname: null,
  room: null,
  major: null,
  grade: null,
  class: null,
  flat: null,
});
const provincesOptions = Demeter.provinces.map((_, idx) => ({
  value: _,
  label: _,
}));
const majorsOptions = Demeter.majors.map((_, idx) => ({
  value: _,
  label: _,
}));
const classesOptions = Demeter.classes.map((_, idx) => ({
  value: _,
  label: _,
}));
const gradesOptions = Demeter.grades.map((_, idx) => ({
  value: _,
  label: _,
}));
const flatsOptions = Demeter.flats.map((_, idx) => ({
  value: _,
  label: _,
}));

const initChum = async () => {
  const {
    data: { gross },
  } = await estimate(Hermes?.librakey);
  const {
    data: { message },
  } = await searchTname();
  total.value = gross;
  // console.log(total);
  Demeter.flats = message.slice();
};
const fetchChum = async () => {
  // console.log(searchList);

  const { data } = await gatherChum({
    pageSize: pageSize.value,
    currentPage: currentPage.value,
    flag: false,
    ...searchList,
  });
  // tableData.splice(0, tableData.length, ...data);
  chumData.splice(0, chumData.length, ...data.message);
  console.log();
};
const handleSizeChange = (val: any) => {
  pageSize.value = val;
};

const handleCurrentChange = (val: any) => {
  currentPage.value = val;
};
initChum();
// console.log(total.value);
</script>
<style scoped>
.app-container {
  padding: 0 10px;
  padding-right: 20px;
  position: fixed;
  width: 87%;
}
.filter-container {
  margin: 10px 0;
}
.filter-item {
  margin-left: 10px;
}
</style>
