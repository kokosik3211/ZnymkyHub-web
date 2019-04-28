import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const Error_page = (resolve: (arg0: any) => void) =>
  require.ensure(["./components/NotFound"], () =>
    resolve(require("./components/NotFound"))
  );

export default new Router({
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
    { path: "/error", component: Error_page },
    // redirect - перенаправление в случае если существует ошибка маршрута
    { path: "*", redirect: "/error" }
  ],

  mode: "history"
});
