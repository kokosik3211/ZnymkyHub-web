<template>
<nav class="navbar is-dark">
  <div class="container">
  <div class="navbar-brand">
    <router-link to="/" class="navbar-item">
      <!-- <img src="https://bulma.io/images/bulma-logo.png" alt="znymkyhub" width="112" height="28"> -->
      <img src="../assets/img/camera.png" alt="znymkyhub" height="28">
    </router-link>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{ 'is-active': showNav }">
    <div class="navbar-start">
      <router-link to="/" class="navbar-item">Home</router-link>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">
          Photographers
        </a>
        <div class="navbar-dropdown is-boxed">
          <a class="navbar-item" href="https://bulma.io/documentation/overview/start/">
            Overview
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
            Modifiers
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
            Columns
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
            Layout
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
            Form
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
            Elements
          </a>
          <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
            Components
          </a>
        </div>
      </div>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">
          Photos
        </a>
        <div class="navbar-dropdown is-boxed">
          <a class="navbar-item" href="https://bulma.io/documentation/overview/start/">
            Overview
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
            Modifiers
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
            Columns
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
            Layout
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
            Form
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
            Elements
          </a>
          <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
            Components
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <router-link to="/dashboard/home" class="navbar-item" v-show="isAuthenticated">Dashboard</router-link>
      <a class="navbar-item" href="javascript:void(0)" v-on:click="logoff" v-show="isAuthenticated">Logoff {{ profile.firstName }}</a>
      
      <router-link to="/register" class="navbar-item" v-show="!isAuthenticated">Sign up</router-link>
      <router-link to="/login" class="navbar-item" v-show="!isAuthenticated">Sign in</router-link>
      <!-- <router-link to="/facebook-login" class="navbar-item" v-show="!isAuthenticated">Facebook signup/login</router-link> -->
        
      <!-- <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">
              <span class="icon">
                <i class="fab fa-twitter"></i>
              </span>
              <span>
                Tweet
              </span>
            </a>
          </p>
          <p class="control">
            <a class="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.7.4/bulma-0.7.4.zip">
              <span class="icon">
                <i class="fas fa-download"></i>
              </span>
              <span>Download</span>
            </a>
          </p>
        </div>
      </div> -->
    </div>
  </div>
  </div>
</nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EventBus } from ".././event-bus";
import { mapGetters } from "vuex";

@Component({
  computed: mapGetters({
    isAuthenticated: "auth/isAuthenticated",
    profile: "user/profile"
  })
})
export default class Nav extends Vue {
  public showNav: boolean = false;
  private logoff() {
    this.$store.dispatch("auth/authLogout").then(() => {
      this.$router.push("/");
    });
  }
  private created() {
    EventBus.$on("logged-in", (payLoad: any) => {
      // this doesn't currently do anything in this demo but does get fired on successful login.
      // leaving it here to show how to allow communication between unrelated components - ie. Store -> Component
      // console.log("logged-in message received...");
    });
  }

  private destroyed() {
    EventBus.$off("logged-in");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .router-link-exact-active {
  color: #209cee !important;
} */
</style>
