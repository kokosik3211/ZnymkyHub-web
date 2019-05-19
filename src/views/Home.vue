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
  <section class="hero is-dark is-fullheight-with-navbar" style="background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://mdbootstrap.com/img/Photos/Others/images/47.jpg) center no-repeat;background-size: cover;">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <!-- <header class="navbar">
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
      </header> -->
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          
        </h1>
        <!-- <h2 class="subtitle">
          Subtitle
        </h2> -->

        <div>
          <div class="column is-two-fifths is-pulled-left has-text-centered">
            <p class="is-size-2">I'm looking for a photographer!</p>
            <div class="column is-three-fifths is-offset-one-fifth">
              <span class="button is-danger is-outlined is-fullwidth">Directory of photographers</span>
            </div>
          </div>
          <div class="column is-two-fifths is-pulled-right has-text-centered">
            <p class="is-size-2">I'm a photographer looking for good photos :)</p>
            <div class="column is-three-fifths is-offset-one-fifth">
              <a class="button is-danger is-outlined is-fullwidth">Join</a>
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
            <li><a>Photographers</a></li>
            <li><a>Best photos</a></li>
            <li><a>Photographer search</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
  <main>
    <avatar username="Kek Lol"></avatar>
  </main>
  
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Nav from '@/components/Nav.vue'; 
import Avatar from 'vue-avatar/src/Avatar.vue';

@Component({
  components: {
    Nav,
    Avatar
  }
})
export default class Home extends Vue {}
</script>

<style scoped>

</style>
