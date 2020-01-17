import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import Home from "./views/Home.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { view: Home.name }
    },
    {
      path: "/plugin/new",
      name: "pluginNew",
      component: () => import("./views/PluginNew.vue"),
      meta: { view: "pluginNew" }
    },
    {
      path: "/plugin/:id",
      name: "pluginDetail",
      component: () => import("./views/PluginDetail.vue"),
      props: true,
      meta: { view: "pluginDetail" }
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.getters["auth/isAuthenticated"]) {
      next();
    } else {
      next({
        path: "/home",
        query: { requireSignIn: "true" }
      });
    }
  } else {
    next();
  }
});

export default router;
