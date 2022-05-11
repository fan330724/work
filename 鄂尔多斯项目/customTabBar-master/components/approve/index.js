// components/approve/index.js
import http from "../../request/staff"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    leaveType: [{
      id: 0,
      name: "事假"
    }], //请假类型列表
    startChange: "", //请假类型
    dateChange: "", //开始时间
    endDateChange: "", //结束时间
    timeChange: "0", //请假时长
    contentChange: "", //请假事由
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindStartChange(e) {
      let {
        value
      } = e.detail;
      this.setData({
        startChange: this.data.leaveType[value].name
      })
    },
    bindDateChange(e) {
      let {
        dateString
      } = e.detail;
      this.setData({
        dateChange: dateString,
      })

    },
    bindEndDateChange(e) {
      let {
        dateString
      } = e.detail;
      let dateChange = new Date(this.data.dateChange.replace(/-/g, "/"));
      let endDate = new Date(dateString.replace(/-/g, "/"));

      let year1 = this.data.dateChange.substring(0, 4);
      let month1 = this.data.dateChange.substring(5, 7);
      let day1 = this.data.dateChange.substring(8, 10);
      let year2 = dateString.substring(0, 4);
      let month2 = dateString.substring(5, 7);
      let day2 = dateString.substring(8, 10);
      if (this.data.dateChange == "") {
        wx.showToast({
          title: '请选择开始时间',
          mask: true,
          icon: "error"
        })
      } else if (dateChange.getTime() >= endDate.getTime()) {
        wx.showToast({
          title: '请选择大于开始时间',
          mask: true,
          icon: "none"
        })
      } else {
        this.setData({
          endDateChange: dateString
        })
        let hour = parseInt((endDate.getTime() - dateChange.getTime()) / (1000 * 60 * 60))
        let day = parseInt((endDate.getTime() - dateChange.getTime()) / (1000 * 60 * 60 * 24))

        if (year1 == year2 && month1 == month2 && day1 == day2) {
          console.log(111);
          if (hour >= 0 && hour <= 3) {
            this.setData({
              timeChange: "0.5"
            })
          } else {
            this.setData({
              timeChange: "1"
            })
          }
        } else if (year1 < year2 || month1 < month2 || day1 < day2) {
          this.setData({
            timeChange: day
          })
        }

      }
    },
    bindContentChange(e) {
      let {
        value
      } = e.detail;
      this.setData({
        contentChange: value
      })
    },
    bindSubmit() {
      let {
        startChange,
        dateChange,
        endDateChange,
        timeChange,
        contentChange
      } = this.data;
      if (startChange == "") {
        wx.showToast({
          title: '请选择请假类型',
          mask: true,
          icon: 'error'
        })
      } else if (dateChange == "") {
        wx.showToast({
          title: '请选择开始时间',
          mask: true,
          icon: 'error'
        })
      } else if (endDateChange == "") {
        wx.showToast({
          title: '请选择结束时间',
          mask: true,
          icon: 'error'
        })
      } else if (contentChange == "") {
        wx.showToast({
          title: '请输入请假事由',
          mask: true,
          icon: 'error'
        })
      } else {
        http.addleave({
          userid: wx.getStorageSync('userInfo').data.userId,
          startTime: dateChange,
          endTime: endDateChange,
          total: timeChange,
          reason: contentChange,
          remark: startChange,
          status: 1
        }).then(res => {
          let {
            code,
            msg
          } = res.data;
          if (code == 200) {
            wx.showToast({
              title: '提交成功',
              mask: true,

            })
            setTimeout(() => {
              wx.navigateBack()
            }, 1500);
          } else {
            wx.showToast({
              title: msg,
              icon: "none",
              mask: true
            })
          }
        })
      }
    },
  }
})