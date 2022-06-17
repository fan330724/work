<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="课程名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入课程名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="授课老师" prop="teacherName">
        <el-select
          v-model="queryParams.teacherName"
          placeholder="请选择授课老师"
        >
          <el-option
            v-for="dict in teacherName"
            :key="dict.id"
            :label="dict.name"
            :value="dict.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择课程状态">
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
        </el-select>
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['intel:course:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['intel:course:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['intel:course:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleDownload"
          v-hasPermi="['intel:course:download']"
          >下载课程二维码</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleEat"
          v-hasPermi="['intel:course:eat']"
          >就餐安排</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="courseList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="id" align="center" prop="id" /> -->
      <el-table-column
        label="课程名称"
        align="center"
        prop="name"
        fixed
        min-width="130"
      >
        <template slot-scope="scope">
          <div class="webkit-box">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="班级名称"
        align="center"
        prop="className"
        min-width="130"
      >
        <template slot-scope="scope">
          <div class="webkit-box">{{ scope.row.className }}</div>
        </template>
      </el-table-column>
      <el-table-column label="授课老师" align="center" prop="teacherName" />
      <el-table-column
        label="课程开始时间"
        align="center"
        prop="courseStartTime"
        min-width="140"
      >
      </el-table-column>
      <el-table-column
        label="课程结束时间"
        align="center"
        prop="courseEndTime"
        min-width="140"
      >
      </el-table-column>
      <!-- <el-table-column label="课程时长" align="center" prop="courseDuration" />
      <el-table-column label="总人数" align="center" prop="total" /> -->
      <el-table-column label="课程状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="typeOptions" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column
        label="上课地址"
        align="center"
        prop="adress"
        min-width="130"
      >
        <template slot-scope="scope">
          <div class="webkit-box">{{ scope.row.adress }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="培训目的"
        align="center"
        prop="introduction"
        min-width="150"
      >
        <template slot-scope="scope">
          <div v-html="scope.row.introduction" class="webkit-box"></div>
        </template>
      </el-table-column> -->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="120"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="lookDetail(scope.row)"
            v-hasPermi="['intel:course:look']"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['intel:course:edit']"
            v-if="
              scope.row.status == '0' &&
              showEdit < new Date(scope.row.registrationStartTime).getTime()
            "
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['intel:course:remove']"
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

    <!-- 添加或修改课程对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
        <el-row>
          <el-col :span="12">
            <el-form-item label="课程名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入课程名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上课地址" prop="adress">
              <el-input v-model="form.adress" placeholder="请输入上课地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级名称" prop="classId">
              <el-select v-model="form.classId" placeholder="请选择班级名称">
                <el-option
                  v-for="dict in classOption"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.pid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"
            ><el-form-item label="授课老师" prop="teacherName">
              <el-select v-model="form.teacherId" placeholder="请选择授课老师">
                <el-option
                  v-for="dict in teacherName"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.id"
                ></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="课程开始时间" prop="courseStartTime">
              <el-date-picker
                clearable
                size="small"
                v-model="form.courseStartTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择课程开始时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程结束时间" prop="courseEndTime">
              <el-date-picker
                clearable
                size="small"
                v-model="form.courseEndTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择课程结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总人数" prop="total">
              <el-input v-model="form.total" placeholder="请输入总人数" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程时长" prop="courseDuration">
              <el-input
                v-model="form.courseDuration"
                placeholder="请输入课程时长"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12"
            ><el-form-item label="培训方法" prop="methods">
              <el-input v-model="form.methods" placeholder="请输入培训方法" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程图片" prop="course_avatar">
              <el-upload
                class="avatar-uploader"
                action="https://stu.yikang.co/api-min/course/apprisePicUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="form.course_avatar"
                  :src="form.course_avatar"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24"
            ><el-form-item label="培训目的" prop="introduction">
              <editor v-model="form.introduction" :min-height="192" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 就餐安排 -->
    <eat @refresh="getList"></eat>
    <!-- 查看 -->
    <detail></detail>
  </div>
</template>

<script>
import {
  listCourse,
  getCourse,
  delCourse,
  addCourse,
  updateCourse,
  exportCourse,
  downCode,
  listClass,
} from "@/api/intel/course";
import { listTeacher } from "@/api/intel/employees";
import axios from "axios";
import eat from "./eat.vue";
import state from "./state";
import detail from "./detail";
export default {
  name: "Course",
  components: {
    eat,
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
      // 课程表格数据
      courseList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //时间范围
      time: "",
      // 课程状态(0是待培训 1是培训中 2是已完成)字典
      typeOptions: [],
      teacherName: [],
      //班级名称数据
      classOption: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        status: "",
        name: null,
        teacherName: null,
        courseStartTime: null,
        courseEndTime: null,
        registrationStartTime: null,
        registrationEndTime: null,
        total: null,
        adress: null,
        courseDuration: null,
        introduction: null,
        remark: null,
      },
      // 表单参数
      form: {
        name: null,
        teacherName: null,
        courseStartTime: null,
        courseEndTime: null,
        registrationStartTime: null,
        registrationEndTime: null,
        total: null,
        adress: null,
        courseDuration: null,
        introduction: null,
      },
      // 表单校验
      rules: {
        classId: [
          { required: true, message: "请选择班级名称", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        courseStartTime: {
          required: true,
          message: "请输入课程开始时间",
          trigger: "blur",
        },
        courseEndTime: {
          required: true,
          message: "请输入课程结束时间",
          trigger: "blur",
        },
        adress: { required: true, message: "请输入上课地址", trigger: "blur" },
        // introduction: {
        //   required: true,
        //   message: "请输入培训目的",
        //   trigger: "blur",
        // },
        // course_avatar: [
        //   { required: true, message: "请上传图片", trigger: "blur" },
        // ],
      },
    };
  },
  created() {
    this.getList();
    this.getTeacherList();
    this.getDicts("course_type").then((response) => {
      this.typeOptions = response.data;
    });
  },
  methods: {
    /**查询授课老师 */
    getTeacherList() {
      listTeacher().then((res) => {
        this.teacherName = res.rows;
      });
    },
    /** 查询课程列表 */
    getList() {
      this.loading = true;
      listCourse(this.queryParams).then((response) => {
        this.courseList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /**查询班级名称列表 */
    getListClass() {
      listClass().then((res) => {
        console.log(res);
        this.classOption = res.rows;
      });
    },
    // statusFormat(row, column) {
    //   return this.selectDictLabel(this.typeOptions, row.status);
    // },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        className: null,
        classId: null,
        name: null,
        teacherName: null,
        courseStartTime: null,
        courseEndTime: null,
        registrationStartTime: null,
        registrationEndTime: null,
        total: null,
        adress: null,
        courseDuration: null,
        introduction: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        methods: null,
        status: null,
        course_avatar: null,
      };
      this.resetForm("form");
    },
    handleAvatarSuccess(res, file) {
      this.form.course_avatar = "https://stu.yikang.co" + res.imgUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 30;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG JPEG PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.time) {
        this.queryParams.courseStartTime = this.time[0];
        this.queryParams.courseEndTime = this.time[1];
      } else {
        this.queryParams.courseStartTime = null;
        this.queryParams.courseEndTime = null;
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加课程";
      this.getListClass();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getCourse(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改课程";
        this.getListClass();
      });
    },
    /**课程查看操作 */
    lookDetail(row) {
      state.lookSign = true;
      state.item = row;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateCourse(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCourse(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除课程编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delCourse(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有课程数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportCourse(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    },
    /**
     * 下载二维码
     */
    handleDownload(row) {
      axios({
        method: "get",
        url: "https://stu.yikang.co/api-min/qrcode/download",
        responseType: "blob",
      }).then((res) => {
        let url = window.URL.createObjectURL(new Blob([res.data]));
        this.downloadFun(url, row);
      });
      // downCode().then((res) => {
      //   let url = window.URL.createObjectURL(new Blob([res.data]));
      //   this.downloadFun(url, row);
      // });
    },
    downloadFun(blobUrl, row) {
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "课程二维码.png";
      a.click();
    },
    /**
     * 就餐安排
     */
    handleEat() {
      state.addSign = true;
    },
  },
  computed: {
    showEdit() {
      return new Date().getTime();
    },
  },
};
</script>
<style scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border: 1px solid #8c939d;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>