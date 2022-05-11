// components/start/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // evaluate_contant: ['教师评价', '就餐评价', '住宿评价'],
    stars: 5,
    normalSrc: '/images/nostars.png',
    selectedSrc: '/images/stars.png',
    scores: [],
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log(this.properties);
      this.properties.list.evaluate_contant.forEach((item, index) => {
        this.data.scores.push({
          score: 1,
          start: "非常差"
        })
        this.setData({
          scores: this.data.scores,
        })
      })
      this.triggerEvent("selectScore", this.data.scores)
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击右边,整颗星
    selectRight: function (e) {
      var {
        score,
        idx
      } = e.currentTarget.dataset;
      var start = "";
      switch (score) {
        case 1:
          start = "非常差";
          break;
        case 2:
          start = "差";
          break;
        case 3:
          start = "一般";
          break;
        case 4:
          start = "满意";
          break;
        case 5:
          start = "非常满意";
          break;
      }
      this.data.scores[idx] = {
        score: score,
        start
      };
      this.setData({
        scores: this.data.scores,
      })
      this.triggerEvent("selectScore", this.data.scores)
    }
  }
})