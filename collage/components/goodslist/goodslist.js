// components/goodslist/goodslist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
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
    addCart(e) {
      let {
        list
      } = e.currentTarget.dataset
      this.triggerEvent("addCart", {
        list
      })
    },
    togoodsdetail(e) {
      console.log(e);
      wx.navigateTo({
        url: `/pages/goods_detail/index?goods=${encodeURIComponent(JSON.stringify(e.currentTarget.dataset.goods))}`,
      })
      
      // wx.navigateTo({
      //   url: `/pages/goods_detail/index`,
      //   // events: {
      //   //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //   //   // acceptDataFromOpenedPage: function (data) {
      //   //   //   console.log(data) // 
      //   //   // },
      //   // },
      //   success: function (res) {
      //     // 通过eventChannel向被打开页面传送数据
      //     res.eventChannel.emit('acceptDataFromOpenerPage', {
      //       goods:e.currentTarget.dataset.goods
      //     })
      //   }
      // })

    }
  },

})