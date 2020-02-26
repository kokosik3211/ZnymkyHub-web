<template>
  <section class="hero">
    <br />
    <br />
    <div class="hero-body has-background-light">
      <div class="container has-text-centered">
        <h3 class="has-text-grey is-size-4">Login</h3>
        <p class="has-text-grey is-size-6">Please login to proceed</p>
        <article class="message is-success" v-if="$route.query.new">
          <div class="message-body">
            <strong>You're all set {{ $route.query.firstName }}!</strong> Login
            with your password to continue.
          </div>
        </article>
        <br />
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <div class="box">
              <form @submit.prevent="handleSubmit">
                <div class="field">
                  <div class="control has-icons-left">
                    <input
                      class="input"
                      type="email"
                      placeholder="Email"
                      autofocus=""
                      v-model="credentials.userName"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <div class="control has-icons-left">
                    <input
                      class="input"
                      type="password"
                      placeholder="Password"
                      v-model="credentials.password"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
                </div>
                <Spinner v-bind:show="isBusy" />
                <button
                  class="button is-block is-info is-fullwidth"
                  type="submit"
                >
                  Login
                </button>
                <div class="errors-container" v-if="errors">
                  {{ errors }}
                </div>
              </form>
            </div>
          </div>

          <div class="is-divider-vertical is-1" data-content="OR"></div>

          <div class="column is-3 is-centered">
            <p style="margin-bottom: 7px;">Use social network</p>
            <FacebookAuth />
          </div>
        </div>
      </div>
      <div class="column has-text-centered">
        <p class="has-text-grey">
          <router-link to="/register">Sign Up</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Spinner from "@/components/Spinner.vue"; // @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import { Credentials } from "../../models/credentials.interface";
import FacebookAuth from "@/views/account/FacebookAuth.vue";

// this.$route.query.page

@Component({
  components: {
    Spinner,
    FacebookAuth
  }
})
export default class LoginForm extends Vue {
  private isBusy: boolean = false;
  private errors: string = "";
  private credentials = {} as Credentials;

  private created() {
    if (this.$route.query.new) {
      this.credentials.userName = this.$route.query.email.toString();
    }
  }

  private handleSubmit() {
    this.isBusy = true;
    this.$store
      .dispatch("auth/authRequest", this.credentials)
      .then(result => {
        this.$router.push("/dashboard/home");
      })
      .catch(err => {
        this.errors = err;
      })
      .then(() => {
        this.isBusy = false;
      });
  }
}
</script>

<style lang="scss" scoped></style>
