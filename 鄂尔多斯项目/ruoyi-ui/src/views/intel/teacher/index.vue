<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系方式" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入联系方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['intel:employees:add']"
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
          v-hasPermi="['intel:employees:remove']"
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
          v-hasPermi="['intel:employees:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="employeesList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="id" align="center" prop="id" /> -->
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="联系方式" align="center" prop="phonenumber" />
      <el-table-column label="教学科目" align="center" prop="subjectName" />
      <el-table-column label="性别" align="center" prop="sex" />
      <el-table-column label="教师简介" align="center">
        <template slot-scope="scope">
          <div class="webkit-box" v-html="scope.row.introduce"></div>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center" prop="createTime" />
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
            @click="handleView(scope.row)"
            v-hasPermi="['intel:employees:view']"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['intel:employees:remove']"
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

    <!-- 添加或修改教师/员工对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phonenumber">
          <el-input v-model="form.phonenumber" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教学科目" prop="subjectsId">
          <el-select v-model="form.subjectsId" placeholder="请选择教学科目">
            <el-option
              v-for="dict in subjectsId"
              :key="dict.name"
              :label="dict.name"
              :value="dict.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入登录账号" />
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入登录密码" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="https://stu.yikang.co/api-min/course/apprisePicUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="教师简介" prop="introduce">
          <editor v-model="form.introduce" :min-height="192" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 查看消息对话框 -->
    <el-dialog title="消息详情" :visible.sync="open1" append-to-body>
      <div class="viewBox">
        <div class="top">
          <h3>{{ messageView.name }}</h3>
          <span>{{ messageView.createTime }}</span>
        </div>
        <div v-html="messageView.introduce" class="content"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listTeacher,
  teachercourselist,
  getEmployees,
  delEmployees,
  addEmployees,
  updateEmployees,
  exportEmployees,
} from "@/api/intel/employees";
import { listSubjects } from "@/api/intel/subjects";
const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
var checkphone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入联系方式"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入正确的手机号码"));
  } else {
    callback();
  }
};
export default {
  name: "Employees",
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
      // 教师/员工表格数据
      employeesList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      open1: false,
      // 性别(0是男 1是女)字典
      typeOptions: [],
      //查看详情的数据
      messageView: "",
      //教学科目
      subjectsId: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: "",
        phonenumber: "",
      },
      // 表单参数
      form: {
        name: null,
        phonenumber: null,
        sex: null,
        userName: null,
        password: "111111",
        introduce: null,
        avatar: null,
        subjectsId: null,
        type: 1,
      },
      // 表单校验
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phonenumber: [
          { required: true, validator: checkphone, trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        subjectsId: [
          { required: true, message: "请选择教学科目", trigger: "change" },
        ],
        userName: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          { required: true, validator: checkphone, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
        introduce: [{ required: true, message: "请输入简介", trigger: "blur" }],
        avatar: [{ required: true, message: "请上传图片", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
    this.teachercourselist();
    this.getDicts("user_sex").then((response) => {
      this.typeOptions = response.data;
    });
  },
  methods: {
    /** 查询教师列表 */
    getList() {
      this.loading = true;
      listTeacher(this.queryParams).then((response) => {
        this.employeesList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /**查询教学科目列表 */
    teachercourselist() {
      listSubjects().then((res) => {
        this.subjectsId = res.rows;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        name: null,
        phonenumber: null,
        sex: null,
        userName: null,
        password: "111111",
        introduce: null,
        avatar: null,
        subjectsId: null,
        type: 1,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
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
      this.title = "添加教师";
    },
    /**查看按钮操作 */
    handleView(row) {
      console.log(row);
      this.open1 = true;
      this.messageView = row;
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar = "https://stu.yikang.co" + res.imgUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG JPEG PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          addEmployees(this.form).then((response) => {
            this.msgSuccess("新增成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除教师/员工编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delEmployees(ids);
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
      this.$confirm("是否确认导出所有教师/员工数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportEmployees(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.top {
  text-align: center;
  margin-bottom: 10px;
}
.content {
  text-indent: 2em;
}
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
<style>
.app-container .cell img {
  width: 100px;
  height: 100px;
  margin-right: 5px;
}
.content img {
  margin: 0;
  width: 200px;
  height: 200px;
  margin-right: 5px;
}
.content img:nth-of-type(1) {
  margin-left: -2em;
}
</style>
