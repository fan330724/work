// components/goodslist/goodslist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array
    }
  },
  // observers: {
  //   'list': function (newValue) {
  //     // 在 numberA 或者 numberB 被设置时，执行这个函数
  //     setTimeout(() => {
  //       this.AutoHeight()
  //     }, 1500);
  //   }
  // },
  /**
   * 组件的初始数据
   */
  data: {
    height: null
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
      wx.navigateTo({
        url: `/pages/goods_detail/index?goods=${encodeURIComponent(JSON.stringify(e.currentTarget.dataset.goods))}`,
      })
    },
    // AutoHeight() {
    //   var that = this;
    //   let imgHeight = [];
    //   let nameHeight = [];
    //   const query = wx.createSelectorQuery().in(this)
    //   query.selectAll('#imgHeight').boundingClientRect()
    //   query.selectAll('.goods_name').boundingClientRect()
    //   query.exec(function (res) {
    //     res[0].map((item, index) => {
    //       // console.log(item, index);
    //       imgHeight.push(item.height);
    //     })
    //     res[1].map((item, index) => {
    //       // console.log(item, index);
    //       nameHeight.push(item.height);
    //     })
    //     imgHeight.map((item,index) => {
    //       nameHeight.map((v,i) => {
    //         var height = item + (v*2) + 100 + 'rpx'
    //         that.setData({
    //           height
    //         })
    //       })
          
    //     })
    //     console.log(imgHeight,nameHeight);
    //   })

      
    // }
  },
})