<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :xs="12" :sm="24" :lg="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">学生总数</div>
            <count-to
              :start-val="0"
              :end-val="intel.userCount"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
          <div class="card-bottom">
            <div class="left">
              <span>男:</span>
              <count-to
                :start-val="0"
                :end-val="intel.manCount"
                :duration="2600"
                class="card-panel-num"
              />
            </div>
            <div class="right">
              <span>女:</span>
              <count-to
                :start-val="0"
                :end-val="intel.womanCount"
                :duration="2600"
                class="card-panel-num"
              />
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="24" :lg="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">近30天内新生</div>
            <count-to
              :start-val="0"
              :end-val="intel.monthCount"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
          <div class="card-bottom">
            <div class="left">
              <span>男:</span>
              <count-to
                :start-val="0"
                :end-val="intel.monthManCount"
                :duration="2600"
                class="card-panel-num"
              />
            </div>
            <div class="right">
              <span>女:</span>
              <count-to
                :start-val="0"
                :end-val="intel.monthWomanCount"
                :duration="2600"
                class="card-panel-num"
              />
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="24" :lg="8" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="card-panel-text">总课程</div>
            <count-to
              :start-val="0"
              :end-val="intel.totalcourse"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
          <div class="card-bottom">
            <div class="left">
              <span>待讲:</span>
              <count-to
                :start-val="0"
                :end-val="intel.registered"
                :duration="2600"
                class="card-panel-num"
              />
            </div>
            <div class="right">
              <span>完成:</span>
              <count-to
                :start-val="0"
                :end-val="intel.accomplish"
                :duration="2600"
                class="card-panel-num"
              />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="10">
        <div class="intel">
          <h3>老师名单</h3>
          <ul>
            <li v-for="(item, index) in teacherlist" :key="item.id">
              <div class="img">
                <img :src="item.avatar" alt=""/>
              </div>
              <div class="intel-panel">
                <h4>{{ item.name }}</h4>
                <div class="intel-bottom">
                  <div class="left">
                    <span>专业:</span>
                    <b>{{ item.subjectName }}</b>
                  </div>
                  <div class="right">
                    <span>讲授课程:</span>
                    <count-to
                      :start-val="0"
                      :end-val="item.totalcourse"
                      :duration="2600"
                      class="card-panel-num"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="button">
            <el-button
              size="medium"
              type="primary"
              style="width: 50%"
              @click.native.prevent="handleTeacher"
            >
              <span>查看全部</span>
            </el-button>
          </div>
        </div>
      </el-col>

      <!-- <el-col :sm="24" :lg="15">
        <div class="intel">
          <h3>学生名单</h3>
          <el-table v-loading="loading" :data="studentlist">
            <el-table-column label="学生名称" align="center" prop="name" />
            <el-table-column
              label="报名课程"
              align="center"
              prop="courseName"
            />
            <el-table-column
              label="报名时间"
              align="center"
              prop="createTime"
            />
            <el-table-column label="开课时间" align="center" prop="startTime" />
          </el-table>
          <div class="button">
            <el-button
              size="medium"
              type="primary"
              style="width: 50%"
              @click.native.prevent="handleStudent"
            >
              <span>查看全部</span>
            </el-button>
          </div>
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import { intel, teacherList, studentList } from "@/api/index";
export default {
  name: "Index",
  components: {
    CountTo,
  },
  data() {
    return {
      //顶部数据
      intel: "",
      //老师名单数据
      teacherlist: "",
      //学员名单数据
      studentlist: [],
      //表格加载
      loading: true,
      //定时器
      time:"",
    };
  },
  created() {
    intel().then((res) => {
      this.intel = res.data;
    });
    teacherList().then((res) => {
      console.log(res);
      let data = res.data;
      this.teacherlist = data;
    });
    // this.getstudent();
  },
  mounted() {
    this.time = setInterval(() => {
      intel().then((res) => {
        this.intel = res.data;
      });
      teacherList().then((res) => {
        console.log(res);
        let data = res.data;
        this.teacherlist = data;
      });
      // this.getstudent();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  methods: {
    getstudent() {
      this.loading = true;
      studentList().then((res) => {
        let data = res.data;
        this.studentlist = data;
        this.loading = false;
      });
    },
    handleTeacher() {
      this.$router.push({ path: "/tool/teacher" }).catch(() => {});
    },
    handleStudent() {
      this.$router.push({ path: "/tool/student" }).catch(() => {});
    },
  },
};
</script>

<style scoped lang="scss">
.card-panel {
  // height: 140px;
  cursor: pointer;
  font-size: 16px;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
  .card-panel-text {
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 15px;
  }
  .card-bottom {
    display: flex;
    margin-top: 20px;
    .left {
      margin-right: 30px;
    }
  }
  .card-panel-num {
    font-size: 20px;
  }
}
.intel {
  margin-top: 20px;
  // height: 430px;
  cursor: pointer;
  font-size: 16px;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 20px;
  li {
    display: flex;
    padding: 10px 0;
    .intel-panel {
      border-bottom: 1px solid #676a6c;
      padding-bottom: 20px;
      width: 75%;
      .intel-bottom {
        display: flex;
        margin-top: 10px;
        .left {
          margin-right: 30px;
          flex: 1;
        }
      }
    }
  }
  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
  .button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
.home {
  background-color: rgb(240, 242, 245);
  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }
}
</style>

