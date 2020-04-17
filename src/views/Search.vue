<template>
  <div>
    <!-- <main>
    {{selectedCity}} {{selectedPhType}}
  </main> -->
    <section class="hero is-light" style="margin-top: 50px;">
      <b-loading
        :is-full-page="isFullPage"
        :active.sync="isLoading"
        :can-cancel="true"
      ></b-loading>
      <div class="hero-body">
        <div class="has-text-centered title">Search for a photographer</div>
        <div class="container">
          <div class="columns is-multiline is-centered is-vcentered">
            <div class="column is-3">
              <!-- <p class="content"><b>City:</b> {{ selectedCity }}</p> -->
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
              <!-- <p class="content"><b>Ph type:</b> {{ selectedPhType }}</p> -->
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
              <a class="button is-danger is-rounded" @click="submitSearch"
                >Search</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <div class="columns" style="margin-top:15px;">
    <div class="column is-2 is-offset-1" style="text-align: center; padding: 27px;">
        <div>
            <avatar :size="150" username="Volodymyr Ivash" style="display: inline-block;"></avatar>
        </div>
        <p class="is-size-7" style="margin-top: 7px;">Volodymyr Ivash</p>
        <p class="is-italic is-size-7">Lviv</p>
    </div>
    <div class="column is-2">
        <a href="">
            <div class="thumbnail">
                <img class="portrait" src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80" />
            </div>
        </a>
    </div>
    <div class="column is-2">
        <a href="">
            <div class="thumbnail">
                <img class="portrait" src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=653&q=80" />
            </div>
        </a>
    </div>
    <div class="column is-2">
        <a href="">
            <div class="thumbnail">
                <img class="portrait" src="https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
            </div>
        </a>
    </div>
    <div class="column is-2">
        <a href="">
            <div class="thumbnail">
                <img class="portrait" src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
            </div>
        </a>
    </div>
</div> -->

    <!-- <div class="columns is-mobile is-multiline is-centered" style="margin-top:15px;">
        <div class="column is-2" style="text-align: center; padding: 27px;">
            <div>
                <avatar :size="150" username="Andriy Oliynyk" style="display: inline-block;"></avatar>
            </div>
            <p class="is-size-7" style="margin-top: 7px;">Andriy Oliynyk</p>
            <p class="is-italic is-size-7">Lviv</p>
        </div>

    <ul id="lightgallery" class="list-unstyled row">
        <li class="column" data-src="https://images.unsplash.com/photo-1475150896346-9756f0ade324?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80">
            <a href="">
                <div class="thumbnail">
                    <img class="portrait" src="https://images.unsplash.com/photo-1475150896346-9756f0ade324?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                </div>
            </a>
        </li>
        <li class="column" data-src="https://images.unsplash.com/photo-1478005344131-44da2ded3415?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80">
            <a href="">
                <div class="thumbnail">
                    <img class="portrait" src="https://images.unsplash.com/photo-1478005344131-44da2ded3415?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                </div>
            </a>
        </li>
        <li class="column" data-src="https://images.unsplash.com/photo-1430364917171-5ad508ea49c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80">
            <a href="">
                <div class="thumbnail">
                    <img class="portrait" src="https://images.unsplash.com/photo-1430364917171-5ad508ea49c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                </div>
            </a>
        </li>
        <li class="column" data-src="https://images.unsplash.com/photo-1477830530828-c849c4b9bf2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80">
            <a href="">
                <div class="thumbnail">
                    <img class="portrait" src="https://images.unsplash.com/photo-1477830530828-c849c4b9bf2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                </div>
            </a>
        </li>
    </ul>    

    <div class="column is-2">
        <a href="">
            <div class="thumbnail">
                <img class="portrait" src="https://images.unsplash.com/photo-1475150896346-9756f0ade324?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
            </div>
        </a>
    </div>
    <div class="column is-2">
        <a href="">
            <div class="thumbnail">
                <img class="portrait" src="https://images.unsplash.com/photo-1478005344131-44da2ded3415?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
            </div>
        </a>
    </div>
    <div class="column is-2">
        <a href="">
            <div class="thumbnail">
                <img class="portrait" src="https://images.unsplash.com/photo-1430364917171-5ad508ea49c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
            </div>
        </a>
    </div>
    <div class="column is-2">
        <a href="">
            <div class="thumbnail">
                <img class="portrait" src="https://images.unsplash.com/photo-1477830530828-c849c4b9bf2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
            </div>
        </a>
    </div>
