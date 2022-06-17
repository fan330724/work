<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="接受对象" prop="acceptObject">
        <el-input
          v-model="queryParams.acceptObject"
          placeholder="请输入接受对象"
        ></el-input>
        <!-- <el-select
          v-model="queryParams.acceptObject"
          placeholder="请选择接受对象"
        >
          <el-option
            v-for="dict in acceptOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="消息类型" prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="请选择消息类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          v-hasPermi="['intel:message:add']"
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
          v-hasPermi="['intel:message:remove']"
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
          v-hasPermi="['intel:message:export']"
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
      :data="messageList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="id" align="center" prop="id" /> -->
      <el-table-column label="消息标题" align="center" prop="title">
        <template slot-scope="scope">
          <div class="webkit-box">{{ scope.row.title }}</div>
        </template>
      </el-table-column>

      <el-table-column label="接受对象" align="center" prop="nickName" />
      <el-table-column
        label="消息内容"
        align="center"
        prop="content"
        min-width="150px"
      >
        <template slot-scope="scope">
          <div
            v-html="scope.row.content"
            class="webkit-box"
            v-if="scope.row.content"
          ></div>
          <img :src="scope.row.image" alt="" v-else />
        </template>
      </el-table-column>
      <el-table-column
        label="消息类型"
        align="center"
        prop="type"
        :formatter="typeFormat"
      >
      </el-table-column>
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
            v-hasPermi="['intel:message:view']"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['intel:message:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['intel:message:remove']"
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

    <!-- 添加或修改消息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="消息标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入消息标题" />
        </el-form-item>
        <!-- <el-form-item label="接受对象" prop="nickName"> -->
        <!-- <el-input v-model="form.nickName" disabled></el-input> -->
        <!-- <el-select v-model="form.acceptObject" placeholder="请选择接受对象">
            <el-option
              v-for="dict in acceptOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select> -->
        <!-- </el-form-item> -->
        <el-form-item label="消息内容">
          <editor v-model="form.content" :min-height="192" />
        </el-form-item>
        <el-form-item label="消息类型" prop="type">
          <el-select
            v-model="form.type"
            placeholder="请选择消息类型"
            @change="typeChange"
          >
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="类型id"
          prop="columnIds"
          v-if="form.type && form.type != 6"
        >
          <el-select v-model="form.columnIds" placeholder="请选择类型id">
            <el-option
              v-for="dict in columnIdOptions"
              :key="dict.name"
              :label="dict.name"
              :value="dict.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="轮播图"
          prop="image"
          v-if="form.type && form.type == 5"
        >
          <el-upload
            class="avatar-uploader"
            action="https://stu.yikang.co/api-min/course/apprisePicUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.image" :src="form.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
          <h3>{{ messageView.title }}</h3>
          <span>{{ messageView.createTime }}</span>
        </div>
        <div
          v-html="messageView.content"
          class="content"
          v-if="messageView.content"
        ></div>
        <div class="content" v-else>
          <img :src="messageView.image" alt="" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listMessage,
  getMessage,
  delMessage,
  addMessage,
  updateMessage,
  exportMessage,
} from "@/api/intel/message";
import { listColumn } from "@/api/intel/column";
export default {
  name: "Message",
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
      // 消息表格数据
      messageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //是否显示查看弹出层
      open1: false,
      //查看详情的数据
      messageView: "",
      // 消息类型/1消息内容2咨询内容字典
      typeOptions: [],
      // 接受对象/1教师/2员工/3学生/12教师-员工/13教师-学生/23员工-教师
      acceptOptions: [],
      //消息类型的id
      columnIdOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        columnId: null,
        title: null,
        acceptObject: null,
        content: null,
        type: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [{ required: true, message: "请输入消息标题", trigger: "blur" }],
        type: [
          { required: true, message: "请选择消息类型", trigger: "change" },
        ],
        image: [{ required: true, message: "请上传图片", trigger: "blur" }],
        columnIds: [
          { required: true, message: "请选择类型id", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getList();
    this.getDicts("column_type").then((response) => {
      this.typeOptions = response.data;
    });
    // this.getDicts("accept_object").then((response) => {
    //   this.acceptOptions = response.data;
    // });
  },
  methods: {
    /** 查询消息列表 */
    getList() {
      this.loading = true;
      listMessage(this.queryParams).then((response) => {
        this.messageList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.image = "https://stu.yikang.co" + res.imgUrl;
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
    /**查询消息类型列表 */
    getlistColumn(type) {
      listColumn({ type }).then((res) => {
        this.columnIdOptions = res.rows;
      });
    },
    /**消息类型下拉框 值得变化 */
    typeChange(e) {
      this.form.columnIds = null;
      this.form.image = null;
      this.getlistColumn(e);
    },
    // 消息类型/1消息内容2咨询内容字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
    },
    // 接受消息/ 1教师 2员工 3学生 12教师-员工 13教师- 学生 23员工-教师
    // typeObject(row, column) {
    //   return this.selectDictLabel(this.acceptOptions, row.acceptObject);
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
        columnIds: null,
        title: null,
        acceptObject: null,
        content: null,
        image: null,
        type: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
      };
      this.columnIdOptions = [];
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
      this.title = "添加消息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getMessage(id).then((response) => {
        this.getlistColumn(response.data.type);
        this.form = response.data;
        this.open = true;
        this.title = "修改消息";
      });
    },
    /** 查看按钮操作 */
    handleView(row) {
      console.log(row);
      this.open1 = true;
      this.messageView = row;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateMessage(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMessage(this.form).then((response) => {
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
      this.$confirm('是否确认删除消息编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delMessage(ids);
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
      this.$confirm("是否确认导出所有消息数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportMessage(queryParams);
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
/* .webkit-box {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
} */
.content {
  /* text-indent: 2em; */
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
/* .content img:nth-of-type(1) {
  margin-left: -2em;
} */
</style>
