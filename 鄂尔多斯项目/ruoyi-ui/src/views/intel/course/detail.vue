<template>
  <div class="course-detail">
    <el-dialog
      title="课程详情"
      :visible.sync="sign"
      append-to-body
      :before-close="handleClose"
      width="1000px"
    >
      <el-form ref="form" :model="form" label-width="115px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="课程名称：" class="margin">
              <div>{{ form.name }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上课地址：" class="margin">
              <div>{{ form.adress }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级名称：" class="margin">
              <div>{{ form.className }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="授课老师："
              class="margin"
              v-if="form.teacherName"
            >
              <div>{{ form.teacherName }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程开始时间：" class="margin">
              <div>{{ form.courseStartTime }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程结束时间：" class="margin">
              <div>{{ form.courseEndTime }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总人数：" class="margin" v-if="form.total">
              <div>{{ form.total }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="课程时长："
              class="margin"
              v-if="form.courseDuration"
            >
              <div>{{ form.courseDuration }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="培训方法：" class="margin" v-if="form.methods">
              <div>{{ form.methods }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程图片" prop="course_avatar">
              <el-image
                style="
                  width: 100px;
                  height: 100px;
                  margin-right: 10px;
                  margin-top: 10px;
                "
                :src="item"
                :preview-src-list="form.course_avatar"
                v-for="item in form.course_avatar"
                :key="item"
              >
              </el-image>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程状态：" class="margin">
              <dict-tag :options="typeOptions" :value="form.status" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="培训目的：" class="margin">
              <div v-html="form.introduction" class="mar"></div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import state from "./state";
export default {
  name: "detail",
  data() {
    return {
      form: {},
      typeOptions: [],
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
        this.getDicts("course_type").then((response) => {
          this.typeOptions = response.data;
        });
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
.mar {
  margin-top: -13px;
}
</style>