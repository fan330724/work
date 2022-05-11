// components/repair/repair.js
import http from "../../request/staff";
let app = getApp()
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
    pics: [], //图片
    value: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 图片上传
     * 
     */
    //选择图片
    chooseImage() {
      var that = this,
        pics = this.data.pics;
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
            url: app.data.url + '/api-min/course/apprisePicUpload',
            filePath: tempFilePaths[0],
            name: 'file',
            success(res) {
              let img = JSON.parse(res.data);
              pics.push(app.data.url + img.imgUrl)
              that.setData({
                pics: pics,
              })
            }
          })
        },
      });
    },
    // 删除图片
    deleteImg: function (e) {
      var pics = this.data.pics;
      var index = e.currentTarget.dataset.index;
      pics.splice(index, 1);
      this.setData({
        pics: pics,
      })
    },

    onSubmit(e) {
      let {
        repair,
        repairDetail
      } = e.detail.value;
      if (repair == "") {
        wx.showToast({
          title: '请输入报修详情',
          icon: 'error',
          mask: true
        })
      } else if (repairDetail == "") {
        wx.showToast({
          title: '请输入采购明细',
          icon: 'error',
          mask: true
        })
      } else {
        http.addrepair({
          userid: wx.getStorageSync('userInfo').data.userId,
          content: repair,
          detail: repairDetail,
          picUrl: this.data.pics[0] + ',' + this.data.pics[1] + ',' + this.data.pics[2],
        }).then(res => {
          let {
            msg,
            code
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
              mask: true
            })
          }
        })
      }
    },
    handleChange(e) {
      this.setData({
        value: e.detail.dateString
      })
    },
  }
})