// components/pop/pop.js
import {
  request
} from "../../request/index"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    start: {
      type: Boolean,
      value: false
    },
    list: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    number: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //打开关闭弹窗
    bindClose() {
      this.triggerEvent('close')
    },
    //数量的编辑功能
    handleItemNumEdit(e) {
      const {
        operation
      } = e.currentTarget.dataset;
      if (operation == -1) {
        if (this.data.number == 1) {
          return
        } else {
          this.setData({
            number: this.data.number += operation
          })
        }
      } else {
        this.setData({
          number: this.data.number += operation
        })
      }
    },
    //加入购物车
    addCart(e) {
      let {
        list
      } = e.currentTarget.dataset;
      request({
          url: "addShoppingCart",
          data: {
            goodsId:list.children[0].goodsId,
            openId: wx.getStorageSync('userinfo').openId,
            specifiName:list.children[0].specifiName,
            price:list.children[0].price,
            specifiValue:list.children[0].specifiValue,
            num: this.data.number,
          }
        })
        .then(result => {
          if(result.errorCode == -1){
            wx.showToast({
              title: '添加成功',
              mask:true
            })
            wx.nextTick(() => {
              this.setData({
                start:false
              })
            })
          }else{
            wx.showToast({
              title: result.msg,
              icon: "none",
              mask: true
            })
          }
        })
    },
  }
})