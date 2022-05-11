// components/apprase/index.js
import getUserStart from "../../utils/http"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lists:{
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  attached(){
    this.setData({
      getUserStart:getUserStart.getUserStart()
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //修改请假状态
    editvacations(e) {
      let {
        status,
        id
      } = e.currentTarget.dataset;
      this.triggerEvent("editvacation",{id,status})
    },
  }
})