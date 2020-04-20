<template>
  <div>
    <div class="container">
        <b-field class="is-full-width">
            <b-radio-button class="is-full-width"
                v-model="checkedTab"
                native-value="saved">
                <b-icon pack="fas" icon="fas fa-bookmark"></b-icon>
                <span>Saved</span>
            </b-radio-button>

            <b-radio-button class="is-full-width" 
                v-model="checkedTab"
                native-value="favouritePh">
                <b-icon pack="fas" icon="fas fa-users"></b-icon>
                <span class="has-margin-left-5">Favourite photographers</span>
            </b-radio-button>
        </b-field>
    </div>
    <PhotoArea v-if="checkedTab == 'saved'" :id="id" :contentType="'saved'"/>
    <FavouritePhotographers v-if="checkedTab == 'favouritePh'"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import PhotoArea from "@/components/PhotoArea.vue"
import FavouritePhotographers from "@/components/FavouritePhotographers.vue";

@Component({
  computed: mapGetters({
    profile: "user/profile"
  }),
  components: {
    PhotoArea,
    FavouritePhotographers
  }
})
export default class AuthorizedUserArea extends Vue {
  @Prop()
  id!: number;

  private checkedTab = "saved";

  created() {
  }

  mounted() {
  }
}
</script>

<style scoped>
</style>
