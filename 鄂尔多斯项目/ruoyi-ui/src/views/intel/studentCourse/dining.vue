<template>
  <div>
    <!-- 添加或修改课程对话框 -->
    <el-dialog
      title="住宿就餐"
      :visible.sync="sign"
      append-to-body
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
        <el-form-item label="住宿 / 就餐名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入住宿 / 就餐名称" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
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
import { addDining } from "@/api/intel/dining";
export default {
  name: "dining",
  data() {
    return {
      //选择框数据
      typeOptions: [],
      form: {},
      // 表单校验
      rules: {
        name:[{required: true, message: "请输入名称", trigger: "blur" }],
        address:[{required: true, message: "请输入地址", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
      },
    };
  },
  created() {
    this.getDicts("hotel_dinner_type").then((response) => {
      this.typeOptions = response.data;
    });
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
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let {name,address,type,userId,courseId} = this.form;
          addDining({
            name,
            address,
            type,
            sysUserId:userId,
            courseId
          }).then((res) => {
            console.log(res);
            this.msgSuccess("操作成功");
            this.$emit("refresh");
            this.handleClose();
          }).catch(err => {
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