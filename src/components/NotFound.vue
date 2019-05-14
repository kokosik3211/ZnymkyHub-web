<template>
  <div id="app" class="hero-body">
    <div class="container has-text-centered">
      <h1>{{ msg }}</h1>
      <h1>404</h1>
      <router-link tag="button" class="button is-danger" to="/">Go to the main page</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Page not found"
    };
  }
};
</script>

<style></style>
