import Vue from 'vue'
import Router from 'vue-router'
const IndexHtml = resolve => require(['../pages/indexHtml'], resolve)
// 切换页面
const SwitchContent = resolve => require(['../pages/switchContent'], resolve)
// edid 页面
const Edid = resolve => require(['../pages/edidPage'], resolve)
// configure 页面
const Configure = resolve => require(['../pages/configure'], resolve)
// status 页面
const Status = resolve => require(['../pages/status'], resolve)
// // videoWall 页面
// const VideoWall = resolve => require(['../pages/videoWall'], resolve)
// about 页面
const About = resolve => require(['../pages/about'], resolve)
// 身份验证 页面
const Authentication = resolve => require(['../pages/authentication'], resolve)
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexHtml,
      redirect: '/pages/switchContent',
      children: [
        {
          path: '/pages/switchContent',
          component: SwitchContent
        },
        {
          path: '/pages/configure',
          component: Configure
        },
        // {
        //   path: '/pages/videoWall',
        //   component: VideoWall
        // },
        {
          path: '/pages/authentication',
          component: Authentication
        },
        {
          path: '/pages/about',
          component: About
        },
        {
          path: '/pages/edidPage',
          component: Edid
        },
        {
          path: '/pages/status',
          component: Status
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log("have change"+" to is"+to.path+" from is "+from.path);
  if (window.allSwitchSetInterval) {
    window.clearInterval(window.allSwitchSetInterval);
  }
  if (window.allSwitchASetInterval) {
    window.clearInterval(window.allSwitchASetInterval);
  }
  if (window.myInterval) {
    window.clearInterval(window.myInterval);
  }
  if (window.myInterval1) {
    window.clearInterval(window.myInterval1);
  }
  if (window.myTempInterval) {
    window.clearInterval(window.myTempInterval);
  }
  if (window.myVolInterval) {
    window.clearInterval(window.myVolInterval);
  }
  if (window.myFanInterval) {
    window.clearInterval(window.myFanInterval);
  }
  if(window.EDIDPortStatus)
  {
    window.clearInterval(window.EDIDPortStatus);
  }
  if(window.jifukuiupgradesetInterval)
  {
    console.log("Close");
    window.clearInterval(window.jifukuiupgradesetInterval);
  }
  next();
})
export default router
