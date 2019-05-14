<template>
<section class="hero">
    <br>
    <br>
<div class="hero-body has-background-grey-lighter">
<div class="container has-text-centered">
        <h3 class="has-text-grey is-size-4">Join ZnymkuHub</h3>
        <p class="has-text-grey is-size-6">In what role you want to join:</p>
        <div class="column is-three-fifths is-offset-one-fifth is-centered">
            <div class="column buttons has-addons is-centered">
                <span class="button is-success is-selected"><i class="fas fa-camera fa-fw"></i>I'm a photographer</span>
                <span class="button"><i class="fas fa-heart fa-fw"></i>I'm looking for a photographer</span>
            </div>
        </div>
        <div class="column is-4 is-offset-4">
        <div class="box">
          <!-- @submit handles any form of submission. -->
          <!-- .prevent keeps the event from bubbling around and doing anything else. -->
          <form @submit.prevent="handleSubmit">
            <div class="field">
              <div class="control">
                <input
                  class="input is-large"
                  type="text"
                  placeholder="First name"
                  v-model="user.firstName"
                  autofocus=""
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  class="input is-large"
                  type="text"
                  placeholder="Last name"
                  v-model="user.lastName"
                />
              </div>
            </div>

            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="email" placeholder="Email" v-model="user.email">
                    <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
                </p>
            </div>

            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="user.password">
                    <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>

            <div class="field">
              <div class="control">
                <input
                  class="input is-large"
                  type="text"
                  placeholder="Location"
                  v-model="user.location"
                />
              </div>
            </div>
            <Spinner v-bind:show="isBusy" />
            <button
              class="button is-block is-info is-large is-fullwidth"
              type="submit"
            >
              Submit
            </button>
            <div class="errors-container" v-if="errors">
              {{ errors }}
            </div>
          </form>
        </div>
        </div>
        <p class="has-text-grey">
          <router-link to="/login">Login</router-link>
        </p>
</div>
</div>
</section>
</template>

<script lang="ts">
import Spinner from "@/components/Spinner.vue"; // @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import { UserRegistration } from "../../models/user.registration.interface";
import { accountService } from "../../services/account.service";

@Component({
  components: {
    Spinner
  }
})
export default class RegistrationForm extends Vue {
  private isBusy: boolean = false;
  private errors: string = "";
  private user = {} as UserRegistration;

  private handleSubmit() {
    this.isBusy = true;
    accountService
      .register(this.user)
      .finally(() => (this.isBusy = false))
      .subscribe(
        (result: any) => {
          this.$router.push({
            name: "loginForm",
            query: {
              new: "true",
              firstName: this.user.firstName,
              email: this.user.email
            }
          });
        },
        (errors: any) => (this.errors = errors)
      );
  }
}
</script>

<style lang="scss" scoped></style>
