// components/list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
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
    tocourseDetail(e){
      wx.navigateTo({
        url: `/page/student/pages/coursedetail/coursedetail?id=${e.currentTarget.dataset.id}`,
      })
    },
    toteacher(e){
      wx.navigateTo({
        url: `/page/student/pages/teacher/teacher?id=${e.currentTarget.dataset.id}`,
      })
    },
    toplayback(e){
      wx.navigateTo({
        url: `/pages/playback/playback?id=${e.currentTarget.dataset.id}`,
      })
    }
  }
})
