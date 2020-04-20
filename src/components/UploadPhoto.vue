<template>
  <form action="">
    <div class="modal-card" style="width: 640">
      <header class="modal-card-head">
        <p class="modal-card-title">Upload photo</p>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column is-8">
            <b-field class="file">
              <b-upload v-model="photoToUpload">
                <a class="button is-primary">
                  <b-icon icon="upload"></b-icon>
                  <span>Click to upload</span>
                </a>
              </b-upload>
              <span class="file-name" v-if="photoToUpload">
                {{ photoToUpload.name }}
              </span>
            </b-field>
            <img v-if="imagePreview" :src="imagePreview" />
          </div>
          <div class="column has-text-left">
            <b-field label="Name">
              <b-input
                size="is-small"
                v-model="photoObject.name"
                :disabled="!imagePreview"
              ></b-input>
            </b-field>
            <!-- {{photoObject.name}} -->
            <b-field label="Type">
              <b-select
                size="is-small"
                v-model="photoObject.pType"
                placeholder="Select a type"
                :disabled="!imagePreview"
              >
                <option v-for="option in phTypes" :value="option" :key="option">
                  {{ option }}
                </option>
              </b-select>
            </b-field>
            <!-- {{photoObject.pType}} -->
          </div>
        </div>
      </section>
      <footer class="modal-card-foot has-text-right">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button
          class="button is-primary"
          type="button"
          @click.stop="uploadPhoto"
        >
          Done
        </button>
      </footer>
    </div>
  </form>
</template>

<script lang="ts">
import Spinner from "@/components/Spinner.vue"; // @ is an alias to /src
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Avatar from "vue-avatar/src/Avatar.vue";
import { PhotoToUpload } from "../models/phototoupload.interface";
import { EventBus } from ".././event-bus";
import axios from "axios";
import "lightgallery.js";
import "lightgallery.js/dist/css/lightgallery.css";
//import "@/assets/css/bootstrap.min.css";
import { baseUrl } from "../constants";

@Component({
  computed: mapGetters({
    profile: "user/profile"
  }),
  components: {
    Spinner,
    Avatar
  }
})
export default class UploadPhoto extends Vue {
  //Photo
  private photoObject = {} as PhotoToUpload;

  private name: string = "";
  private pType = null;

  private phTypes: string[] = [
    "Love story",
    "Wedding",
    "Pending",
    "Children",
    "Family",
    "Portrait",
    "Nude",
    "Newborn",
    "Reportage",
    "Landscape",
    "Food photo",
    "Business",
    "Fashion",
    "Commercial photo",
    "Travel"
  ];

  private photoToUpload: any = null;
  private imagePreview: any = null;

  @Watch("photoToUpload")
  onPropertyChanged(value: string, oldValue: string) {
    // Do stuff with the watcher here.
    //console.log(`New 'photoToUpload' value = ${value}`);
    //console.log(`Old 'photoToUpload' value = ${oldValue}`);
    //this.photoObject.pFile = this.photoToUpload;
    this.imagePreview = URL.createObjectURL(this.photoToUpload);
  }

  private uploadPhoto() {
    const fd = new FormData();
    fd.append("newimage", this.photoToUpload, this.photoToUpload.name);
    this.photoObject.pFile = fd;
    let body = this.photoObject;
    axios
      .post(
        `${baseUrl}/api/image/uploadphoto/${this.photoObject.name}/${
          this.photoObject.pType
        }`,
        fd,
        {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      )
      .then(response => {
        //console.log(response.data);
        EventBus.$emit("photoAdded");
        // @ts-ignore
        this.$parent.close();
      })
      .catch(e => {
        //console.log(e);
      });
  }
}
</script>

<style scoped>
img {
  width: 240px;
  height: 240px;
  object-fit: cover;
  /* border-radius: 50%; */
}
</style>
