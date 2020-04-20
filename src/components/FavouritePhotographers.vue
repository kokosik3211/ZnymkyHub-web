<template>
  <section class="container" style="margin-top: 24px; margin-bottom: 24px;">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>
    <div v-if="Photographers.length" class="columns is-mobile is-multiline is-centered">
      <div
        v-for="photographer in Photographers"
        :key="photographer.id"
        class="column"
        style="text-align: center; padding: 27px;"
      >
        <a @click="onOpenProfile(photographer.id)">
            <avatar
                :size="150"
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
    <section v-else class="hero is-medium is-light is-bold rounded-corners">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">
            Sorry, no favourite photographers yet 😥
          </h1>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { User } from "../models/user.interface";
import { mapGetters } from "vuex";
import Avatar from "vue-avatar/src/Avatar.vue";
import axios from "axios";
import { baseUrl } from "../constants";
import { dashboardService } from "../services/dashboard.service";

@Component({
  computed: mapGetters({
    profile: "user/profile"
  }),
  components: {
    Avatar
  }
})
export default class FavouritePhotographers extends Vue {
  private Photographers: User[] = [];
  private isLoading = true;

  private created() {
    dashboardService.getFavouritePhotographers().then(res => {
      this.Photographers = res.data;
      this.isLoading = false;
    });
  }

  onOpenProfile(id: any) {
    this.$router.push({ name: "profile", params: { id: id } });
  }
}
</script>

<style scoped>
.rounded-corners {
  border-radius: 20px 40px;
}
</style>
