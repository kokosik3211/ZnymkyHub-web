<template>
  <div id="app" class="text-center text-danger">
    <h1>{{ msg }}</h1>
    <h1>404</h1>
    <router-link tag="button" class="btn btn-lg btn-danger" to="/"
      >Go to the main page</router-link
    >
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
