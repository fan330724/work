(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/jifenhuode/detail"],{"347b":function(t,e,n){"use strict";n.r(e);var s=n("70e6"),a=n.n(s);for(var r in s)"default"!==r&&function(t){n.d(e,t,function(){return s[t]})}(r);e["default"]=a.a},"4c8c":function(t,e,n){"use strict";n.r(e);var s=n("ecfd"),a=n("347b");for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n("fc66");var i,u=n("f0c5"),o=Object(u["a"])(a["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],i);e["default"]=o.exports},"615d":function(t,e,n){},"70e6":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=a(n("a34a"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,s,a,r,i){try{var u=t[r](i),o=u.value}catch(c){return void n(c)}u.done?e(o):Promise.resolve(o).then(s,a)}function i(t){return function(){var e=this,n=arguments;return new Promise(function(s,a){var i=t.apply(e,n);function u(t){r(i,s,a,u,o,"next",t)}function o(t){r(i,s,a,u,o,"throw",t)}u(void 0)})}}var u={data:function(){return{autoplaySwiper:!1,intervalSwiper:5e3,btnColor:["#409eff","#67c23a","#909399","#e6a23c","#f56c6c","#356c6c","#351c6c","#f093a9","#a7c23a","#104eff","#10441f","#a21233","#503319"],id:"",userid:"",detail:{},swiperList:[],commentList:[],mescroll:null,downOption:{auto:!1},upOption:{noMoreSize:3,textNoMore:"~ 没有更多了 ~"},hasNext:!0,user:{},sfshIndex:-1,sfshOptions:["通过","不通过"],count:0,timer:null}},computed:{baseUrl:function(){return this.$base.url},SecondToDate:function(){var t=this.count;return null!=t&&""!=t&&(t=t>60&&t<3600?parseInt(t/60)+"分钟"+parseInt(60*(parseFloat(t/60)-parseInt(t/60)))+"秒":t>=3600&&t<86400?parseInt(t/3600)+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟"+parseInt(60*(parseFloat(60*(parseFloat(t/3600)-parseInt(t/3600)))-parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))))+"秒":t>=86400?parseInt(t/3600/24)+"天"+parseInt(24*(parseFloat(t/3600/24)-parseInt(t/3600/24)))+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟"+parseInt(60*(parseFloat(60*(parseFloat(t/3600)-parseInt(t/3600)))-parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))))+"秒":parseInt(t)+"秒"),t}},onLoad:function(){var t=i(s.default.mark(function t(e){return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.id=e.id,e.userid&&(this.userid=e.userid);case 2:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),onShow:function(){var e=i(s.default.mark(function e(n){var a,r;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.init(),a=t.getStorageSync("nowTable"),e.next=4,this.$api.session(a);case 4:r=e.sent,this.user=r.data,this.btnColor=this.btnColor.sort(function(){return.5-Math.random()});case 7:case"end":return e.stop()}},e,this)}));function n(t){return e.apply(this,arguments)}return n}(),destroyed:function(){},methods:{onPayTap:function(){t.setStorageSync("paytable","jifenhuode"),t.setStorageSync("payObject",this.detail),this.$utils.jump("../pay-confirm/pay-confirm?type=1")},onAcrossTap:function(e,n,s,a,r){if(t.setStorageSync("crossTable","jifenhuode"),t.setStorageSync("crossObj",this.detail),t.setStorageSync("statusColumnName",s),t.setStorageSync("statusColumnValue",r),t.setStorageSync("tips",a),""!=s&&!s.startsWith("[")){var i=t.getStorageSync("crossObj");for(var u in i)if(u==s&&i[u]==r)return void this.$utils.msg(a)}this.$utils.jump("../".concat(e,"/add-or-update?cross=true"))},init:function(){var t=i(s.default.mark(function t(){var e;return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$api.info("jifenhuode",this.id);case 2:e=t.sent,this.detail=e.data,this.swiperList=this.detail.touxiang?this.detail.touxiang.split(","):[];case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),mescrollInit:function(t){this.mescroll=t},downCallback:function(t){this.hasNext=!0,t.resetUpScroll()},upCallback:function(){var t=i(s.default.mark(function t(e){return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e.endSuccess(e.size,this.hasNext);case 1:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),onChatTap:function(){this.$utils.jump("../chat/chat")},download:function(e){var n=this;e=n.$base.url+e,t.downloadFile({url:e,success:function(t){200===t.statusCode&&(n.$utils.msg("下载成功"),window.open(e))}})},onCartTabTap:function(){this.$utils.tab("../shop-cart/shop-cart")},onCommentTap:function(){var t=i(s.default.mark(function t(){return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$utils.jump("../discussjifenhuode/add-or-update?refid=".concat(this.id));case 1:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),onSHTap:function(){this.$refs.popup.open()},onFinishTap:function(){var t=i(s.default.mark(function t(){return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.detail.sfsh){t.next=3;break}return this.$utils.msg("请选择审核状态"),t.abrupt("return");case 3:if(this.detail.shhf){t.next=6;break}return this.$utils.msg("请填写审核回复"),t.abrupt("return");case 6:return"通过"==this.detail.sfsh&&(this.detail.sfsh="是"),"不通过"==this.detail.sfsh&&(this.detail.sfsh="否"),t.next=10,this.$api.update("jifenhuode",this.detail);case 10:this.$utils.msg("审核成功"),this.$refs.popup.close();case 12:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),onCloseWinTap:function(){this.$refs.popup.close()},sfshChange:function(t){console.log(this.detail),this.sfshIndex=t.target.value,this.detail.sfsh=this.sfshOptions[this.sfshIndex]}}};e.default=u}).call(this,n("543d")["default"])},ecfd:function(t,e,n){"use strict";var s={"mescroll-uni":()=>Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(n.bind(null,"d88e")),"uni-popup":()=>n.e("components/uni-popup/uni-popup").then(n.bind(null,"3fd7"))},a=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return r}),n.d(e,"a",function(){return s})},fc66:function(t,e,n){"use strict";var s=n("615d"),a=n.n(s);a.a},fe92:function(t,e,n){"use strict";(function(t){n("556c"),n("921b");s(n("66fd"));var e=s(n("4c8c"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["fe92","common/runtime","common/vendor"]]]);