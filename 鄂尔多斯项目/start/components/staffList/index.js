// components/staffList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 放大查看图片
    enlarge(e) {
      var {
        list,
        src
      } = e.currentTarget.dataset;
      wx.previewImage({
        urls: list,
        current: src
      })
    },
    tocourseDetail(e){
      this.triggerEvent("courseDetail",{id:e.currentTarget.dataset.id})
    }
  }
})