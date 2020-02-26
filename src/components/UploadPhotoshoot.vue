<template>
  <form action="">
    <div class="modal-card" style="width: 640">
      <header class="modal-card-head">
        <p class="modal-card-title">Upload photoshoot</p>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column is-8">
            <section>
              <b-field>
                <b-upload v-model="dropFiles" multiple drag-drop>
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon icon="upload" size="is-large"> </b-icon>
                      </p>
                      <p>Drop your files here or click to upload</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>

              <div class="tags">
                <span
                  v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-primary"
                >
                  {{ file.name }}
                  <button
                    class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)"
                  ></button>
                </span>
              </div>
            </section>
          </div>
          <div class="column has-text-left">
            <b-field label="Name">
              <b-input size="is-small" v-model="photoObject.name"></b-input>
            </b-field>
            <!-- {{photoObject.name}} -->
            <b-field label="Type">
              <b-select
                size="is-small"
                v-model="photoObject.pType"
                placeholder="Select a type"
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

@Component({
  computed: mapGetters({
    profile: "user/profile"
  }),
  components: {
    Spinner,
    Avatar
  }
})
export default class UploadPhotoshoot extends Vue {
  //Photos
  private photoObject = {} as PhotoToUpload;

  private dropFiles: any[] = [];

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

  private deleteDropFile(index: number) {
    this.dropFiles.splice(index, 1);
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
