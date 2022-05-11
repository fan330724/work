// components/inforlist/index.js
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
    ondetail(e){
      let {id} = e.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/informationDetail/informationDetail?id=${id}`,
      })
    }
  }
})
