(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-renwuxinxi-add-or-update"],{3430:function(r,e,i){var t=i("24fb");e=t(!1),e.push([r.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.container[data-v-ab30b258]{padding:%?20?%}.content[data-v-ab30b258]:after{position:fixed;top:0;right:0;left:0;bottom:0;content:"";background-image:url(http://codegen.caihongy.cn/20220221/0f8fd9cec3184a63ad610f92e90f97c1.png);background-attachment:fixed;background-size:cover;background-position:50%}uni-textarea[data-v-ab30b258]{border:%?1?% solid #eee;border-radius:%?20?%;padding:%?20?%}.title[data-v-ab30b258]{width:%?180?%}.avator[data-v-ab30b258]{width:%?150?%;height:%?60?%}.right-input[data-v-ab30b258]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:left;padding:0 %?24?%}.cu-form-group.active[data-v-ab30b258]{-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.btn[data-v-ab30b258]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:%?20?% 0}.cu-form-group[data-v-ab30b258]{padding:0 %?24?%;background-color:initial;min-height:inherit}.cu-form-group + .cu-form-group[data-v-ab30b258]{border:0}.cu-form-group uni-input[data-v-ab30b258]{padding:0 %?30?%}.uni-input[data-v-ab30b258]{padding:0 %?30?%}.cu-form-group uni-textarea[data-v-ab30b258]{padding:%?30?%;margin:0}.cu-form-group uni-picker[data-v-ab30b258]::after{line-height:%?60?%}.select .uni-input[data-v-ab30b258]{line-height:%?60?%}.input .right-input[data-v-ab30b258]{line-height:%?68?%}',""]),r.exports=e},8588:function(r,e,i){"use strict";var t,n=function(){var r=this,e=r.$createElement,i=r._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-form",{staticClass:"app-update-pv"},[i("v-uni-view",{staticClass:"cu-form-group",style:{padding:"0 12rpx",boxShadow:"0 0 0px rgba(0,0,0,.3)",margin:"0 0 20rpx 0",borderColor:"#ccc",backgroundColor:"rgba(255, 255, 255, 1)",borderRadius:"0",borderWidth:"0",width:"100%",borderStyle:"solid",height:"108rpx"}},[i("v-uni-view",{staticClass:"title",style:{padding:"0",boxShadow:"0 0 16rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"rgba(161, 161, 161, 1)",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"160rpx",lineHeight:"80rpx",fontSize:"28rpx",borderStyle:"solid"}},[r._v("任务名称")]),i("v-uni-input",{style:{padding:"0 30rpx",boxShadow:"0 0 0px rgba(0,0,0,.6) inset",margin:"0",borderColor:"rgba(16, 55, 94, 1)",backgroundColor:"rgba(255, 255, 255, 0)",color:"rgba(0, 0, 0, 1)",textAlign:"left",borderRadius:"0",borderWidth:"2rpx 2rpx 2rpx 8rpx",width:"calc(100% - 160rpx)",fontSize:"28rpx",borderStyle:"solid",height:"68rpx"},attrs:{disabled:r.ro.renwumingcheng,placeholder:"任务名称"},model:{value:r.ruleForm.renwumingcheng,callback:function(e){r.$set(r.ruleForm,"renwumingcheng",e)},expression:"ruleForm.renwumingcheng"}})],1),i("v-uni-view",{staticClass:"cu-form-group select",style:{padding:"0 12rpx",boxShadow:"0 0 0px rgba(0,0,0,.3)",backgroundColor:"rgba(255, 255, 255, 1)",borderColor:"#ccc",margin:"0 0 20rpx 0",borderRadius:"0",borderWidth:"0",width:"100%",borderStyle:"solid",height:"108rpx"}},[i("v-uni-view",{staticClass:"title",style:{padding:"0",boxShadow:"0 0 16rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"rgba(161, 161, 161, 1)",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"160rpx",lineHeight:"80rpx",fontSize:"28rpx",borderStyle:"solid"}},[r._v("任务类型")]),i("v-uni-picker",{attrs:{value:r.renwuleixingIndex,range:r.renwuleixingOptions},on:{change:function(e){arguments[0]=e=r.$handleEvent(e),r.renwuleixingChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-input",style:{padding:"0 30rpx",boxShadow:"0 0 0px rgba(0,0,0,.6) inset",margin:"0",backgroundColor:"rgba(255, 255, 255, 0)",borderColor:"rgba(16, 55, 94, 1)",color:"rgba(0, 0, 0, 1)",textAlign:"left",borderRadius:"0",borderWidth:"2rpx 2rpx 2rpx 8rpx",width:"calc(100% - 160rpx)",lineHeight:"60rpx",fontSize:"28rpx",borderStyle:"solid"}},[r._v(r._s(r.ruleForm.renwuleixing?r.ruleForm.renwuleixing:"请选择任务类型"))])],1)],1),i("v-uni-view",{staticClass:"cu-form-group",style:{padding:"0 12rpx",boxShadow:"0 0 0px rgba(0,0,0,.3)",backgroundColor:"rgba(255, 255, 255, 1)",borderColor:"#ccc",margin:"0 0 20rpx 0",borderRadius:"0",borderWidth:"0",width:"100%",borderStyle:"solid",height:"108rpx"},on:{click:function(e){arguments[0]=e=r.$handleEvent(e),r.tupianTap.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"title",style:{padding:"0",boxShadow:"0 0 16rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"rgba(161, 161, 161, 1)",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"160rpx",lineHeight:"80rpx",fontSize:"28rpx",borderStyle:"solid"}},[r._v("图片")]),i("v-uni-view",{staticClass:"right-input",staticStyle:{padding:"0"}},[r.ruleForm.tupian?i("v-uni-image",{staticClass:"avator",style:{padding:"0",boxShadow:"0 0 0px rgba(0,0,0,.3)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",borderRadius:"100%",borderWidth:"0",width:"88rpx",borderStyle:"solid",height:"88rpx"},attrs:{src:r.baseUrl+r.ruleForm.tupian,mode:"aspectFill"}}):i("v-uni-image",{staticClass:"avator",style:{padding:"0",boxShadow:"0 0 0px rgba(0,0,0,.3)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",borderRadius:"100%",borderWidth:"0",width:"88rpx",borderStyle:"solid",height:"88rpx"},attrs:{src:"../../static/gen/upload.png",mode:"aspectFill"}})],1)],1),i("v-uni-view",{staticClass:"cu-form-group",style:{padding:"0 12rpx",boxShadow:"0 0 0px rgba(0,0,0,.3)",margin:"0 0 20rpx 0",borderColor:"#ccc",backgroundColor:"rgba(255, 255, 255, 1)",borderRadius:"0",borderWidth:"0",width:"100%",borderStyle:"solid",height:"108rpx"}},[i("v-uni-view",{staticClass:"title",style:{padding:"0",boxShadow:"0 0 16rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"rgba(161, 161, 161, 1)",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"160rpx",lineHeight:"80rpx",fontSize:"28rpx",borderStyle:"solid"}},[r._v("任务时间")]),i("v-uni-input",{style:{padding:"0 30rpx",boxShadow:"0 0 0px rgba(0,0,0,.6) inset",margin:"0",borderColor:"rgba(16, 55, 94, 1)",backgroundColor:"rgba(255, 255, 255, 0)",color:"rgba(0, 0, 0, 1)",textAlign:"left",borderRadius:"0",borderWidth:"2rpx 2rpx 2rpx 8rpx",width:"calc(100% - 160rpx)",fontSize:"28rpx",borderStyle:"solid",height:"68rpx"},attrs:{disabled:r.ro.renwushijian,placeholder:"任务时间"},model:{value:r.ruleForm.renwushijian,callback:function(e){r.$set(r.ruleForm,"renwushijian",e)},expression:"ruleForm.renwushijian"}})],1),i("v-uni-view",{staticClass:"cu-form-group",style:{padding:"0 12rpx",boxShadow:"0 0 0px rgba(0,0,0,.3)",margin:"0 0 20rpx 0",borderColor:"#ccc",backgroundColor:"rgba(255, 255, 255, 1)",borderRadius:"0",borderWidth:"0",width:"100%",borderStyle:"solid",height:"108rpx"}},[i("v-uni-view",{staticClass:"title",style:{padding:"0",boxShadow:"0 0 16rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"rgba(161, 161, 161, 1)",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"160rpx",lineHeight:"80rpx",fontSize:"28rpx",borderStyle:"solid"}},[r._v("人数")]),i("v-uni-input",{style:{padding:"0 30rpx",boxShadow:"0 0 0px rgba(0,0,0,.6) inset",margin:"0",borderColor:"rgba(16, 55, 94, 1)",backgroundColor:"rgba(255, 255, 255, 0)",color:"rgba(0, 0, 0, 1)",textAlign:"left",borderRadius:"0",borderWidth:"2rpx 2rpx 2rpx 8rpx",width:"calc(100% - 160rpx)",fontSize:"28rpx",borderStyle:"solid",height:"68rpx"},attrs:{disabled:r.ro.renshu,placeholder:"人数"},model:{value:r.ruleForm.renshu,callback:function(e){r.$set(r.ruleForm,"renshu",e)},expression:"ruleForm.renshu"}})],1),i("v-uni-view",{staticClass:"cu-form-group",style:{padding:"0 12rpx",boxShadow:"0 0 0px rgba(0,0,0,.3)",margin:"0 0 20rpx 0",borderColor:"#ccc",backgroundColor:"rgba(255, 255, 255, 1)",borderRadius:"0",borderWidth:"0",width:"100%",borderStyle:"solid",height:"108rpx"}},[i("v-uni-view",{staticClass:"title",style:{padding:"0",boxShadow:"0 0 16rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"rgba(161, 161, 161, 1)",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"160rpx",lineHeight:"80rpx",fontSize:"28rpx",borderStyle:"solid"}},[r._v("获得积分")]),i("v-uni-input",{style:{padding:"0 30rpx",boxShadow:"0 0 0px rgba(0,0,0,.6) inset",margin:"0",borderColor:"rgba(16, 55, 94, 1)",backgroundColor:"rgba(255, 255, 255, 0)",color:"rgba(0, 0, 0, 1)",textAlign:"left",borderRadius:"0",borderWidth:"2rpx 2rpx 2rpx 8rpx",width:"calc(100% - 160rpx)",fontSize:"28rpx",borderStyle:"solid",height:"68rpx"},attrs:{disabled:r.ro.huodejifen,placeholder:"获得积分"},model:{value:r.ruleForm.huodejifen,callback:function(e){r.$set(r.ruleForm,"huodejifen",e)},expression:"ruleForm.huodejifen"}})],1),i("v-uni-view",{staticClass:"cu-form-group",style:{padding:"0 12rpx",boxShadow:"0 0 0px rgba(0,0,0,.3)",margin:"0 0 20rpx 0",borderColor:"#ccc",backgroundColor:"rgba(255, 255, 255, 1)",borderRadius:"0",borderWidth:"0",width:"100%",borderStyle:"solid",height:"108rpx"}},[i("v-uni-view",{staticClass:"title",style:{padding:"0",boxShadow:"0 0 16rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"rgba(161, 161, 161, 1)",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"160rpx",lineHeight:"80rpx",fontSize:"28rpx",borderStyle:"solid"}},[r._v("任务地点")]),i("v-uni-input",{style:{padding:"0 30rpx",boxShadow:"0 0 0px rgba(0,0,0,.6) inset",margin:"0",borderColor:"rgba(16, 55, 94, 1)",backgroundColor:"rgba(255, 255, 255, 0)",color:"rgba(0, 0, 0, 1)",textAlign:"left",borderRadius:"0",borderWidth:"2rpx 2rpx 2rpx 8rpx",width:"calc(100% - 160rpx)",fontSize:"28rpx",borderStyle:"solid",height:"68rpx"},attrs:{disabled:r.ro.renwudidian,placeholder:"任务地点"},model:{value:r.ruleForm.renwudidian,callback:function(e){r.$set(r.ruleForm,"renwudidian",e)},expression:"ruleForm.renwudidian"}})],1),i("v-uni-view",{staticClass:"cu-form-group",style:{padding:"0 12rpx",boxShadow:"0 0 0px rgba(0,0,0,.3)",margin:"0 0 20rpx 0",borderColor:"#ccc",backgroundColor:"rgba(255, 255, 255, 1)",borderRadius:"0",borderWidth:"0",width:"100%",borderStyle:"solid",height:"108rpx"}},[i("v-uni-view",{staticClass:"title",style:{padding:"0",boxShadow:"0 0 16rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"rgba(161, 161, 161, 1)",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"160rpx",lineHeight:"80rpx",fontSize:"28rpx",borderStyle:"solid"}},[r._v("账号")]),i("v-uni-input",{style:{padding:"0 30rpx",boxShadow:"0 0 0px rgba(0,0,0,.6) inset",margin:"0",borderColor:"rgba(16, 55, 94, 1)",backgroundColor:"rgba(255, 255, 255, 0)",color:"rgba(0, 0, 0, 1)",textAlign:"left",borderRadius:"0",borderWidth:"2rpx 2rpx 2rpx 8rpx",width:"calc(100% - 160rpx)",fontSize:"28rpx",borderStyle:"solid",height:"68rpx"},attrs:{disabled:r.ro.zhanghao,placeholder:"账号"},model:{value:r.ruleForm.zhanghao,callback:function(e){r.$set(r.ruleForm,"zhanghao",e)},expression:"ruleForm.zhanghao"}})],1),i("v-uni-view",{staticClass:"cu-form-group",style:{padding:"0 12rpx",boxShadow:"0 0 0px rgba(0,0,0,.3)",margin:"0 0 20rpx 0",borderColor:"#ccc",backgroundColor:"rgba(255, 255, 255, 1)",borderRadius:"0",borderWidth:"0",width:"100%",borderStyle:"solid",height:"108rpx"}},[i("v-uni-view",{staticClass:"title",style:{padding:"0",boxShadow:"0 0 16rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"rgba(161, 161, 161, 1)",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"160rpx",lineHeight:"80rpx",fontSize:"28rpx",borderStyle:"solid"}},[r._v("青协名称")]),i("v-uni-input",{style:{padding:"0 30rpx",boxShadow:"0 0 0px rgba(0,0,0,.6) inset",margin:"0",borderColor:"rgba(16, 55, 94, 1)",backgroundColor:"rgba(255, 255, 255, 0)",color:"rgba(0, 0, 0, 1)",textAlign:"left",borderRadius:"0",borderWidth:"2rpx 2rpx 2rpx 8rpx",width:"calc(100% - 160rpx)",fontSize:"28rpx",borderStyle:"solid",height:"68rpx"},attrs:{disabled:r.ro.qingxiemingcheng,placeholder:"青协名称"},model:{value:r.ruleForm.qingxiemingcheng,callback:function(e){r.$set(r.ruleForm,"qingxiemingcheng",e)},expression:"ruleForm.qingxiemingcheng"}})],1),i("v-uni-view",{staticClass:"cu-form-group",style:{padding:"0 12rpx",boxShadow:"0 0 0px rgba(0,0,0,.3)",backgroundColor:"rgba(255, 255, 255, 1)",borderColor:"#ccc",margin:"0 0 20rpx 0",borderRadius:"0",borderWidth:"0",width:"100%",borderStyle:"solid",height:"308rpx"}},[i("v-uni-view",{staticClass:"title",style:{padding:"0",boxShadow:"0 0 16rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"rgba(161, 161, 161, 1)",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"160rpx",lineHeight:"80rpx",fontSize:"28rpx",borderStyle:"solid"}},[r._v("任务要求")]),i("v-uni-textarea",{style:{padding:"20rpx",boxShadow:"0 0 0px rgba(0,0,0,.6) inset",margin:"0",backgroundColor:"rgba(255, 255, 255, 0)",borderColor:"rgba(16, 55, 94, 1)",borderRadius:"0",color:"rgba(0, 0, 0, 1)",borderWidth:"2rpx 2rpx 2rpx 8rpx ",width:"calc(100% - 160rpx)",fontSize:"28rpx",borderStyle:"solid",height:"280rpx"},attrs:{placeholder:"任务要求"},model:{value:r.ruleForm.renwuyaoqiu,callback:function(e){r.$set(r.ruleForm,"renwuyaoqiu",e)},expression:"ruleForm.renwuyaoqiu"}})],1),i("v-uni-view",{staticClass:"btn"},[i("v-uni-button",{staticClass:"bg-red",style:{padding:"0",boxShadow:"0 0 0px rgba(0,0,0,0) inset",margin:"0 auto",backgroundColor:"rgba(189, 223, 229, 1)",borderColor:"#409EFF",borderRadius:"88rpx",color:"rgba(0, 0, 0, 1)",borderWidth:"0",width:"60%",fontSize:"28rpx",borderStyle:"solid",height:"80rpx"},on:{click:function(e){arguments[0]=e=r.$handleEvent(e),r.onSubmitTap.apply(void 0,arguments)}}},[r._v("提交")])],1)],1)],1)},o=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return t}))},"8c1a":function(r,e,i){"use strict";var t=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("a481"),i("c5f6"),i("f559"),i("ac6a"),i("96cf");var n=t(i("3b8d")),o=t(i("e2b1")),a={data:function(){return{cross:"",ruleForm:{renwumingcheng:"",renwuleixing:"",tupian:"",renwushijian:"",renshu:"",huodejifen:"",renwudidian:"",renwuyaoqiu:"",zhanghao:"",qingxiemingcheng:""},renwuleixingOptions:[],renwuleixingIndex:0,user:{},ro:{renwumingcheng:!1,renwuleixing:!1,tupian:!1,renwushijian:!1,renshu:!1,huodejifen:!1,renwudidian:!1,renwuyaoqiu:!1,zhanghao:!1,qingxiemingcheng:!1}}},components:{wPicker:o.default},computed:{baseUrl:function(){return this.$base.url}},onLoad:function(){var r=(0,n.default)(regeneratorRuntime.mark((function r(e){var i,t,n,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return i=uni.getStorageSync("nowTable"),r.next=3,this.$api.session(i);case 3:return t=r.sent,this.user=t.data,r.next=7,this.$api.option("renwuleixing","renwuleixing",{});case 7:if(t=r.sent,this.renwuleixingOptions=t.data,this.ruleForm.userid=uni.getStorageSync("userid"),e.refid&&(this.ruleForm.refid=e.refid,this.ruleForm.nickname=uni.getStorageSync("nickname")),!e.id){r.next=17;break}return this.ruleForm.id=e.id,r.next=15,this.$api.info("renwuxinxi",this.ruleForm.id);case 15:t=r.sent,this.ruleForm=t.data;case 17:if(this.cross=e.cross,!e.cross){r.next=65;break}n=uni.getStorageSync("crossObj"),r.t0=regeneratorRuntime.keys(n);case 21:if((r.t1=r.t0()).done){r.next=65;break}if(o=r.t1.value,"renwumingcheng"!=o){r.next=27;break}return this.ruleForm.renwumingcheng=n[o],this.ro.renwumingcheng=!0,r.abrupt("continue",21);case 27:if("renwuleixing"!=o){r.next=31;break}return this.ruleForm.renwuleixing=n[o],this.ro.renwuleixing=!0,r.abrupt("continue",21);case 31:if("tupian"!=o){r.next=35;break}return this.ruleForm.tupian=n[o],this.ro.tupian=!0,r.abrupt("continue",21);case 35:if("renwushijian"!=o){r.next=39;break}return this.ruleForm.renwushijian=n[o],this.ro.renwushijian=!0,r.abrupt("continue",21);case 39:if("renshu"!=o){r.next=43;break}return this.ruleForm.renshu=n[o],this.ro.renshu=!0,r.abrupt("continue",21);case 43:if("huodejifen"!=o){r.next=47;break}return this.ruleForm.huodejifen=n[o],this.ro.huodejifen=!0,r.abrupt("continue",21);case 47:if("renwudidian"!=o){r.next=51;break}return this.ruleForm.renwudidian=n[o],this.ro.renwudidian=!0,r.abrupt("continue",21);case 51:if("renwuyaoqiu"!=o){r.next=55;break}return this.ruleForm.renwuyaoqiu=n[o],this.ro.renwuyaoqiu=!0,r.abrupt("continue",21);case 55:if("zhanghao"!=o){r.next=59;break}return this.ruleForm.zhanghao=n[o],this.ro.zhanghao=!0,r.abrupt("continue",21);case 59:if("qingxiemingcheng"!=o){r.next=63;break}return this.ruleForm.qingxiemingcheng=n[o],this.ro.qingxiemingcheng=!0,r.abrupt("continue",21);case 63:r.next=21;break;case 65:this.styleChange();case 66:case"end":return r.stop()}}),r,this)})));function e(e){return r.apply(this,arguments)}return e}(),methods:{styleChange:function(){this.$nextTick((function(){}))},renwuleixingChange:function(r){this.renwuleixingIndex=r.target.value,this.ruleForm.renwuleixing=this.renwuleixingOptions[this.renwuleixingIndex]},tupianTap:function(){var r=this;this.$api.upload((function(e){r.ruleForm.tupian="upload/"+e.file,r.$forceUpdate(),r.$nextTick((function(){r.styleChange()}))}))},getUUID:function(){return(new Date).getTime()},onSubmitTap:function(){var r=(0,n.default)(regeneratorRuntime.mark((function r(){var e,i,t,n,o,a,d,u,s,l;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(this.ruleForm.renwumingcheng){r.next=3;break}return this.$utils.msg("任务名称不能为空"),r.abrupt("return");case 3:if(this.ruleForm.renwuleixing){r.next=6;break}return this.$utils.msg("任务类型不能为空"),r.abrupt("return");case 6:if(this.ruleForm.renshu){r.next=9;break}return this.$utils.msg("人数不能为空"),r.abrupt("return");case 9:if(!this.ruleForm.renshu||this.$validate.isIntNumer(this.ruleForm.renshu)){r.next=12;break}return this.$utils.msg("人数应输入整数"),r.abrupt("return");case 12:if(this.ruleForm.huodejifen){r.next=15;break}return this.$utils.msg("获得积分不能为空"),r.abrupt("return");case 15:if(!this.cross){r.next=31;break}if(n=uni.getStorageSync("statusColumnName"),o=uni.getStorageSync("statusColumnValue"),""==n){r.next=31;break}if(a=uni.getStorageSync("crossObj"),n.startsWith("[")){r.next=27;break}for(d in a)d==n&&(a[d]=o);return u=uni.getStorageSync("crossTable"),r.next=25,this.$api.update("".concat(u),a);case 25:r.next=31;break;case 27:e=Number(uni.getStorageSync("userid")),i=a["id"],t=uni.getStorageSync("statusColumnName"),t=t.replace(/\[/,"").replace(/\]/,"");case 31:if(!i||!e){r.next=53;break}return this.ruleForm.crossuserid=e,this.ruleForm.crossrefid=i,s={page:1,limit:10,crossuserid:e,crossrefid:i},r.next=37,this.$api.list("renwuxinxi",s);case 37:if(l=r.sent,!(l.data.total>=t)){r.next=43;break}return this.$utils.msg(uni.getStorageSync("tips")),r.abrupt("return",!1);case 43:if(!this.ruleForm.id){r.next=48;break}return r.next=46,this.$api.update("renwuxinxi",this.ruleForm);case 46:r.next=50;break;case 48:return r.next=50,this.$api.add("renwuxinxi",this.ruleForm);case 50:this.$utils.msgBack("提交成功");case 51:r.next=61;break;case 53:if(!this.ruleForm.id){r.next=58;break}return r.next=56,this.$api.update("renwuxinxi",this.ruleForm);case 56:r.next=60;break;case 58:return r.next=60,this.$api.add("renwuxinxi",this.ruleForm);case 60:this.$utils.msgBack("提交成功");case 61:case"end":return r.stop()}}),r,this)})));function e(){return r.apply(this,arguments)}return e}(),optionsChange:function(r){this.index=r.target.value},bindDateChange:function(r){this.date=r.target.value},getDate:function(r){var e=new Date,i=e.getFullYear(),t=e.getMonth()+1,n=e.getDate();return"start"===r?i-=60:"end"===r&&(i+=2),t=t>9?t:"0"+t,n=n>9?n:"0"+n,"".concat(i,"-").concat(t,"-").concat(n)},toggleTab:function(r){this.$refs[r].show()}}};e.default=a},"8eb3":function(r,e,i){"use strict";i.r(e);var t=i("8c1a"),n=i.n(t);for(var o in t)"default"!==o&&function(r){i.d(e,r,(function(){return t[r]}))}(o);e["default"]=n.a},9614:function(r,e,i){"use strict";i.r(e);var t=i("8588"),n=i("8eb3");for(var o in n)"default"!==o&&function(r){i.d(e,r,(function(){return n[r]}))}(o);i("f047");var a,d=i("f0c5"),u=Object(d["a"])(n["default"],t["b"],t["c"],!1,null,"ab30b258",null,!1,t["a"],a);e["default"]=u.exports},de80:function(r,e,i){var t=i("3430");"string"===typeof t&&(t=[[r.i,t,""]]),t.locals&&(r.exports=t.locals);var n=i("4f06").default;n("8c15f8d4",t,!0,{sourceMap:!1,shadowMode:!1})},f047:function(r,e,i){"use strict";var t=i("de80"),n=i.n(t);n.a}}]);