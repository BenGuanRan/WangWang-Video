import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main";
import Home from "@/views/Home";
import Recommend from "@/views/Recommend";
import Publish from "@/views/Publish";
import Statistics from "@/views/Statistics";
import Works from "@/views/Works";
import Favor from "@/views/Favor";
import About from "@/views/About";

Vue.use(VueRouter);


const routes = [{
  path: "/",
  redirect: "/main",
},
{
  path: "/main",
  redirect: "/main/recommend",
},
{
  path: "/main",
  name: "Main",
  component: Main,
  children: [{
    path: "home",
    name: "Home",
    component: Home,
  },
  {
    path: "recommend",
    name: "Recommend",
    component: Recommend,
  },
  {
    path: "statistics",
    name: "Statistics",
    component: Statistics
  },
  {
    path: "favor",
    name: "Favor",
    component: Favor
  },
  {
    path: "works",
    name: "Works",
    component: Works
  },
  ],
},
{
  path: "/about",
  name: "About",
  component: About
},
{
  path: "/publish",
  name: "Publish",
  component: Publish
}
];

const router = new VueRouter({
  routes,
});

// 捕获重复跳转路由时的异常
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem("token")) {
    if (to.path === '/publish')
      next('/main')
    else
      next()
  } else {
    next()
  }
})
export default router;