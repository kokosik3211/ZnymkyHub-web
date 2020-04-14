<template>
  <div class="card">
    <div class="card-image">
        <figure class="image image-container">
            <img :src="photoData.base64">
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
        </figure>
    </div>
    <div class="card-content">
        <div class="columns has-margin-bottom-5">
            <div class="column is-6">
                <div class="media-left"></div>
                <div class="media-content">
                    <p class="title is-4">{{ phName }}</p>
                    <p v-if="phInstagram" class="subtitle is-6">@{{ phInstagram }}</p>
                </div>
            </div>
            <div class="column is-4 is-offset-2 has-text-right">
                <a class="actions">
                    <b-icon
                        pack="far"
                        icon="far fa-heart"
                        size="is-medium"
                        class="has-margin-right-15">
                    </b-icon>
                </a>
                <a class="actions">
                    <b-icon
                        pack="far"
                        icon="far fa-bookmark"
                        size="is-medium">
                    </b-icon>
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
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    imageId: {
      type: Number,
      required: true
    },
    phName: {
        type: String,
        required: true
    },
    phInstagram: {
        type: String,
        required: false
    }
  },
  data() {
    return {
      photoData: {},
      isLoading: true
    };
  },
  computed: {
    ...mapGetters({
      profile: "user/profile"
    })
  },
  methods: {
    
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
