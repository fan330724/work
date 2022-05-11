// pages/assess/assess.js
import http from "../../request/http"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [], //图片
    textarea: "",
    scores: [],
    list: {
      evaluate_contant: ['饭菜质量', '饭菜卫生', '总体评价']
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      type
    } = options;
    wx.setNavigationBarTitle({
      title: type + '评价',
    })
    this.setData({
      type,
      classId: options.classid
    })
    if (this.data.type == '就餐') {
      this.setData({
        list: {
          evaluate_contant: ['饭菜质量', '饭菜卫生', '总体评价']
        },
      })
    } else if (this.data.type == '住宿') {
      this.setData({
        list: {
          evaluate_contant: ['住宿环境', '住宿卫生', '总体评价']
        },
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  selectScore(e) {
    this.setData({
      scores: e.detail
    })
  },
  toinput(e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  request() {
    var type = 2;
    if (this.data.type == '就餐') {
      type = 2
    } else if (this.data.type == '住宿') {
      type = 3
    }
    http.toMinAppraise({
      userid: wx.getStorageSync('userInfo').data.userId,
      teacherScore: this.data.scores[0].score,
      restaurantScore: this.data.scores[1].score,
      accommodationScore: this.data.scores[2].score,
      content: this.data.textarea,
      type: type,
      classId: this.data.classId,
      picUrl: this.data.pics[0] + ',' + this.data.pics[1] + ',' + this.data.pics[2]
    }).then(res => {
      let {
        data,
        code,
        msg
      } = res.data;
      if (code == 200) {
        wx.showToast({
          title: '评价成功',
          mask: true,
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      } else {
        wx.showToast({
          title: msg,
          icon: "none",
          mask: true,
        })
      }
    })
  },
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
        // var base = wx.getFileSystemManager().readFileSync(tempFilePaths[0], "base64")
        wx.uploadFile({
          url: app.data.url + '/api-min/course/apprisePicUpload',
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            let img = JSON.parse(res.data);
            pics.push("https://stu.yikang.co" + img.imgUrl)
            that.setData({
              pics: pics,
            })
            console.log(pics);
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

  tosubmit() {
    var {
      textarea,
      scores
    } = this.data;
    if (textarea) {
      this.request()
    } else {
      wx.showToast({
        title: '请输入评价语！',
        mask: true,
        icon: "error"
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})