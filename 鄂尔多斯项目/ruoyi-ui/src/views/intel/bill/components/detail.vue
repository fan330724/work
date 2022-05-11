<template>
  <div>
    <el-dialog
      :title="title + '详情'"
      :visible.sync="sign"
      append-to-body
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item
          label="报账名称："
          class="margin"
          v-if="form.reimbursementName"
        >
          <div>{{ form.reimbursementName }}</div>
        </el-form-item>
        <el-form-item label="用户名称：" class="margin">
          <div>{{ form.userName }}</div>
        </el-form-item>
        <el-form-item :label="title + '内容:'" class="margin">
          <div>{{ form.content }}</div>
        </el-form-item>
        <el-form-item label="采购明细：" class="margin" v-if="form.detail">
          <div>{{ form.detail }}</div>
        </el-form-item>
        <el-form-item label="时间：" class="margin">
          <div>{{ form.createTime }}</div>
        </el-form-item>
        <el-form-item label="类型：" class="margin">
          <dict-tag :options="typeOptions" :value="form.type" />
        </el-form-item>
        <el-form-item label="状态：" class="margin">
          <dict-tag :options="statusOptions" :value="form.status" />
        </el-form-item>
        <el-form-item label="图片：" class="margin">
          <el-image
            style="width: 100px; height: 100px; margin-right:10px; margin-top:10px;"
            :src="item"
            :preview-src-list="form.picUrls"
            v-for="item in form.picUrls"
            :key="item"
          >
          </el-image>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import state from "../state";
export default {
  name: "detail",
  data() {
    return {
      form: {},
      statusOptions: [],
      typeOptions: [],
    };
  },
  created() {},
  computed: {
    sign() {
      return state.lookSign;
    },
    title() {
      return state.lookTitle;
    },
  },
  watch: {
    sign(newV, oldV) {
      if (newV) {
        this.form = JSON.parse(JSON.stringify(state.item));
        this.getDicts("studentCourse_type").then((response) => {
          this.statusOptions = response.data;
        });
        this.getDicts("bill_type").then((response) => {
          this.typeOptions = response.data;
        });
        console.log(this.form);
      } else {
        this.form = {};
      }
    },
  },
  methods: {
    cancel() {
      state.lookSign = false;
    },
    handleClose() {
      state.lookSign = false;
    },
  },
};
</script>
<style scoped>
.margin {
  margin: 0;
}
</style>