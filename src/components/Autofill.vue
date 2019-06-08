<template>
    <section>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field label="Find a JS framework">
            <b-autocomplete
                rounded
                v-model="name"
                :data="filteredDataArray"
                placeholder="e.g. jQuery"
                icon="magnify"
                @select="option => selected = option">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

    export default {
        data() {
            return {
                data: [
                    'Cherkasy',
                    'Chernihiv',
                    'Chernivtsi',
                    'Dnipro',
                    'Donetsk',
                    'Ivano-Frankivsk',
                    'Kharkiv',
                    'Kherson',
                    'Khmelnytskyi',
                    'Kiev',
                    'Kropyvnytskyi',
                    'Luhansk',
                    'Lviv',
                    'Mykolaiv',
                    'Odessa',
                    'Poltava',
                    'Rivne',
                    'Sumy',
                    'Ternopil',
                    'Vinnytsia',
                    'Lutsk',
                    'Uzhhorod',
                    'Zaporizhia',
                    'Zhytomyr'
                ],
                name: '',
                selected: null
            }
        },
        computed: {
            filteredDataArray() {
                return this.data.filter((option) => {
                    return option
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }
        }
    }
</script>