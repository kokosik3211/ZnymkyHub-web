<template>
  <div>
    <section class="hero is-light" style="margin-top: 50px;">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div
            v-if="homeData.firstName"
            class="columns is-multiline is-centered"
          >
            <div class="column is-2">
              <div>
                <b-tooltip
                  label="Change photo"
                  type="is-dark"
                  position="is-top"
                >
                  <avatar
                    @click.native="$refs.imageInput.click()"
                    :size="150"
                    :username="name"
                    :src="homeData.base64"
                    title="kek"
                    style="display: inline-block;"
                  ></avatar>
                </b-tooltip>
                <!-- <div class="img__description_layer">
                      <p class="img__description">This image looks super neat.</p>
                  </div> -->
                <input
                  style="display: none"
                  type="file"
                  @change="onFileSelected"
                  ref="imageInput"
                />
                <!-- <button @click="onUpload">Upload</button> -->
              </div>
              <!-- <p class="is-size-7" style="margin-top: 7px;">{{name}}</p> -->
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
            <div class="column is-3">
              <div v-if="homeData.roleId == 2">
                <div class="has-margin-bottom-30">
                  <b-button class="button is-dark has-width-150" 
                    outlined
                    @click="onOpenStatistic()">
                      <i class="fas fa-chart-bar"></i> Statistic
                  </b-button>
                </div>

                <b-dropdown hoverable aria-role="list">
                  <button class="button is-primary has-width-150" slot="trigger">
                    <span><i class="fas fa-upload"></i> Upload</span>
                    <b-icon icon="menu-down"></b-icon>
                  </button>

                  <b-dropdown-item
                    aria-role="listitem"
                    @click="isPhotoModalActive = true"
                    ><i class="fas fa-image"></i> Photo</b-dropdown-item
                  >
                  <b-dropdown-item
                    aria-role="listitem"
                    @click="isPhotoshootModalActive = true"
                    ><i class="fas fa-images"></i> Photoshoot</b-dropdown-item
                  >
                </b-dropdown>

                <b-modal :active.sync="isPhotoModalActive" has-modal-card>
                  <UploadPhoto />
                </b-modal>
                <b-modal :active.sync="isPhotoshootModalActive" has-modal-card>
                  <UploadPhotoshoot />
                </b-modal>
              </div>
            </div>
          </div>
          <b-loading
            :is-full-page="isFullPage"
            :active.sync="isLoading"
            :can-cancel="true"
          ></b-loading>
        </div>
      </div>
    </section>
    <PhotographerArea v-if="homeData.id && homeData.roleId == 2" :id="homeData.id"/>
    <AuthorizedUserArea v-if="homeData.id && homeData.roleId == 3" :id="homeData.id"/>
  </div>
</template>

<script lang="ts">
import Spinner from "@/components/Spinner.vue"; // @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { dashboardService } from "../../services/dashboard.service";
import { EventBus } from "../.././event-bus";
import Avatar from "vue-avatar/src/Avatar.vue";
import UploadPhoto from "@/components/UploadPhoto.vue";
import UploadPhotoshoot from "@/components/UploadPhotoshoot.vue";
import axios from "axios";
import "lightgallery.js";
import "lightgallery.js/dist/css/lightgallery.css";
//import "@/assets/css/bootstrap.min.css";
import { baseUrl } from "../../constants";
import AuthorizedUserArea from "@/views/dashboard/AuthorizedUserArea.vue";
import PhotographerArea from "@/views/dashboard/PhotographerArea.vue";

@Component({
  computed: mapGetters({
    profile: "user/profile"
  }),
  components: {
    Spinner,
    Avatar,
    UploadPhoto,
    UploadPhotoshoot,
    AuthorizedUserArea,
    PhotographerArea
  }
})
export default class DashboardHome extends Vue {
  private isBusy: boolean = false;
  private homeData = {} as any;
  private selectedFile: any = null;
  //private isPublic = true;

  //Modals
  private isPhotoModalActive = false;
  private isPhotoshootModalActive = false;

  // Loading
  private isLoading = true;
  private isFullPage = true;

  get name() {
    return this.homeData.firstName + " " + this.homeData.lastName;
  }

  private onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }
  private onUpload() {
    this.isLoading = true;
    const fd = new FormData();
    fd.append("newimage", this.selectedFile, this.selectedFile.name);
    //fd.append('id', this.homeData.id);
    axios
      .post(
        `${baseUrl}/api/image/changeuserimage/${this.homeData.id}`,
        fd,
        {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      )
      .then(res => {
        //console.log(res);
        this.homeData.base64 = res.data;
        this.isLoading = false;
      });
  }

  private created() {
    this.isBusy = true;
    dashboardService.getHomeDetails().then((resp: any) => {
      //console.log(resp.data);
      this.homeData = resp.data;
      this.isBusy = false;
      this.isLoading = false;
    });
  }

  private onOpenStatistic() {
    this.$router.push({ name: "statistic" });
  }

  mounted() {
    // @ts-ignore
    lightGallery(document.getElementById("lightgallery"));
  }
}
</script>

<style lang="scss" scoped>
.img__description_layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(36, 62, 206, 0.6);
  color: #fff;
  visibility: hidden;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  /* transition effect. not necessary */
  transition: opacity 0.2s, visibility 0.2s;
}

.img__wrap:hover .img__description_layer {
  visibility: visible;
  opacity: 1;
}

.img__description {
  transition: 0.2s;
  transform: translateY(1em);
}

.img__wrap:hover .img__description {
  transform: translateY(0);
}
</style>
