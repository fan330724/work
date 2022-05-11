<template>
  <div>
    <!-- 添加或修改课程对话框 -->
    <el-dialog
      title="住宿就餐"
      :visible.sync="sign"
      append-to-body
      width="500px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
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
        <el-form-item label="就餐名称" prop="name">
          <el-input type="textarea" v-model="form.name" placeholder="请输入就餐名称" />
        </el-form-item>
        <el-form-item label="就餐地址" prop="address">
          <el-input type="textarea" v-model="form.address" placeholder="请输入就餐地址" />
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
import state from "./state";
import {
  listClass,
} from "@/api/intel/course";
import { addDining } from "@/api/intel/dining";
export default {
  name: "eat",
  data() {
    return {
      //选择框数据
      classOption: [],
      form: {
        classId:null,
        name:null,
        address:null,
      },
      // 表单校验
      rules: {
        classId: [
          { required: true, message: "请选择班级名称", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入就餐地址", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getListClass()
  },
  computed: {
    sign() {
      return state.addSign;
    },
  },
  watch: {
    sign(newV, oldV) {
      if (newV) {
        this.form = JSON.parse(JSON.stringify(state.item));
      } else {
        this.$refs["form"].resetFields();
      }
    },
  },
  methods: {
    cancel() {
      state.addSign = false;
    },
    handleClose() {
      state.addSign = false;
    },
     /**查询班级名称列表 */
    getListClass() {
      listClass().then((res) => {
        this.classOption = res.rows;
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let { name, address, classId } = this.form;
          addDining({
            name,
            address,
            type: '2',
            classId
          })
            .then((res) => {
              console.log(res);
              this.msgSuccess("操作成功");
              this.$emit("refresh");
              this.handleClose();
            })
            .catch((err) => {
              this.$emit("refresh");
              this.handleClose();
            });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>