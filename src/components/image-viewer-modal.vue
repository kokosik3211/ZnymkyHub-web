<template>
  <div class="card">
    <div class="card-image">
        <figure class="image image-container">
            <img :src="photoData.base64">
        </figure>
    </div>
    <div class="card-content">
        <div class="columns has-margin-bottom-5">
            <div class="column is-6">
                <div class="media-left"></div>
                <div class="media-content">
                    <p class="title is-4">{{ photoData.phName }}</p>
                    <p v-if="photoData.phInstagram" class="subtitle is-6">@{{ photoData.phInstagram }}</p>
                </div>
            </div>
            <div v-show="isAuthenticated" class="column is-4 is-offset-2 has-text-right">
                <a class="actions" @click="likeAction()">
                    <span class="icon is-medium has-margin-right-15 like-action">
                      <i v-if="photoData.liked" class="fas fa-heart fa-2x"></i>
                      <i v-else class="far fa-heart fa-2x"></i>
                    </span>
                </a>
                <a class="actions" @click="saveAction()">
                  <span class="icon is-medium save-action">
                    <i v-if="photoData.saved" class="fas fa-bookmark fa-2x"></i>
                    <i v-else class="far fa-bookmark fa-2x"></i>
                  </span>
                </a>
            </div>
        </div>
        <div class="content">
            {{ photoData.numlikes }} likes
            <br>
            {{ photoData.name }} <a>@znymkyhub</a>
            <br>
            <small>{{ photoData.date }}</small>
        </div>
  </div>
  <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { photoService } from "../services/photo.service";
import { EventBus } from "../event-bus";

export default {
  props: {
    imageId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      photoData: {},
      isLoading: true,
      likeIcon: null
    };
  },
  computed: {
    ...mapGetters({
      profile: "user/profile",
      isAuthenticated: "auth/isAuthenticated"
    })
  },
  methods: {
    likeAction () {
      var like = $(".like-action .fa-heart");
      var isUnliked = like.hasClass("far");
      if(isUnliked){
        like.removeClass("far");
        like.addClass("fas");
        this.photoData.numlikes++;
        EventBus.$emit('like-photo', this.imageId);
        photoService.likePhoto(this.imageId).then((resp) => {});
      } else {
        like.removeClass("fas");
        like.addClass("far");
        this.photoData.numlikes--;
        EventBus.$emit('unlike-photo', this.imageId);
        photoService.unlikePhoto(this.imageId).then((resp) => {});
      }
    },
    saveAction () {
      var save = $(".save-action .fa-bookmark");
      var isUnsaved = save.hasClass("far");
      if(isUnsaved){
        save.removeClass("far");
        save.addClass("fas");
        this.photoData.numsaves++;
        EventBus.$emit('save-photo', this.imageId);
        photoService.savePhoto(this.imageId).then((resp) => {});
      } else {
        save.removeClass("fas");
        save.addClass("far");
        this.photoData.numsaves--;
        EventBus.$emit('unsave-photo', this.imageId);
        photoService.unsavePhoto(this.imageId).then((resp) => {});
      }
    }
  },
  created() {
    this.$http.get("/api/image/getphoto", { params: {photoId: this.imageId } }).then(res => {
      this.photoData = res.data;
      this.isLoading = false;
    });
  }
};
</script>

<style scoped>
.image-container {
  min-height: 450px;
}
a.actions { color: inherit; }
</style>
