<template>
  <div>
    <el-dialog
      title="评价详情"
      :visible.sync="sign"
      append-to-body
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="课程名称：" class="margin" v-if="form.courseName">
          <div>{{ form.courseName }}</div>
        </el-form-item>
        <el-form-item label="老师名称：" class="margin" v-if="form.teacherName">
          <div>{{ form.teacherName }}</div>
        </el-form-item>
        <el-form-item label="评价人：" class="margin">
          <div>{{ form.studentName }}</div>
        </el-form-item>
        <el-form-item label="评分：" class="margin">
          <div style="display: flex; align-items: center">
            <span style="margin-right: 5px" v-if="form.type == 1">教师评价</span>
            <span style="margin-right: 5px" v-if="form.type == 2">饭菜质量</span>
            <span style="margin-right: 5px" v-if="form.type == 3">住宿环境</span>
            <el-rate
              v-model="form.teacherScore"
              disabled
              score-template="{value}"
            >
            </el-rate>
          </div>
          <div style="display: flex; align-items: center">
            <span style="margin-right: 5px" v-if="form.type == 1">课程质量</span>
            <span style="margin-right: 5px" v-if="form.type == 2">饭菜卫生</span>
            <span style="margin-right: 5px" v-if="form.type == 3">住宿卫生</span>
            <el-rate
              v-model="form.restaurantScore"
              disabled
              score-template="{value}"
            >
            </el-rate>
          </div>
          <div style="display: flex; align-items: center">
            <span style="margin-right: 5px">总体评价</span>
            <el-rate
              v-model="form.accommodationScore"
              disabled
              score-template="{value}"
            >
            </el-rate>
          </div>
        </el-form-item>
        <el-form-item label="评价内容：" class="margin">
          <div>{{ form.content }}</div>
        </el-form-item>
        <el-form-item label="心得体会：" class="margin" v-if="form.experience ">
          <div>{{ form.experience }}</div>
        </el-form-item>
        
        <el-form-item label="评价时间：" class="margin">
          <div>{{ form.createTime }}</div>
        </el-form-item>
        <el-form-item label="评价图片：" class="margin" v-if="form.picUrls && form.picUrls != 'undefined'">
          <el-image
            style="
              width: 100px;
              height: 100px;
              margin-right: 10px;
              margin-top: 10px;
            "
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
    };
  },
  created() {},
  computed: {
    sign() {
      return state.lookSign;
    },
  },
  watch: {
    sign(newV, oldV) {
      if (newV) {
        this.form = JSON.parse(JSON.stringify(state.item));
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