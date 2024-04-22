import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignupView.vue"),
    meta: {
      noAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      noAuth: true,
    },
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () => import("../views/TasksView.vue"),
    meta: {
      auth: true,
    },
  },
  // {
  //   path: '/*',
  //   name: 'PageNotFound',
  //   component: ''
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.auth) {
    if (!localStorage.getItem("token")) {
      next("/login");
      return;
    }
  }

  if (to.meta && to.meta.noAuth) {
    if (localStorage.getItem("token")) {
      next("/");
      return;
    }
  }

  next();
});

export default router;
