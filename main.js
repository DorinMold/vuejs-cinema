import './style.scss';
import Vue from 'vue';

//import MovieList from './components/MovieList.vue'; - AFTER CREATING Overview.vue we don't need it here anymore just in Overview.vue
//import MovieFilter from './components/MovieFilter.vue'; - AFTER CREATING Overview.vue we don't need it here anymore just in Overview.vue

//import Overview from './components/Overview.vue'; //dupa crearea routes.js nu mai e nevoie de asta aici

import VueResource from 'vue-resource';
import {checkFilter, setDay} from './util/bus.js';

Vue.use(VueResource); //pentru a putea utiliza this.$http (mai jos)

import moment from 'moment-timezone'; //este in node modules
moment.tz.setDefault('UTC'); //se face stabilirea orei in stilul UTC
Object.defineProperty(Vue.prototype,'$moment', { get(){
    return this.$root.moment;
}});

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {
     get(){ return this.$root.bus; }
});

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes.js';
const router = new VueRouter({ routes });

import Tooltip from './util/tooltip.js';
Vue.use(Tooltip);

new Vue({
   el: "#app",
   data:{
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment(),  //fara argument e ziua de azi
    bus
    },
    /* methods: {
    checkFilter(category, title, checked){  //prin crearea util/bus.js nu mai avem nevoie de partea asta aici
        if(checked){
           this[category].push(title);
        } else {
            let index = this[category].indexOf(title);
            if(index>-1){
                this[category].splice(index,1);
            }
        }
    }  
   },  */
   //components:{
    //   Overview
     //  MovieList  //sau MovieList:MovieList - AFTER CREATING Overview.vue we don't need it here anymore just in componenets Overview.vue
         /* template: `<div id="movie-list">
                             <div v-for="movie in filteredMovies" class="movie"> {{movie.title}} </div>
                       </div>`,  AM TRANSFERAT TOTUL IN MovieList.vue   */
         /*   data: function() {
                return{
                    movies: [{title: 'Pulp Fiction', genre: genres.CRIME},
                        {title: 'Home Alone', genre: genres.COMEDY},
                        {title: 'Austin Powers', genre: genres.DOCUMENTARY},
                        {title: 'Gargara', genre: genres.COMEDY}]}
            },
           props: ['genre', 'time'],            // PROPS
           methods: {
               moviePassesGenreFilter(movie){
                   if(!this.genre.length){
                        return true;
                   } else{
                        return this.genre.find(genreMovie => movie.genre === genreMovie);
                   }
               }
           },
           computed:{                    //se foloseste computed si nu methods pentru ca vrem sa recalculeze 
                filteredMovies(){        //automat ori de cate ori ceva se modifica
                   return this.movies.filter(this.moviePassesGenreFilter);
               }
           }   */
         //,
       //  MovieFilter
       /* 'movie-filter': {
            data(){
               return{
                   genres                  //GENRES
                     }
                 },
            template: `<div id="movie-filter">
                            <h2> Filter results </h2>
                           <div class="filter-group"> 
                              <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"> </check-filter>
                           </div>
                     </div>`
                     ,
            methods:{
               checkFilter: function(category, title, checked){
                    this.$emit('check-filter', category, title, checked); //are legatura cu ce se emite mai jos, aici se transmit parametrii
                }
            },
            components:{
                'check-filter': {
                    data(){
                        return {
                            checked: false
                        }
                    },
                    props: ['title'],
                   // template: `<div v-bind:class="{'check-filter': true, active: checked}" v-on:click="checked = !checked">
                   template: `<div v-bind:class="{'check-filter': true, active: checked}" v-on:click="checkFilter">
                        <span class="checkbox">  </span>
                    <span class="check-filter-title"> {{title}} </span>
                    </div>`,
                    methods:{
                        checkFilter(){
                            this.checked = !this.checked;
                            this.$emit('check-filter',"genre",this.title,this.checked);
                        }
                    }
                }
            }
        }  */
   //},
   created(){
       this.$http.get('/api').then(response => {
           this.movies = response.data;
      });

      this.$bus.$on('check-filter', checkFilter.bind(this)); //dupa crearea bus.js this.checkFilter devine checkFilter
      this.$bus.$on('set-day', setDay.bind(this)); // am mutat functia in util/bus.js
   },
   router
});



