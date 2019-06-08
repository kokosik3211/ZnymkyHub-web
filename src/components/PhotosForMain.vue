<template>
<div>
    <section class="hero">
        <div class="hero-body">
            <br>
            <div class="has-text-centered subtitle">The best pictures</div>
            <div class="container">
            <!-- <h1 class="title">
                Medium title
            </h1>
            <h2 class="subtitle">
                Medium subtitle
            </h2> -->

                <!-- <div class="columns is-mobile is-multiline is-centered">
                    <div v-for="(photographer) in Photographers" :key="photographer.id" class="column" style="text-align: center; padding: 27px;">
                        <div>
                            <avatar :size="100" :username="photographer.fullName" :src="photographer.photo" style="display: inline-block;"></avatar>
                        </div>
                        <p class="is-size-7" style="margin-top: 7px;">{{photographer.fullName}}</p>
                        <p class="is-italic is-size-7">{{photographer.homeTown}}</p>
                    </div>
                </div> -->

                <div class="tile is-ancestor" style="height: 900px;">
                    <div class="tile is-vertical is-7">
                        <div class="tile">
                        <div class="tile is-parent is-vertical">
                            <article class="tile is-child notification is-primary" style="background: url(https://images.unsplash.com/photo-1460978812857-470ed1c77af0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1158&q=80) center no-repeat;background-size: cover;">
                                <!-- <p class="title">Vertical...</p>
                                <p class="subtitle">Top tile</p> -->
                            </article>
                            <article class="tile is-child notification is-warning" style="background: url(https://images.unsplash.com/photo-1439539698758-ba2680ecadb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80) center no-repeat;background-size: cover;">
                                <!-- <p class="title">...tiles</p>
                                <p class="subtitle">Bottom tile</p> -->
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child notification is-info" style="background: url(https://images.unsplash.com/photo-1549417338-6f137ab2cd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80) center no-repeat;background-size: cover;">
                                <!-- <p class="title">Middle tile</p>
                                <p class="subtitle">With an image</p>
                                <figure class="image is-4by3">
                                    <img src="https://bulma.io/images/placeholders/640x480.png">
                                </figure> -->
                            </article>
                        </div>
                        </div>
                        <div class="tile is-parent">
                        <article class="tile is-child notification is-danger" style="background: url(https://images.unsplash.com/photo-1489396160836-2c99c977e970?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80) center no-repeat;background-size: cover;">
                            <!-- <p class="title">Wide tile</p>
                            <p class="subtitle">Aligned with the right tile</p>
                            <div class="content">
                            </div> -->
                        </article>
                        </div>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-success" style="background: url(https://images.unsplash.com/photo-1498988978055-310e6e69a475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80) center no-repeat;background-size: cover;">
                        <!-- <div class="content">
                            <p class="title">Tall tile</p>
                            <p class="subtitle">With even more content</p>
                            <div class="content">
                            </div>
                        </div> -->
                        </article>
                    </div>
                    </div>

                <p class="has-text-centered is-size-6">There are thousands of wonderful photos</p>

            </div>
        </div>
    </section>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "../models/user.interface";
import Avatar from 'vue-avatar/src/Avatar.vue';
import axios from "axios";

@Component({
  components: {
    Avatar
  }
})
export default class PhotosForMain extends Vue {

    created(){
        
    }
}
</script>

<style scoped>
    .column {
        text-align: center;
    }
</style>
