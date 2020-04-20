<template>
  <!-- <div class="home">
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-8 is-offset-2">
            <div class="content">
              <h1 class="title has-text-grey">JWT Auth Demo</h1>
              <p>
                This demo shows local and facebook user registration and login
                flow using Vue.js v2.5.13, ASP.NET Core 2.0 WebApi and Facebook
                api
              </p>
            </div>
            <div class="box">
              <router-link to="/register" class="button is-link"
                >Signup with email</router-link
              >
              <router-link to="/login" class="button is-link"
                >Login with email</router-link
              >
              <router-link to="/facebook-login" class="button is-link"
                >Signup/login with facebook</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div> -->
  <div>
    <section class="hero is-dark is-fullheight-with-navbar video" style="">
      <!-- Hero head: will stick at the top -->
      <!-- <div class="hero-head">
       <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item">
              <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo">
            </a>
            <span class="navbar-burger burger" data-target="navbarMenuHeroC">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroC" class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item is-active">
                Home
              </a>
              <a class="navbar-item">
                Examples
              </a>
              <a class="navbar-item">
                Documentation
              </a>
              <span class="navbar-item">
                <a class="button is-dark is-inverted">
                  <span class="icon">
                    <i class="fab fa-github"></i>
                  </span>
                  <span>Download</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </header>
    </div> -->

      <div class="hero-video">
        <video
          playsinline
          autoplay
          muted
          loop
          src="../assets/video/fordelete.mp4"
          style="object-fit: cover;"
        >
          <!-- <source src="vid/BGvid.webm" type="video/webm">
            <source src="vid/BGvid.mp4" type="video/mp4"> -->
        </video>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title"></h1>
          <!-- <h2 class="subtitle">
          Subtitle
        </h2> -->

          <div>
            <div class="column is-two-fifths is-pulled-left has-text-centered">
              <p class="is-size-2">I'm looking for a photographer!</p>
              <div class="column is-three-fifths is-offset-one-fifth">
                <router-link
                  to="/register"
                  class="button is-danger is-outlined is-fullwidth"
                  >Directory of photographers</router-link
                >
              </div>
            </div>
            <div class="column is-two-fifths is-pulled-right has-text-centered">
              <p class="is-size-2">
                I'm a photographer looking for good photos :)
              </p>
              <div class="column is-three-fifths is-offset-one-fifth">
                <router-link
                  to="/register"
                  class="button is-danger is-outlined is-fullwidth"
                  >Join</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot">
        <nav class="tabs is-boxed is-fullwidth">
          <div class="container">
            <ul>
              <li><a @click="scrollMeTo('photographers')">Photographers</a></li>
              <li><a @click="scrollMeTo('photos')">Best photos</a></li>
              <li>
                <a @click="scrollMeTo('phsearch')">Photographer search</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <main>
      <!-- <avatar v-if="user.fullName" :username=user.fullName :src=user.photo></avatar>
    <button v-on:click="test">Kek</button> -->
    </main>
    <PhotographersForMain id="photographers" />
    <PhotosForMain id="photos" />
    <SearchingPhotographerForMain id="phsearch" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Nav from "@/components/Nav.vue";
import Avatar from "vue-avatar/src/Avatar.vue";
import PhotographersForMain from "@/components/PhotographersForMain.vue";
import PhotosForMain from "@/components/PhotosForMain.vue";
import SearchingPhotographerForMain from "@/components/SearchingPhotographerForMain.vue";
import { User } from "../models/user.interface";
import axios from "axios";
import * as signalR from "@microsoft/signalr";

@Component({
  components: {
    Nav,
    Avatar,
    PhotographersForMain,
    PhotosForMain,
    SearchingPhotographerForMain
  }
})
export default class Home extends Vue {
  private user = {} as User;

  mounted() {

  }

  public scrollMeTo(id: string) {
    /*var element = this.$refs[refName];
    var top = <HTMLElement>element.offsetTop;

    window.scrollTo(0, top);*/
    var element = document.getElementById(id);
    var position = element!.getBoundingClientRect();
    var x = position.left;
    var y = position.top;
    window.scrollTo(0, y);
  }
}
</script>

<style scoped>
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/img/poster.jpg") center no-repeat;
  background-size: cover;
}
</style>
