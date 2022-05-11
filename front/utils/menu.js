const menu = {
			list() {
				return [{
					"backMenu": [{
						"child": [{
							"appFrontIcon": "cuIcon-newshot",
							"buttons": ["查看", "修改", "删除", "导出", "获得"],
							"menu": "学生",
							"menuJump": "列表",
							"tableName": "xuesheng"
						}],
						"menu": "学生管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-keyboard",
							"buttons": ["新增", "查看", "修改", "删除"],
							"menu": "青协",
							"menuJump": "列表",
							"tableName": "qingxie"
						}],
						"menu": "青协管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-circle",
							"buttons": ["查看", "修改", "删除"],
							"menu": "积分获得",
							"menuJump": "列表",
							"tableName": "jifenhuode"
						}],
						"menu": "积分获得管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-attentionfavor",
							"buttons": ["新增", "查看", "修改", "删除"],
							"menu": "任务类型",
							"menuJump": "列表",
							"tableName": "renwuleixing"
						}],
						"menu": "任务类型管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-list",
							"buttons": ["查看", "修改", "删除", "审核发布"],
							"menu": "任务发布",
							"menuJump": "列表",
							"tableName": "renwufabu"
						}],
						"menu": "任务发布管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-flashlightopen",
							"buttons": ["查看", "修改", "删除", "查看评论"],
							"menu": "任务信息",
							"menuJump": "列表",
							"tableName": "renwuxinxi"
						}],
						"menu": "任务信息管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-goodsnew",
							"buttons": ["查看", "修改", "删除"],
							"menu": "报名信息",
							"menuJump": "列表",
							"tableName": "baomingxinxi"
						}],
						"menu": "报名信息管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-rank",
							"buttons": ["查看", "修改", "删除"],
							"menu": "任务开始",
							"menuJump": "列表",
							"tableName": "renwukaishi"
						}],
						"menu": "任务开始管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-pic",
							"buttons": ["查看", "修改", "删除"],
							"menu": "任务结束",
							"menuJump": "列表",
							"tableName": "renwujieshu"
						}],
						"menu": "任务结束管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-news",
							"buttons": ["新增", "查看", "修改", "删除"],
							"menu": "公告信息",
							"tableName": "news"
						}, {
							"appFrontIcon": "cuIcon-send",
							"buttons": ["查看", "修改"],
							"menu": "轮播图管理",
							"tableName": "config"
						}],
						"menu": "系统管理"
					}],
					"frontMenu": [{
						"child": [{
							"appFrontIcon": "cuIcon-pic",
							"buttons": ["报名"],
							"menu": "任务信息列表",
							"menuJump": "列表",
							"tableName": "renwuxinxi"
						}],
						"menu": "任务信息模块"
					}],
					"hasBackLogin": "是",
					"hasBackRegister": "否",
					"hasFrontLogin": "否",
					"hasFrontRegister": "否",
					"roleName": "管理员",
					"tableName": "users"
				}, {
					"backMenu": [{
						"child": [{
							"appFrontIcon": "cuIcon-goodsnew",
							"buttons": ["查看", "删除", "开始", "结束"],
							"menu": "报名信息",
							"menuJump": "列表",
							"tableName": "baomingxinxi"
						}],
						"menu": "报名信息管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-rank",
							"buttons": ["查看"],
							"menu": "任务开始",
							"menuJump": "列表",
							"tableName": "renwukaishi"
						}],
						"menu": "任务开始管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-pic",
							"buttons": ["查看"],
							"menu": "任务结束",
							"menuJump": "列表",
							"tableName": "renwujieshu"
						}],
						"menu": "任务结束管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-favor",
							"buttons": ["查看", "删除"],
							"menu": "我的收藏管理",
							"tableName": "storeup"
						}],
						"menu": "我的收藏管理"
					}],
					"frontMenu": [{
						"child": [{
							"appFrontIcon": "cuIcon-pic",
							"buttons": ["报名"],
							"menu": "任务信息列表",
							"menuJump": "列表",
							"tableName": "renwuxinxi"
						}],
						"menu": "任务信息模块"
					}],
					"hasBackLogin": "否",
					"hasBackRegister": "否",
					"hasFrontLogin": "是",
					"hasFrontRegister": "是",
					"roleName": "学生",
					"tableName": "xuesheng"
				}, {
					"backMenu": [{
						"child": [{
							"appFrontIcon": "cuIcon-list",
							"buttons": ["新增", "查看", "修改", "删除"],
							"menu": "任务发布",
							"menuJump": "列表",
							"tableName": "renwufabu"
						}],
						"menu": "任务发布管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-flashlightopen",
							"buttons": ["查看", "修改"],
							"menu": "任务信息",
							"menuJump": "列表",
							"tableName": "renwuxinxi"
						}],
						"menu": "任务信息管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-goodsnew",
							"buttons": ["查看", "删除", "审核"],
							"menu": "报名信息",
							"menuJump": "列表",
							"tableName": "baomingxinxi"
						}],
						"menu": "报名信息管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-rank",
							"buttons": ["查看"],
							"menu": "任务开始",
							"menuJump": "列表",
							"tableName": "renwukaishi"
						}],
						"menu": "任务开始管理"
					}, {
						"child": [{
							"appFrontIcon": "cuIcon-pic",
							"buttons": ["查看"],
							"menu": "任务结束",
							"menuJump": "列表",
							"tableName": "renwujieshu"
						}],
						"menu": "任务结束管理"
					}],
					"frontMenu": [{
						"child": [{
							"appFrontIcon": "cuIcon-pic",
							"buttons": ["报名"],
							"menu": "任务信息列表",
							"menuJump": "列表",
							"tableName": "renwuxinxi"
						}],
						"menu": "任务信息模块"
					}],
					"hasBackLogin": "是",
					"hasBackRegister": "否",
					"hasFrontLogin": "否",
					"hasFrontRegister": "否",
					"roleName": "青协",
					"tableName": "qingxie"
				}]
			}
		}
		export default menu;
