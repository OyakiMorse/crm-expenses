import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app"
import record from "../store/record";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    meta: {layout: 'main', auth: true},
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {layout: 'empty'},
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {layout: 'empty'},
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/categories",
    meta: {layout: 'main', auth: true},
    name: "categories",
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/detail-record/:id",
    meta: {layout: 'main', auth: true},
    name: "detail-record",
    component: () => import("../views/DetailRecord.vue"),
  },
  {
    path: "/history",
    meta: {layout: 'main', auth: true},
    name: "history",
    component: () => import("../views/History.vue"),
  },
  {
    path: "/planning",
    meta: {layout: 'main', auth: true},
    name: "planning",
    component: () => import("../views/Planning.vue"),
  },
  {
    path: "/profile",
    meta: {layout: 'main', auth: true},
    name: "profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/record",
    meta: {layout: 'main', auth: true},
    name: "record",
    component: () => import("../views/Record.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser

  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router;
