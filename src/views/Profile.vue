<template>
  <div>
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>
    <section class="hero is-light" style="margin-top: 50px;">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div
            v-if="homeData.firstName"
            class="columns is-multiline is-centered"
          >
            <div class="column is-2">
              <div>
                  <avatar
                    :size="150"
                    :username="name"
                    :src="homeData.base64"
                    title="photo"
                    style="display: inline-block;"
                  ></avatar>
              </div>
              <i class="far fa-clock" style="margin-top: 15px;"></i>
              <p class="is-italic is-size-7" style="margin-bottom: 4px;">
                with us
              </p>
              <p class="is-italic is-size-7">{{ homeData.duration }} days</p>
            </div>
            <div class="column is-3">
              <p v-if="homeData.firstName" class="has-text-left">
                {{ homeData.firstName }} {{ homeData.lastName }}
              </p>
              <p
                v-if="homeData.homeTown"
                class="has-text-left"
                style="margin-top:10px"
              >
                <i class="fas fa-home mr-2"></i> {{ homeData.homeTown }}
              </p>
              <p
                v-if="homeData.instagramUrl"
                class="has-text-left"
                style="margin-top:10px"
              >
                <i class="fab fa-instagram mr-2"></i>
                {{ homeData.instagramUrl }}
              </p>
              <p
                v-if="homeData.phoneNumber"
                class="has-text-left"
                style="margin-top:10px"
              >
                <i class="fas fa-phone mr-2"></i> {{ homeData.phoneNumber }}
              </p>
            </div>
            <div v-if="isAuthenticated" class="column is-3 has-text-right">
                <a class="actions" @click="addPhToFavouriteAction()">
                  <span class="icon is-medium favourite-action">
                    <i v-if="homeData.phFavourite" class="fas fa-star fa-2x"></i>
                    <i v-else class="far fa-star fa-2x"></i>
                  </span>
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <PhotoArea v-if="homeData.id" :id="homeData.id" :contentType="'photos'"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { dashboardService } from "../services/dashboard.service";
import { EventBus } from ".././event-bus";
import Avatar from "vue-avatar/src/Avatar.vue";
import PhotoArea from "@/components/PhotoArea.vue";
import axios from "axios";

@Component({
  computed: mapGetters({
    isAuthenticated: "auth/isAuthenticated",
    profile: "user/profile"
  }),
  components: {
    Avatar,
    PhotoArea
  }
})
export default class DashboardHome extends Vue {
  private id!: number;

  private homeData = {} as any;

  // Loading
  private isLoading = true;

  get name() {
    return this.homeData.firstName + " " + this.homeData.lastName;
  }

  private created() {
    this.id = Number(this.$route.params.id);
    dashboardService.getUserProfileDetails(this.id).then((resp: any) => {
      this.homeData = resp.data;
      this.isLoading = false;
    });
  }

  addPhToFavouriteAction () {
      var star = $(".favourite-action .fa-star");
      var isUnfavourite = star.hasClass("far");
      if(isUnfavourite){
        star.removeClass("far");
        star.addClass("fas");
        dashboardService.addPhotographerToFavourite(this.id).then((resp) => {});
      } else {
        star.removeClass("fas");
        star.addClass("far");
        dashboardService.removePhotographerFromFavourite(this.id).then((resp) => {});
      }
    }

  mounted() {

  }
}
</script>

<style scoped>
a.actions { color: inherit; }
</style>