</div> -->

    <!-- <div class="columns is-mobile is-multiline is-centered">
    <div v-for="(photographer) in Photographers" :key="photographer.id" class="column" style="text-align: center; padding: 27px;">
        <div>
            <avatar :size="100" :username="photographer.fullName" :src="photographer.photo" style="display: inline-block;"></avatar>
        </div>
        <p class="is-size-7" style="margin-top: 7px;">{{photographer.fullName}}</p>
        <p class="is-italic is-size-7">{{photographer.homeTown}}</p>
    </div>
</div> -->

    <div
      v-if="done"
      class="container"
      style="margin-top: 24px; margin-bottom: 24px;"
    >
      <div
        class="columns is-mobile is-multiline is-centered"
        style="margin-top:15px;"
      >
        <div
          v-for="result in SearchResultList"
          :key="result.id"
          class="column is-12"
        >
          <div class="columns">
            <div class="column is-offset-3 is-9 has-text-centered">
              ${{ result.price }} per hour
            </div>
          </div>
          <div class="columns is-vcentered">
            <div class="column is-2" style="text-align: center;">
              <a @click="onOpenProfile(result.id)">
                <avatar
                  :size="150"
                  :username="result.fullName"
                  :src="result.base64"
                  style="display: inline-block;"
                ></avatar>
              </a>
              <p class="is-size-7" style="margin-top: 7px;">
                {{ result.fullName }}
              </p>
              <p class="is-italic is-size-7">{{ result.location }}</p>
            </div>

            <div v-if="!result.photos.length" class="column">
              <div class="columns is-centered">
                <b-notification
                  type="is-warning"
                  has-icon
                  aria-close-label="Close notification"
                  role="alert"
                >
                  This photographer has not uploaded any photos of this type
                  yet.
                </b-notification>
              </div>
            </div>
            <div
              v-for="photo in result.photos"
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

            <!-- <div class="column" style="text-align: center;">
                    <div style="display: inline-block;">
                        <div class="img__wrap" style="display: inline-block;">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                            <div class="img__description_layer">
                                <p class="img__description"><i class="far fa-heart"></i> Kek </p>
                            </div>
                        </div>
                    </div>
                </div> -->
          </div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Avatar from "vue-avatar/src/Avatar.vue";
import { User } from "../models/user.interface";
import axios from "axios";

@Component({
  components: {
    Avatar
  }
})
export default class Search extends Vue {
  // Loading
  private isLoading = false;
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
      .post(`http://localhost:5000/api/search/performsearch/`)
      .then(response => {
        //this.Photos = response.data;
        //console.log(this.Photos);
        this.isLoading = false;
      })
      .catch(e => {
        //console.log(e);
      });
  }

  // Search parameters
  private SearchResultList = [];
  private done: boolean = false;
  //@Prop()
  private selectedCity: string = "";

  //@Prop()
  private selectedPhType: string = "";

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

  mounted() {
    this.selectedCity = this.$route.params.selectedCity;
    this.selectedPhType = this.$route.params.selectedPhType;
    if (this.selectedCity != undefined && this.selectedPhType != undefined) {
      this.isLoading = true;
    }
  }

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

  private submitSearch() {
    this.isLoading = true;
    axios
      .post(
        `http://localhost:5000/api/search/performsearch/${this.selectedCity}/${
          this.selectedPhType
        }`
      )
      .then(response => {
        this.SearchResultList = response.data;
        //console.log(`Search result: ${this.SearchResultList}`);
        for (let i = 0; i < this.SearchResultList.length; i++) {
          //console.log(this.SearchResultList[i]);
        }
        this.done = true;
        this.isLoading = false;
      })
      .catch(e => {
        //console.log(e);
      });
  }

  onOpenProfile(id: any) {
    if(this.$store.getters["user/profile"].id == id) {
      this.$router.push("/dashboard/home");
    } else {
      this.$router.push({ name: "profile", params: { id: id } });
    }
  }
}
</script>

<style scoped>
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

/*------------------------*/

img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.img__wrap {
  position: relative;
  height: 200px;
  width: 200px;
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
</style>
