import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import RegistrationForm from "./views/account/RegistrationForm.vue";
import RegistrationPage from "./views/account/RegistrationPage.vue";
import LoginForm from "./views/account/LoginForm.vue";
import DashboardRoot from "./views/dashboard/Root.vue";
import DashboardHome from "./views/dashboard/Home.vue";
import store from "./store/store";

Vue.use(Router);

const Error_page = (resolve: (arg0: any) => void) =>
  require.ensure(["./components/NotFound"], () =>
    resolve(require("./components/NotFound"))
  );

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/register",
      name: "registrationForm",
      component: RegistrationPage
    },
    {
      path: "/login",
      name: "loginForm",
      component: LoginForm
    },
    {
      path: "/dashboard",
      component: DashboardRoot,
      children: [
        {
          path: "home",
          component: DashboardHome,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    },
    { path: "/error", component: Error_page },
    // redirect - перенаправление в случае если существует ошибка маршрута
    { path: "*", redirect: "/error" }
  ],

  mode: "history"
});

router.beforeEach((to: any, from: any, next: any) => {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters["auth/isAuthenticated"]) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
