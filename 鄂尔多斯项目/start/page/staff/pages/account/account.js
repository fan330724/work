// page/staff/pages/repair/repair.js
import http from "../../../../request/staff"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reimbursementlist: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request()
  },
  //员工端 获取数据
  request() {
    http.reimbursementlist().then(res => {
      let {
        data
      } = res.data;
      data.reduce((ele, item, index) => {
        return item.pics = []
      }, 0)
      this.setData({
        reimbursementlist: data
      })
    })
  },
  /**
   * 图片上传
   * 
   */
  //选择图片
  chooseImage(e) {
    var that = this;
    let {
      index
    } = e.currentTarget.dataset
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
            that.data.reimbursementlist[index].pics.push(app.data.url + img.imgUrl)
            that.data.reimbursementlist[index].active = true
            that.setData({
              reimbursementlist: that.data.reimbursementlist,
            })
          }
        })
        //console.log(wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"));
      },
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var {
      index,
      id
    } = e.currentTarget.dataset;
    var {
      reimbursementlist
    } = this.data;
    reimbursementlist[id].pics.splice(index, 1);
    delete reimbursementlist[id].active
    this.setData({
      reimbursementlist
    })
  },


  onSubmit(e) {
    let {
      repair
    } = e.detail.value;
    var {
      reimbursementlist
    } = this.data
    let start = reimbursementlist.filter((item, index) => {
      return item.active
    })
    console.log(start);
    if (repair == "") {
      wx.showToast({
        title: '请输入报账详情',
        icon: 'error',
        mask: true
      })
    } else if (start.length > 0) {
      var reimbursementId = [];
      var picUrl = [];
      start.reduce((ele,item,index) =>{
        reimbursementId.push(item.id);
        picUrl.push(item.pics)
      },0)
      console.log(picUrl);
      http.addreimbursement({
        reimbursementIds:reimbursementId,
        userid: wx.getStorageSync('userInfo').data.userId,
        content: repair,
        pictureUrls:picUrl,
      }).then(res => {
        console.log(res);
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
    } else {
      wx.showToast({
        title: '请上传类型图片',
        icon: 'error',
        mask: true
      })
    }
  },
})