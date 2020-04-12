<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <br />
        <div class="has-text-centered subtitle">Our photographers</div>
        <div class="container">
          <!-- <h1 class="title">
                Medium title
            </h1>
            <h2 class="subtitle">
                Medium subtitle
            </h2> -->

          <div class="columns is-mobile is-multiline is-centered">
            <div
              v-for="photographer in Photographers"
              :key="photographer.id"
              class="column"
              style="text-align: center; padding: 27px;"
            >
              <a @click="onOpenProfile(photographer.id)">
                <avatar
                  :size="100"
                  :username="photographer.fullName"
                  :src="photographer.photo"
                  style="display: inline-block;"
                ></avatar>
              </a>
              <p class="is-size-7" style="margin-top: 7px;">
                {{ photographer.fullName }}
              </p>
              <p class="is-italic is-size-7">{{ photographer.homeTown }}</p>
            </div>
          </div>

          <p class="has-text-centered is-size-6">
            Discover {{ PhotographersCount }} more photographers on our site
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "../models/user.interface";
import Avatar from "vue-avatar/src/Avatar.vue";
import axios from "axios";

@Component({
  components: {
    Avatar
  }
})
export default class PhotographersForMain extends Vue {
  private Photographers: User[] = [];
  private PhotographersCount: number = 0;

  created() {
    axios
      .post("http://localhost:5000/api/user/photographersformain")
      .then(response => {
        this.Photographers = response.data;
        //console.log(this.Photographers);
      })
      .catch(e => {
        //console.log(e);
      });

    axios
      .post("http://localhost:5000/api/user/photographerscount")
      .then(response => {
        this.PhotographersCount = response.data;
        //console.log(`Photographers count = ${this.PhotographersCount}`);
      });
  }

  onOpenProfile(id: any) {
      this.$router.push({ name: "profile", params: { id: id } });
  }
}
</script>

<style scoped>
.column {
  text-align: center;
}
</style>
