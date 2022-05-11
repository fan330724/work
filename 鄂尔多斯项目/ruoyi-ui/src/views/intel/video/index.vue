<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="课程名称" prop="courseId">
        <el-select v-model="queryParams.courseId" placeholder="请选择课程id">
          <el-option
            v-for="dict in courseId"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频名称" prop="videoName">
        <el-input
          v-model="queryParams.videoName"
          placeholder="请输入视频名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="视频时长" prop="videoDuration">
        <el-input
          v-model="queryParams.videoDuration"
          placeholder="请输入视频时长"
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
          v-hasPermi="['intel:video:add']"
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
          v-hasPermi="['intel:video:remove']"
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
          v-hasPermi="['intel:video:export']"
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
      :data="videoList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="id" align="center" prop="id" /> -->
      <el-table-column label="课程名称" align="center" prop="courseName" />
      <el-table-column label="视频名称" align="center" prop="videoName" />
      <el-table-column label="视频时长" align="center" prop="videoDuration" />
      <el-table-column label="视频" align="center">
        <template slot-scope="scope">
          <video
            :src="scope.row.videoUrl"
            class="avatar"
            controls="controls"
          >
            您的浏览器不支持视频播放
          </video>
        </template>
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
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['intel:video:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['intel:video:remove']"
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

    <!-- 添加或修改课程视频对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="课程id" prop="courseId">
          <el-select v-model="form.courseId" placeholder="请选择课程id">
            <el-option
              v-for="dict in courseId"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频名称" prop="videoName">
          <el-input v-model="form.videoName" placeholder="请输入视频名称" />
        </el-form-item>
        <el-form-item label="视频时长" prop="videoDuration">
          <el-input v-model="form.videoDuration" placeholder="请输入视频时长" />
        </el-form-item>
        <el-form-item label="视频" prop="videoUrl">
          <!-- action必选参数, 上传的地址 -->
          <el-upload
            class="avatar-uploader el-upload--text"
            action="/dev-api/api-min/course/apprisePicUpload"
            :show-file-list="false"
            :on-success="handleVideoSuccess"
            :before-upload="beforeUploadVideo"
            :on-progress="uploadVideoProcess"
          >
            <video
              v-if="form.videoUrl != null && videoFlag == false"
              :src="form.videoUrl"
              class="avatar"
              controls="controls"
              style="width: 300px; height: 200px"
            >
              您的浏览器不支持视频播放
            </video>
            <i
              v-else-if="form.videoUrl == null && videoFlag == false"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
            <el-progress
              v-if="videoFlag == true"
              type="circle"
              :percentage="videoUploadPercent"
              style="margin-top: 30px"
            ></el-progress>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listVideo,
  getVideo,
  delVideo,
  addVideo,
  updateVideo,
  exportVideo,
} from "@/api/intel/video";
import { listCourse } from "@/api/intel/course";
export default {
  name: "Video",
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
      // 课程视频表格数据
      videoList: [],
      //上传视频进度条显示隐藏
      videoFlag: false,
      //进度条
      videoUploadPercent: 0,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //课程列表
      courseId: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        courseId: null,
        videoName: null,
        videoDuration: null,
      },
      // 表单参数
      form: {
        courseId: null,
        videoName: null,
        videoDuration: null,
        videoUrl: null,
      },
      // 表单校验
      rules: {
        courseId: [
          { required: true, message: "请选择课程id", trigger: "change" },
        ],
        videoName: [
          { required: true, message: "请输入视频名称", trigger: "blur" },
        ],
        videoDuration: [
          { required: true, message: "请输入视频时长", trigger: "blur" },
        ],
        videoUrl: [{ required: true, message: "请上传视频", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
    this.getListCourse();
  },
  methods: {
    /** 查询课程视频列表 */
    getList() {
      this.loading = true;
      listVideo(this.queryParams).then((response) => {
        this.videoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /**查询课程列表 */
    getListCourse() {
      listCourse({ status: "" }).then((res) => {
        this.courseId = res.rows;
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
        courseId: null,
        createBy: null,
        createTime: null,
        id: null,
        params: null,
        remark: null,
        searchValue: null,
        updateBy: null,
        updateTime: null,
        videoDuration: null,
        videoName: null,
        videoUrl: null,
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
      this.title = "添加课程视频";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getVideo(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改课程视频";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateVideo(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addVideo(this.form).then((response) => {
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
      this.$confirm(
        '是否确认删除课程视频编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delVideo(ids);
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
      this.$confirm("是否确认导出所有课程视频数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportVideo(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    },
    // 验证视频格式和视频大小
    beforeUploadVideo(file) {
      // const isLt10M = file.size / 1024 / 1024 < 10;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      // if (!isLt10M) {
      //   this.$message.error("上传视频大小不能超过10MB哦!");
      //   return false;
      // }
    },
    // 上传进度显示
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
    },
    //上传成功
    handleVideoSuccess(res, file) {
      //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      console.log(res);
      if (res.code == 200) {
        this.form.videoUrl = "https://82.156.19.188" + res.imgUrl;
      } else {
        this.$message.error("视频上传失败，请重新上传！");
      }
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
