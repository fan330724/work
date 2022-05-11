import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import news from '@/views/modules/news/list'
    import xuesheng from '@/views/modules/xuesheng/list'
    import renwujieshu from '@/views/modules/renwujieshu/list'
    import renwukaishi from '@/views/modules/renwukaishi/list'
    import qingxie from '@/views/modules/qingxie/list'
    import renwufabu from '@/views/modules/renwufabu/list'
    import discussrenwuxinxi from '@/views/modules/discussrenwuxinxi/list'
    import storeup from '@/views/modules/storeup/list'
    import baomingxinxi from '@/views/modules/baomingxinxi/list'
    import renwuleixing from '@/views/modules/renwuleixing/list'
    import renwuxinxi from '@/views/modules/renwuxinxi/list'
    import config from '@/views/modules/config/list'
    import jifenhuode from '@/views/modules/jifenhuode/list'


//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '首页',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/news',
        name: '公告信息',
        component: news
      }
      ,{
	path: '/xuesheng',
        name: '学生',
        component: xuesheng
      }
      ,{
	path: '/renwujieshu',
        name: '任务结束',
        component: renwujieshu
      }
      ,{
	path: '/renwukaishi',
        name: '任务开始',
        component: renwukaishi
      }
      ,{
	path: '/qingxie',
        name: '青协',
        component: qingxie
      }
      ,{
	path: '/renwufabu',
        name: '任务发布',
        component: renwufabu
      }
      ,{
	path: '/discussrenwuxinxi',
        name: '任务信息评论',
        component: discussrenwuxinxi
      }
      ,{
	path: '/storeup',
        name: '我的收藏管理',
        component: storeup
      }
      ,{
	path: '/baomingxinxi',
        name: '报名信息',
        component: baomingxinxi
      }
      ,{
	path: '/renwuleixing',
        name: '任务类型',
        component: renwuleixing
      }
      ,{
	path: '/renwuxinxi',
        name: '任务信息',
        component: renwuxinxi
      }
      ,{
	path: '/config',
        name: '轮播图管理',
        component: config
      }
      ,{
	path: '/jifenhuode',
        name: '积分获得',
        component: jifenhuode
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})

export default router;
