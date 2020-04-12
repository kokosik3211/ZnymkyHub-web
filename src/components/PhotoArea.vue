<template>
  <section class="container" style="margin-top: 24px; margin-bottom: 24px;">
    <b-loading
      :is-full-page="isFullPage"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>
    <div v-if="Photos.length" class="columns is-multiline is-centered">
      <!-- <ul id="lightgallery" class="list-unstyled row">
            <li class="column" data-src="https://images.unsplash.com/photo-1549417338-6f137ab2cd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"  data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1">
              <a href="">
                <div class="thumbnail">
                  <img class="portrait" src="https://images.unsplash.com/photo-1549417338-6f137ab2cd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80" />
                </div>
              </a>
            </li>
          </ul> -->
      <!-- <div id="lightgallery">
            <div class="columns is-mobile is-multiline is-centered">
                <div v-for="(photo) in Photos" :key="photo" class="column" :data-src="photo" style="text-align: center; padding: 27px;">
                    <div>
                        <img width="200" height="200" :src="photo" style="display: inline-block; object-fit: cover" />
                    </div>
                </div>
            </div>
          </div> -->
      <!-- <ul id="lightgallery" class="row">
                <li v-for="(photo) in Photos" :key="photo" data-src="" class="column" style="text-align: center; padding: 27px;">
                    <a>
                        <div class="thumbnail">
                            <img :src="photo" style="display: inline-block;" />
                        </div>
                    </a>
                </li>
          </ul> -->
      <div
        v-for="photo in Photos"
        :key="photo.id"
        class="column"
        style="text-align: center; padding: 27px;"
      >
        <div style="display: inline-block;">
          <div class="img__wrap" style="display: inline-block;">
            <img :src="photo.base64" />
            <div class="img__description_layer">
              <p class="img__description">
                <i class="far fa-heart"></i>
                {{ photo.numlikes }}&nbsp;&nbsp;&nbsp;<i
                  class="far fa-bookmark"
                ></i>
                {{ photo.numsaves }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- <div id="lightgallery">
            <a v-for="(photo) in Photos" :key="photo" :data-src="photo">
                <img :src="photo" />
            </a>
        </div> -->
    </div>
    <section v-else class="hero is-medium is-light is-bold rounded-corners">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">
            Sorry, no photos yet 😥
          </h1>
        </div>
      </div>
    </section>
    <hr />
    <b-pagination
      :total="total"
      :current.sync="current"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
    </b-pagination>
  </section>
</template>

<script lang="ts">
import Spinner from "@/components/Spinner.vue"; // @ is an alias to /src
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { EventBus } from ".././event-bus";
import axios from "axios";
import { Photo } from "../models/photo.interface";
import "lightgallery.js";
import "lightgallery.js/dist/css/lightgallery.css";
//import "@/assets/css/bootstrap.min.css";

@Component({
  computed: mapGetters({
    profile: "user/profile"
  }),
  components: {
    Spinner
  }
})
export default class PhotoArea extends Vue {
  @Prop()
  id!: number;

  // Photos
  private Photos: Photo[] = [];

  // Loading
  private isLoading = true;
  private isFullPage = true;

  // Pagination
  private total = 15;
  private current = 1;
  private perPage = 15;
  private order = "is-centered";
  private size = "is-small";
  private isSimple = false;
  private isRounded = true;

  @Watch("current")
  onPropertyChanged(value: string, oldValue: string) {
    // Do stuff with the watcher here.
    //console.log(`New 'current' value = ${value}`);
    //console.log(`Old 'current' value = ${oldValue}`);
    this.isLoading = true;
    axios
      .post(
        `http://localhost:5000/api/image/getphotosforphotoarea/${this.id}/${
          this.current
        }`
      )
      .then(response => {
        this.Photos = response.data;
        //console.log(this.Photos);
        this.isLoading = false;
      })
      .catch(e => {
        //console.log(e);
      });
  }

  private created() {
    EventBus.$on("photoAdded", () => {
      this.isLoading = true;
      axios
        .post(
          `http://localhost:5000/api/image/getphotosforphotoarea/${this.id}/${
            this.current
          }`
        )
        .then(response => {
          this.Photos = response.data;
          //console.log(this.Photos);
          this.isLoading = false;
        })
        .catch(e => {
          //console.log(e);
        });
    });
    // console.log(`PhotoArea created with id = ${this.id}`);
    axios
      .post(
        `http://localhost:5000/api/image/getinfoforphotopaginator/${this.id}`
      )
      .then(response => {
        this.total = response.data;
        //console.log(`Total count of photos = ${this.total}`);
      })
      .catch(e => {
        //console.log(e);
      });
    axios
      .post(
        `http://localhost:5000/api/image/getphotosforphotoarea/${this.id}/${
          this.current
        }`
      )
      .then(response => {
        this.Photos = response.data;
        //console.log(this.Photos);
        this.isLoading = false;
      })
      .catch(e => {
        //console.log(e);
      });
  }

  mounted() {
    // console.log(`PhotoArea mounted with id = ${this.id}`);
    // @ts-ignore
    lightGallery(document.getElementById("lightgallery"));
    // @ts-ignore
    //     $('#lightgallery').lightGallery({
    //     selector: '.item'
    // });
  }
}
</script>

<style scoped>
img {
  width: 240px;
  height: 240px;
  object-fit: cover;
}
.thumb {
  background: url(https://images.unsplash.com/photo-1524772128034-3ecf9a73cbe9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)
    50% 50% no-repeat;
  /*background-position: 50% 50%;*/
  /*background-repeat: no-repeat;*/
  width: 250px;
  height: 250px;
}
.thumbnail {
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
}
.thumbnail img {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.thumbnail img.portrait {
  width: 100%;
  height: auto;
}
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.img__wrap {
  position: relative;
  height: 240px;
  width: 240px;
}

.img__description_layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(112, 112, 114, 0.6);
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

/* .div-for-photo {
  height: 200px;
  width: 50%;
  background-color: powderblue;
} */

.rounded-corners {
  border-radius: 20px 40px;
}
</style>
