(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{3285:function(r,t,e){"use strict";e.r(t);var i=e("6263"),o=e.n(i);for(var n in i)"default"!==n&&function(r){e.d(t,r,(function(){return i[r]}))}(n);t["default"]=o.a},"4d97":function(r,t,e){var i=e("24fb");t=i(!1),t.push([r.i,".btn-submit[data-v-98b359d2]{height:auto!important;line-height:%?76?%}",""]),r.exports=t},6263:function(r,t,e){"use strict";var i=e("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("96cf");var o=i(e("3b8d")),n=i(e("2971")),a={data:function(){return{username:"",password:"",codes:[{num:1,color:"#000",rotate:"10deg",size:"16px"},{num:2,color:"#000",rotate:"10deg",size:"16px"},{num:3,color:"#000",rotate:"10deg",size:"16px"},{num:4,color:"#000",rotate:"10deg",size:"16px"}],options:["请选择登录用户类型"],optionsValues:["","xuesheng"],index:0,roleNum:0}},onLoad:function(){var r=["请选择登录用户类型"],t=n.default.list();this.menuList=t;for(var e=0;e<this.menuList.length;e++)"是"==this.menuList[e].hasFrontLogin&&(r.push(this.menuList[e].roleName),this.roleNum++);1==this.roleNum&&(this.index=1),this.options=r,this.styleChange()},methods:{styleChange:function(){this.$nextTick((function(){}))},onRegisterTap:function(r){uni.setStorageSync("loginTable",r),this.$utils.jump("../register/register")},onForgetTap:function(){this.$utils.jump("../forget/forget")},onLoginTap:function(){var r=(0,o.default)(regeneratorRuntime.mark((function r(){var t;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(this.username){r.next=3;break}return this.$utils.msg("请输入用户名"),r.abrupt("return");case 3:if(this.password){r.next=6;break}return this.$utils.msg("请输入用户密码"),r.abrupt("return");case 6:if(this.optionsValues[this.index]){r.next=9;break}return this.$utils.msg("请选择登陆用户类型"),r.abrupt("return");case 9:return r.next=11,this.$api.login("".concat(this.optionsValues[this.index]),{username:this.username,password:this.password});case 11:return t=r.sent,uni.removeStorageSync("useridTag"),uni.setStorageSync("token",t.token),uni.setStorageSync("nickname",this.username),uni.setStorageSync("nowTable","".concat(this.optionsValues[this.index])),r.next=18,this.$api.session("".concat(this.optionsValues[this.index]));case 18:t=r.sent,uni.setStorageSync("userid",t.data.id),t.data.vip&&uni.setStorageSync("vip",t.data.vip),uni.setStorageSync("role","".concat(this.options[this.index])),this.$utils.tab("../index/index");case 23:case"end":return r.stop()}}),r,this)})));function t(){return r.apply(this,arguments)}return t}(),optionsChange:function(r){this.index=r.target.value}}};t.default=a},"7d10":function(r,t,e){"use strict";var i,o=function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"box",style:{padding:"48rpx",boxShadow:"20rpx 20rpx 0px #f5f5f5",margin:"0 auto",borderColor:"#ccc",backgroundColor:"rgba(255, 255, 255, 1)",borderRadius:"40rpx",borderWidth:"0",width:"80%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"logo",style:{padding:"0",boxShadow:"0 2rpx 12rpx rgba(0,0,0,0)",margin:"0 0 24rpx",borderColor:"#ccc",backgroundColor:"#fff",borderRadius:"24rpx",borderWidth:"0",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-image",{style:{padding:"0",boxShadow:"0 0 0px #59f43e",margin:"0 auto",borderColor:"#ccc",borderRadius:"50%",borderWidth:"0",width:"160rpx",borderStyle:"solid",url:"http://codegen.caihongy.cn/20220221/e324aa2e1ac1401aa931573aeb507160.jfif",isShow:!0,height:"160rpx"},attrs:{src:"http://codegen.caihongy.cn/20220221/e324aa2e1ac1401aa931573aeb507160.jfif",mode:"aspectFill"}})],1),e("v-uni-view",{staticClass:"uni-form-item uni-column",style:{padding:"0",boxShadow:"0 2rpx 12rpx rgba(0,0,0,0)",margin:"0 0 24rpx",borderColor:"#ccc",backgroundColor:"#fff",borderRadius:"24rpx",borderWidth:"0",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-input",{staticClass:"uni-input",style:{padding:"0 24rpx",boxShadow:"0 4rpx 0px #BDDFE5",margin:"0",borderColor:"rgba(189, 223, 229, 1)",backgroundColor:"#fff",color:"rgba(159, 152, 152, 1)",textAlign:"left",borderRadius:"40rpx",borderWidth:"4rpx",width:"100%",fontSize:"24rpx",borderStyle:"solid",height:"76rpx"},attrs:{type:"text",name:"",placeholder:"请输入账号"},model:{value:r.username,callback:function(t){r.username=t},expression:"username"}})],1),e("v-uni-view",{staticClass:"uni-form-item uni-column",style:{padding:"0",boxShadow:"0 2rpx 12rpx rgba(0,0,0,0)",margin:"0 0 24rpx",borderColor:"#ccc",backgroundColor:"#fff",borderRadius:"24rpx",borderWidth:"0",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-input",{staticClass:"uni-input",style:{padding:"0 24rpx",boxShadow:"0 4rpx 0px #BDDFE5",margin:"0",borderColor:"rgba(189, 223, 229, 1)",backgroundColor:"#fff",color:"rgba(159, 152, 152, 1)",textAlign:"left",borderRadius:"40rpx",borderWidth:"4rpx",width:"100%",fontSize:"24rpx",borderStyle:"solid",height:"76rpx"},attrs:{type:"password",name:"",placeholder:"请输入密码"},model:{value:r.password,callback:function(t){r.password=t},expression:"password"}})],1),r.roleNum>1?e("v-uni-view",{staticClass:"uni-form-item uni-column",style:{padding:"0",boxShadow:"0 2rpx 12rpx rgba(0,0,0,0)",margin:"0 0 24rpx",borderColor:"#ccc",backgroundColor:"#fff",borderRadius:"24rpx",borderWidth:"0",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-picker",{attrs:{value:r.index,range:r.options},on:{change:function(t){arguments[0]=t=r.$handleEvent(t),r.optionsChange.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"uni-picker-type",style:{padding:"0 24rpx",boxShadow:"0 4rpx 0px #BDDFE5",margin:"0",borderColor:"rgba(189, 223, 229, 1)",backgroundColor:"rgba(255, 255, 255, 1)",color:"rgba(162, 157, 157, 1)",textAlign:"left",borderRadius:"40rpx",borderWidth:"4rpx",width:"100%",lineHeight:"76rpx",fontSize:"26rpx",borderStyle:"solid"}},[r._v(r._s(r.options[r.index]))])],1)],1):r._e(),e("v-uni-button",{staticClass:"btn-submit",style:{padding:"0",boxShadow:"0 2rpx 12rpx rgba(0,0,0,0)",margin:"0",borderColor:"rgba(189, 223, 229, 1)",backgroundColor:"rgba(189, 223, 229, 1)",borderRadius:"30rpx",color:"rgba(24, 24, 24, 1)",borderWidth:"2rpx",width:"100%",fontSize:"30rpx",borderStyle:"solid",height:"76rpx"},attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=r.$handleEvent(t),r.onLoginTap.apply(void 0,arguments)}}},[r._v("登录")]),e("v-uni-view",{staticClass:"links",style:{padding:"0",boxShadow:"0 2rpx 12rpx rgba(0,0,0,0)",margin:"0 0 24rpx",borderColor:"#ccc",backgroundColor:"#fff",borderRadius:"24rpx",borderWidth:"0",width:"100%",borderStyle:"solid",height:"auto"}},[e("v-uni-view",{staticClass:"link-highlight",style:{padding:"0",boxShadow:"0 2rpx 12rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"rgba(176, 174, 170, 1)",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"100%",lineHeight:"36rpx",fontSize:"24rpx",borderStyle:"solid"},on:{click:function(t){arguments[0]=t=r.$handleEvent(t),r.onRegisterTap("xuesheng")}}},[r._v("注册学生")]),e("v-uni-view",{style:{padding:"0",boxShadow:"0 2rpx 12rpx rgba(0,0,0,0)",margin:"0",borderColor:"#ccc",backgroundColor:"rgba(0,0,0,0)",color:"#999",textAlign:"center",borderRadius:"0",borderWidth:"0",width:"100%",lineHeight:"76rpx",fontSize:"24rpx",borderStyle:"solid"},on:{click:function(t){arguments[0]=t=r.$handleEvent(t),r.onForgetTap.apply(void 0,arguments)}}},[r._v("忘记密码？")])],1)],1)],1)},n=[];e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return n})),e.d(t,"a",(function(){return i}))},8205:function(r,t,e){"use strict";var i=e("b451"),o=e.n(i);o.a},"9aa2":function(r,t,e){var i=e("24fb");t=i(!1),t.push([r.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.content[data-v-98b359d2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;height:calc(100vh - 44px);box-sizing:border-box}.content[data-v-98b359d2]:after{position:fixed;top:0;right:0;left:0;bottom:0;content:"";background-image:url(http://codegen.caihongy.cn/20220221/3765226ce27e4cecba5fb16df7e0647d.png);background-attachment:fixed;background-size:cover;background-position:50%}.logo[data-v-98b359d2]{text-align:center}.logo uni-image[data-v-98b359d2]{height:%?200?%;width:%?200?%;margin:0 0 %?60?%}.uni-form-item[data-v-98b359d2]{margin-bottom:%?40?%;padding:0}.uni-form-item .uni-input[data-v-98b359d2]{font-size:%?30?%;padding:7px 0}uni-button[type="primary"][data-v-98b359d2]{background-color:#b49950;border-radius:0;font-size:%?34?%;margin-top:%?60?%}.links[data-v-98b359d2]{margin-top:%?40?%;font-size:%?26?%;color:#999}.links uni-view[data-v-98b359d2]{display:inline-block;vertical-align:top;margin:0 %?10?%}.links .link-highlight[data-v-98b359d2]{margin:0;color:#b49950}',""]),r.exports=t},a86a:function(r,t,e){"use strict";e.r(t);var i=e("7d10"),o=e("3285");for(var n in o)"default"!==n&&function(r){e.d(t,r,(function(){return o[r]}))}(n);e("8205"),e("c837");var a,d=e("f0c5"),s=Object(d["a"])(o["default"],i["b"],i["c"],!1,null,"98b359d2",null,!1,i["a"],a);t["default"]=s.exports},b451:function(r,t,e){var i=e("4d97");"string"===typeof i&&(i=[[r.i,i,""]]),i.locals&&(r.exports=i.locals);var o=e("4f06").default;o("8e2c4620",i,!0,{sourceMap:!1,shadowMode:!1})},c837:function(r,t,e){"use strict";var i=e("d11d"),o=e.n(i);o.a},d11d:function(r,t,e){var i=e("9aa2");"string"===typeof i&&(i=[[r.i,i,""]]),i.locals&&(r.exports=i.locals);var o=e("4f06").default;o("20183cba",i,!0,{sourceMap:!1,shadowMode:!1})}}]);