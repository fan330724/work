<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="课程名称" prop="courseName">
        <el-input
          v-model="queryParams.courseName"
          placeholder="请输入课程名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="老师名称" prop="teacherName">
        <el-input
          v-model="queryParams.teacherName"
          placeholder="请输入老师名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="评价人" prop="studentName">
        <el-input
          v-model="queryParams.studentName"
          placeholder="请输入评价人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="时间">
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['intel:appraise:remove']"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <el-table
      v-loading="loading"
      :data="appraiseList"
      @selection-change="handleSelectionChange"
      max-height="500"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="id" align="center" prop="id" /> -->
      <el-table-column label="课程名称" align="center" prop="courseName" />
      <el-table-column label="老师名称" align="center" prop="teacherName" />
      <el-table-column label="评价人" align="center" prop="studentName" />
      <el-table-column label="评分" align="center" width="240">
        <template slot-scope="scope">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <span style="margin-right: 5px" v-if="scope.row.type == 1">教师评价</span>
            <span style="margin-right: 5px" v-if="scope.row.type == 2">饭菜质量</span>
            <span style="margin-right: 5px" v-if="scope.row.type == 3">住宿环境</span>
            <el-rate
              v-model="scope.row.teacherScore"
              disabled
              score-template="{value}"
            >
            </el-rate>
          </div>
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <span style="margin-right: 5px" v-if="scope.row.type == 1">课程质量</span>
            <span style="margin-right: 5px" v-if="scope.row.type == 2">饭菜卫生</span>
            <span style="margin-right: 5px" v-if="scope.row.type == 3">住宿卫生</span>
            <el-rate
              v-model="scope.row.restaurantScore"
              disabled
              score-template="{value}"
            >
            </el-rate>
          </div>
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <span style="margin-right: 5px">总体评价</span>
            <el-rate
              v-model="scope.row.accommodationScore"
              disabled
              score-template="{value}"
            >
            </el-rate>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="评价内容" align="center" prop="content" />
      <el-table-column
        label="评价时间"
        align="center"
        prop="createTime"
        width="130"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="lookDetail(scope.row)"
            v-hasPermi="['intel:appraise:look']"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['intel:appraise:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <detail></detail>
  </div>
</template>

<script>
import {
  listAppraise,
  getAppraise,
  delAppraise,
  addAppraise,
  updateAppraise,
  exportAppraise,
} from "@/api/intel/appraise";
import detail from "./components/detail";
import state from "./state";
export default {
  name: "Appraise",
  components: {
    detail,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 评价表格数据
      appraiseList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //时间范围查询
      time: "",
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        studentName: null,
        courseName: null,
        teacherName: null,
        createTime: null,
        updateTime: null,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询评价列表 */
    getList() {
      this.loading = true;
      listAppraise(this.queryParams).then((response) => {
        this.appraiseList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.time) {
        this.queryParams.createTime = this.time[0];
        this.queryParams.updateTime = this.time[1];
      } else {
        this.queryParams.createTime = null;
        this.queryParams.updateTime = null;
      }
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.time = "";
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /**查看按钮操作 */
    lookDetail(row) {
      state.lookSign = true;
      state.item = row;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除评价编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delAppraise(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /**通过按钮操作 */
    handleUpdate(row) {},
    /**驳回按钮操作 */
    handleReject(row) {
      this.$prompt("请输入驳回原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "原因是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>
