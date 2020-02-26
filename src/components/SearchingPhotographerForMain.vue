<template>
  <div>
    <section class="hero is-danger">
      <div class="hero-body">
        <div class="has-text-centered title">Search for a photographer</div>
        <div class="container">
          <!-- <h1 class="title">
        Primary title
      </h1>
      <h2 class="subtitle">
        Primary subtitle
      </h2> -->
          <div class="columns is-multiline is-centered is-vcentered">
            <div class="column is-3">
              <p class="content"><b>City:</b> {{ selectedCity }}</p>
              <b-field>
                <b-autocomplete
                  rounded
                  v-model="cityName"
                  :data="filteredUkrCitiesArray"
                  placeholder="e.g. Lviv"
                  icon="magnify"
                  @select="option => (selectedCity = option)"
                >
                  <template slot="empty"
                    >No results found</template
                  >
                </b-autocomplete>
              </b-field>
            </div>
            <div class="column is-3">
              <p class="content">
                <b>Photoshoot type:</b> {{ selectedPhType }}
              </p>
              <b-field>
                <b-autocomplete
                  rounded
                  v-model="phTypeName"
                  :data="filteredPhTypesArray"
                  placeholder="e.g. Travel"
                  icon="magnify"
                  @select="option => (selectedPhType = option)"
                >
                  <template slot="empty"
                    >No results found</template
                  >
                </b-autocomplete>
              </b-field>
            </div>
            <div class="column is-2">
              <router-link :to="val" class="button is-danger is-inverted"
                >Search</router-link
              >
            </div>
          </div>
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

import "buefy/dist/buefy.css";

@Component({
  components: {
    Avatar
  }
})
export default class SearchingPhotographerForMain extends Vue {
  private ukrCities: string[] = [
    "Cherkasy",
    "Chernihiv",
    "Chernivtsi",
    "Dnipro",
    "Donetsk",
    "Ivano-Frankivsk",
    "Kharkiv",
    "Kherson",
    "Khmelnytskyi",
    "Kiev",
    "Kropyvnytskyi",
    "Luhansk",
    "Lviv",
    "Mykolaiv",
    "Odessa",
    "Poltava",
    "Rivne",
    "Sumy",
    "Ternopil",
    "Vinnytsia",
    "Lutsk",
    "Uzhhorod",
    "Zaporizhia",
    "Zhytomyr"
  ];
  private cityName = "";
  private selectedCity = null;

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
  private phTypeName = "";
  private selectedPhType = null;

  get val() {
    return "search/" + this.selectedCity + "/" + this.selectedPhType;
  }

  created() {}

  get filteredUkrCitiesArray() {
    return this.ukrCities.filter(option => {
      return (
        option
          .toString()
          .toLowerCase()
          .indexOf(this.cityName.toLowerCase()) >= 0
      );
    });
  }

  get filteredPhTypesArray() {
    return this.phTypes.filter(option => {
      return (
        option
          .toString()
          .toLowerCase()
          .indexOf(this.phTypeName.toLowerCase()) >= 0
      );
    });
  }
}
</script>

<style scoped>
.column {
  text-align: center;
}
</style>
