<template>
  <section class="hero">
    <br />
    <br />
    <div class="hero-body has-background-light">
      <div class="container has-text-centered">
        <h3 class="has-text-grey is-size-4">Join ZnymkyHub</h3>
        <p class="has-text-grey is-size-6">In what role you want to join:</p>
        <div class="column is-three-fifths is-offset-one-fifth is-centered">
          <div class="column buttons has-addons is-centered">
            <span
              id="isPhotographer"
              v-on:click="changeRoleToPhotographer"
              class="button"
              ><i class="fas fa-camera fa-fw"></i>I'm a photographer</span
            >
            <span id="isUser" v-on:click="changeRoleToUser" class="button"
              ><i class="fas fa-heart fa-fw"></i>I'm looking for a
              photographer</span
            >
          </div>
        </div>
        <div class="columns" v-if="visible">
          <div class="column is-4 is-offset-4">
            <div class="box">
              <!-- @submit handles any form of submission. -->
              <!-- .prevent keeps the event from bubbling around and doing anything else. -->
              <form @submit.prevent="handleSubmit">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
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
                      class="input"
                      type="text"
                      placeholder="Last name"
                      v-model="user.lastName"
                    />
                  </div>
                </div>

                <div class="field">
                  <b-input
                    placeholder="Birthday: month/day/year"
                    v-cleave="masks.date"
                    icon="cake"
                    v-model="birthday">
                  </b-input>
                </div>

                <b-field class="is-full-width">
                  <b-radio-button class="is-full-width" v-model="user.gender"
                      native-value="0"
                      type="is-success">
                      <b-icon pack="fas" icon="mars"></b-icon>
                      <span>Male</span>
                  </b-radio-button>

                  <b-radio-button class="is-full-width" v-model="user.gender"
                      native-value="1">
                      <b-icon pack="fas" icon="venus"></b-icon>
                      <span>Female</span>
                  </b-radio-button>
                </b-field>

                <div class="field">
                  <p class="control has-icons-left">
                    <input
                      class="input"
                      type="email"
                      placeholder="Email"
                      v-model="user.email"
                    />
                    <span class="icon is-small is-left"
                      ><i class="fas fa-envelope"></i
                    ></span>
                  </p>
                </div>

                <div class="field">
                  <p class="control has-icons-left">
                    <input
                      class="input"
                      type="password"
                      placeholder="Password"
                      v-model="user.password"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </p>
                </div>

                <div v-if="showInstagramUrl" class="field">
                  <p class="control has-icons-left">
                    <input
                      class="input"
                      type="text"
                      placeholder="Instagram profile"
                      v-model="user.instagramUrl"
                    />
                    <span class="icon is-small is-left"
                      ><i class="fab fa-instagram"></i
                    ></span>
                  </p>
                </div>

                <div class="field">
                  <div class="control has-icons-left">
                    <input
                      class="input"
                      type="text"
                      placeholder="Home town"
                      v-model="user.homeTown"
                    />
                    <span class="icon is-small is-left"
                      ><i class="fas fa-home"></i
                    ></span>
                  </div>
                </div>
                <Spinner v-bind:show="isBusy" />
                <button
                  class="button is-block is-info is-fullwidth"
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

          <div class="is-divider-vertical is-1" data-content="OR"></div>

          <div class="column is-3 is-centered">
            <p style="margin-bottom: 7px;">Use social network</p>
            <!-- <component v-bind:is="fbauth" v-bind="roleid"></component> -->
            <FacebookAuth />
          </div>
        </div>
      </div>
      <div class="column has-text-centered">
        <p class="has-text-grey">
          <router-link to="/login">Login</router-link>
        </p>
      </div>
      <!-- <img :src="image"> -->
      <!-- <img src="https://images.unsplash.com/photo-1549417338-6f137ab2cd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80" width="100" height="100"/> -->
    </div>
  </section>
</template>

<script lang="ts">
import Spinner from "@/components/Spinner.vue"; // @ is an alias to /src
import { Component, Vue, Prop } from "vue-property-decorator";
import { UserRegistration } from "../../models/user.registration.interface";
import { accountService } from "../../services/account.service";
import FacebookAuth from "@/views/account/FacebookAuth.vue";
import axios from "axios";
// @ts-ignore
import Cleave from 'cleave.js';

const cleave = {
    name: 'cleave',
    bind(el: any, binding: any) {
        const input = el.querySelector('input')
        input._vCleave = new Cleave(input, binding.value)
    },
    unbind(el: any) {
        const input = el.querySelector('input')
        input._vCleave.destroy()
    }
}

@Component({
  components: {
    Spinner,
    FacebookAuth
  },
  directives: {
    cleave
  }
})
export default class RegistrationForm extends Vue {
  private isBusy: boolean = false;
  private errors: string = "";
  private user = {} as UserRegistration;
  private visible = false;
  private showInstagramUrl = false;
  private fbauth = "FacebookAuth";
  // @Prop()
  // DynamicRegistration: number = 0;

  private image: string = "";
  private birthday: string = ""
  masks =  {
      date: {
        date: true,
        datePattern: ['m', 'd', 'Y']
      }
  }

  created() {
    this.user.roleId = 0;
  }

  mounted() {

  }

  get roleid() {
    return { roleid: this.user.roleId };
  }

  get isPh() {
    if (this.user.roleId == 2) {
      return true;
    }
    return false;
  }

  public changeRoleToPhotographer() {
    this.user.roleId = 2;
    this.visible = true;
    this.showInstagramUrl = true;

    var kek: any = document.getElementById("isUser");
    kek.classList.remove("is-success");
    var kek1: any = document.getElementById("isPhotographer");
    kek1.classList.add("is-success");
  }

  public changeRoleToUser() {
    this.user.roleId = 3;
    this.visible = true;
    this.showInstagramUrl = false;

    var kek: any = document.getElementById("isPhotographer");
    kek.classList.remove("is-success");
    var kek1: any = document.getElementById("isUser");
    kek1.classList.add("is-success");
  }

  private handleSubmit() {
    this.isBusy = true;
    var b = new Date(this.birthday);
    var userTimezoneOffset = b.getTimezoneOffset() * 60000;
    this.user.birthday = new Date(b.getTime() - userTimezoneOffset);
    this.user.gender = Number(this.user.gender);
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
