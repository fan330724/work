<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
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
      :data="noticeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="模板名称"
        align="center"
        prop="name"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
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
            icon="el-icon-view"
            @click="handleUpdate(scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
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

    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="780px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="模板名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入模板名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="组件" prop="controlnList">
              <el-checkbox-group v-model="form.controlnList">
                <el-checkbox
                  v-for="(item, index) in noticeData"
                  :label="item.controlnName"
                  :key="index"
                  @change="controlnValue(item, $event)"
                  >{{ item.controlnName }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-for="(item,index) in controlnData" :key="index">
            <el-form-item :label="item.controlnName" v-if="item.start&&item.controlnName!='日期'&&item.controlnName!='性别'">
              <el-input v-model="item.length" placeholder="请输入字符长度" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 点击查看对话框 -->
    <el-dialog
      title="模板详情"
      :visible.sync="open1"
      width="700px"
      append-to-body
    >
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="模板名称：">{{ form.name }} </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="组件：">
              <el-checkbox
                v-for="(item, index) in form.controlnList"
                :label="item.controlnName"
                :key="index"
                disabled
                >{{ item.controlnName }}</el-checkbox
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="open1 = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, add, del, look } from "@/api/index";
export default {
  name: "index",
  data() {
    return {
      // 遮罩层
      loading: true,
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
      // 公告表格数据
      noticeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      open1: false,
      noticeData: [
        {
          controlnName: "姓名",
          controlnVal: "mobile",
          number: "input",
          start: false,
        },
        {
          controlnName: "性别",
          controlnVal: "mobile",
          number: "radio",
          start: false,
        },
        {
          controlnName: "手机号",
          controlnVal: "mobile",
          number: "input",
          start: false,
        },
        {
          controlnName: "邮箱",
          controlnVal: "mobile",
          number: "input",
          start: false,
        },
        {
          controlnName: "文本框",
          controlnVal: "mobile",
          number: "input",
          start: false,
        },
        {
          controlnName: "文本描述",
          controlnVal: "mobile",
          number: "textarea",
          start: false,
        },
        {
          controlnName: "日期",
          controlnVal: "mobile",
          number: "picker",
          start: false,
        },
      ],
      controlnData: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "模板名称不能为空", trigger: "blur" },
        ],
        controlnList: [
          {
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true;
      list(this.queryParams).then((response) => {
        console.log(response);
        this.noticeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    controlnValue(e) {
      if (event.target.checked && e.controlnName == event.target.defaultValue) {
        let obj = {};
        obj.controlnName = e.controlnName;
        obj.controlnVal = e.controlnVal;
        obj.number = e.number;
        obj.start = event.target.checked;
        this.controlnData.push(obj);
      } else if (
        e.controlnName == event.target.defaultValue &&
        !event.target.checked
      ) {
        let index = this.controlnData.findIndex((item, index) => {
          return item.controlnName == event.target.defaultValue;
        });
        this.controlnData[index].start = false;
        this.controlnData.splice(index, 1);
      }
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
        controlnList: [],
      };
      this.controlnData = [];
      this.resetForm("form");
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.noticeId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加模板";
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(this.form);
          console.log(this.controlnData);
          this.form.controlnList = this.controlnData;
          add(this.form).then((response) => {
            this.$modal.msgSuccess("新增成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    /** 查看按钮 */
    handleUpdate(row) {
      look(row.id).then((res) => {
        this.reset();
        this.open1 = true;
        this.form = res.data;
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const noticeIds = row.name;
      const ids = row.id;
      this.$modal
        .confirm('是否确认删除"' + noticeIds + '"的数据项？')
        .then(function () {
          return del(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
  },
};
</script>
