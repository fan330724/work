(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/renwujieshu/add-or-update"],{"0841":function(e,n,t){"use strict";t.r(n);var r=t("7e5a"),i=t("61b3");for(var a in i)"default"!==a&&function(e){t.d(n,e,function(){return i[e]})}(a);t("5c38");var u,s=t("f0c5"),o=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"d20726f4",null,!1,r["a"],u);n["default"]=o.exports},4124:function(e,n,t){"use strict";(function(e){t("556c"),t("921b");r(t("66fd"));var n=r(t("0841"));function r(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},"5c38":function(e,n,t){"use strict";var r=t("b1a2"),i=t.n(r);i.a},"61b3":function(e,n,t){"use strict";t.r(n);var r=t("78ad"),i=t.n(r);for(var a in r)"default"!==a&&function(e){t.d(n,e,function(){return r[e]})}(a);n["default"]=i.a},"78ad":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=i(t("a34a"));function i(e){return e&&e.__esModule?e:{default:e}}function a(e,n,t,r,i,a,u){try{var s=e[a](u),o=s.value}catch(c){return void t(c)}s.done?n(o):Promise.resolve(o).then(r,i)}function u(e){return function(){var n=this,t=arguments;return new Promise(function(r,i){var u=e.apply(n,t);function s(e){a(u,r,i,s,o,"next",e)}function o(e){a(u,r,i,s,o,"throw",e)}s(void 0)})}}var s=function(){return Promise.all([t.e("common/vendor"),t.e("components/w-picker/w-picker")]).then(t.bind(null,"d2cf"))},o={data:function(){return{cross:"",ruleForm:{renwumingcheng:"",tupian:"",wanchengqingkuang:"",xuehao:"",xingming:"",banji:"",jieshushijian:"",zhanghao:"",qingxiemingcheng:"",userid:""},user:{},ro:{renwumingcheng:!1,tupian:!1,wanchengqingkuang:!1,xuehao:!1,xingming:!1,banji:!1,jieshushijian:!1,zhanghao:!1,qingxiemingcheng:!1,userid:!1}}},components:{wPicker:s},computed:{baseUrl:function(){return this.$base.url}},onLoad:function(){var n=u(r.default.mark(function n(t){var i,a,u,s;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return this.ruleForm.jieshushijian=this.$utils.getCurDateTime(),i=e.getStorageSync("nowTable"),n.next=4,this.$api.session(i);case 4:if(a=n.sent,this.user=a.data,this.ruleForm.xuehao=this.user.xuehao,this.ro.xuehao=!0,this.ruleForm.xingming=this.user.xingming,this.ro.xingming=!0,this.ruleForm.banji=this.user.banji,this.ro.banji=!0,this.ruleForm.userid=e.getStorageSync("userid"),t.refid&&(this.ruleForm.refid=t.refid,this.ruleForm.nickname=e.getStorageSync("nickname")),!t.id){n.next=20;break}return this.ruleForm.id=t.id,n.next=18,this.$api.info("renwujieshu",this.ruleForm.id);case 18:a=n.sent,this.ruleForm=a.data;case 20:if(this.cross=t.cross,!t.cross){n.next=68;break}u=e.getStorageSync("crossObj"),n.t0=r.default.keys(u);case 24:if((n.t1=n.t0()).done){n.next=68;break}if(s=n.t1.value,"renwumingcheng"!=s){n.next=30;break}return this.ruleForm.renwumingcheng=u[s],this.ro.renwumingcheng=!0,n.abrupt("continue",24);case 30:if("tupian"!=s){n.next=34;break}return this.ruleForm.tupian=u[s],this.ro.tupian=!0,n.abrupt("continue",24);case 34:if("wanchengqingkuang"!=s){n.next=38;break}return this.ruleForm.wanchengqingkuang=u[s],this.ro.wanchengqingkuang=!0,n.abrupt("continue",24);case 38:if("xuehao"!=s){n.next=42;break}return this.ruleForm.xuehao=u[s],this.ro.xuehao=!0,n.abrupt("continue",24);case 42:if("xingming"!=s){n.next=46;break}return this.ruleForm.xingming=u[s],this.ro.xingming=!0,n.abrupt("continue",24);case 46:if("banji"!=s){n.next=50;break}return this.ruleForm.banji=u[s],this.ro.banji=!0,n.abrupt("continue",24);case 50:if("jieshushijian"!=s){n.next=54;break}return this.ruleForm.jieshushijian=u[s],this.ro.jieshushijian=!0,n.abrupt("continue",24);case 54:if("zhanghao"!=s){n.next=58;break}return this.ruleForm.zhanghao=u[s],this.ro.zhanghao=!0,n.abrupt("continue",24);case 58:if("qingxiemingcheng"!=s){n.next=62;break}return this.ruleForm.qingxiemingcheng=u[s],this.ro.qingxiemingcheng=!0,n.abrupt("continue",24);case 62:if("userid"!=s){n.next=66;break}return this.ruleForm.userid=u[s],this.ro.userid=!0,n.abrupt("continue",24);case 66:n.next=24;break;case 68:this.styleChange();case 69:case"end":return n.stop()}},n,this)}));function t(e){return n.apply(this,arguments)}return t}(),methods:{styleChange:function(){this.$nextTick(function(){})},jieshushijianConfirm:function(e){console.log(e),this.ruleForm.jieshushijian=e.result,this.$forceUpdate()},tupianTap:function(){var e=this;this.$api.upload(function(n){e.ruleForm.tupian="upload/"+n.file,e.$forceUpdate(),e.$nextTick(function(){e.styleChange()})})},getUUID:function(){return(new Date).getTime()},onSubmitTap:function(){var n=u(r.default.mark(function n(){var t,i,a,u,s,o,c,h,l,g;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:if(!this.cross){n.next=16;break}if(u=e.getStorageSync("statusColumnName"),s=e.getStorageSync("statusColumnValue"),""==u){n.next=16;break}if(o=e.getStorageSync("crossObj"),u.startsWith("[")){n.next=12;break}for(c in o)c==u&&(o[c]=s);return h=e.getStorageSync("crossTable"),n.next=10,this.$api.update("".concat(h),o);case 10:n.next=16;break;case 12:t=Number(e.getStorageSync("userid")),i=o["id"],a=e.getStorageSync("statusColumnName"),a=a.replace(/\[/,"").replace(/\]/,"");case 16:if(!i||!t){n.next=38;break}return this.ruleForm.crossuserid=t,this.ruleForm.crossrefid=i,l={page:1,limit:10,crossuserid:t,crossrefid:i},n.next=22,this.$api.list("renwujieshu",l);case 22:if(g=n.sent,!(g.data.total>=a)){n.next=28;break}return this.$utils.msg(e.getStorageSync("tips")),n.abrupt("return",!1);case 28:if(!this.ruleForm.id){n.next=33;break}return n.next=31,this.$api.update("renwujieshu",this.ruleForm);case 31:n.next=35;break;case 33:return n.next=35,this.$api.add("renwujieshu",this.ruleForm);case 35:this.$utils.msgBack("提交成功");case 36:n.next=46;break;case 38:if(!this.ruleForm.id){n.next=43;break}return n.next=41,this.$api.update("renwujieshu",this.ruleForm);case 41:n.next=45;break;case 43:return n.next=45,this.$api.add("renwujieshu",this.ruleForm);case 45:this.$utils.msgBack("提交成功");case 46:case"end":return n.stop()}},n,this)}));function t(){return n.apply(this,arguments)}return t}(),optionsChange:function(e){this.index=e.target.value},bindDateChange:function(e){this.date=e.target.value},getDate:function(e){var n=new Date,t=n.getFullYear(),r=n.getMonth()+1,i=n.getDate();return"start"===e?t-=60:"end"===e&&(t+=2),r=r>9?r:"0"+r,i=i>9?i:"0"+i,"".concat(t,"-").concat(r,"-").concat(i)},toggleTab:function(e){this.$refs[e].show()}}};n.default=o}).call(this,t("543d")["default"])},"7e5a":function(e,n,t){"use strict";var r={"w-picker":()=>Promise.all([t.e("common/vendor"),t.e("components/w-picker/w-picker")]).then(t.bind(null,"d2cf"))},i=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"b",function(){return i}),t.d(n,"c",function(){return a}),t.d(n,"a",function(){return r})},b1a2:function(e,n,t){}},[["4124","common/runtime","common/vendor"]]]);