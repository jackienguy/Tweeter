<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar
      app
      clipped-right
      fla
      height="72"
      color="blue darken-2"
    >
      <div id="nav-mobile-icon" v-if="isMobileView">
         <v-navigation-drawer
         v-model="drawer"
        :mini-variant.sync="mini"
        permanent
      >
        <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
      
          <v-divider></v-divider>

          <v-list dense>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
      </div>
      
      <h1>Home</h1>

      <v-spacer></v-spacer>

      <v-responsive max-width="156">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
          placeholder="Search"
        ></v-text-field>
      </v-responsive>
    </v-app-bar>

    <div v-if="!isMobileView">
      <v-navigation-drawer 
      class="grey lighten-3"
      permanent app>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              <v-icon
                large
                color="blue darken-2"
              >
                  fas fa-kiwi-bird 
              </v-icon> Kwitter
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

          <v-list
            dense
            nav
          >
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.to"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
              
              </v-list-item>
      <!-- Logout button -->
              <v-btn 
              class="ml-14 mt-2" 
              small 
              @click="logout"
              >
                  Logout
              </v-btn>
      
            </v-list>
          </v-navigation-drawer>
    </div>

    <v-navigation-drawer
      app
      clipped
      right
    >
    </v-navigation-drawer>

    <v-main>
      <newTweets/>
    </v-main>

  </v-app>
</template>


<script>
import newTweets from '../components/newTweets.vue';
import cookies from 'vue-cookies';
import axios from 'axios';

  export default {
    components: {
      newTweets
    },
    data () {
      return {
        items: [
          { title: 'Home', icon: 'fas fa-home', to: '#' },
          { title: 'Discovery', icon: 'fas fa-hashtag', to: '/Discovery' },
          { title: 'Profile', icon: 'fas fa-user-alt', to: '/Profile/:id' },
        ],
        right: null,
        drawer: null,
        profileId: this.$route.params.profileId,
        userId: '',
        isMobileView: true,
        mini: true,
      }
    },
     methods: {
        // log out
        logout (){
              cookies.remove.loginToken;
              cookies.remove.username;
              this.$router.push("/");
        },
        mounted () {
            this.getUserInfo();
        },
        getUserInfo() {
              axios.request ({
                  url: "https://tweeterest.ml/api/users",
                  method: "GET",
                  headers: {
                      'X-Api-Key': process.env.VUE_APP_API_KEY
                  },
                  params: {
                      userId: this.userId
                  },
              }).then((response)=>{
                  console.log(response);
              }).catch((err)=>{
                  console.error(err);
              })
        },
        // For mobile response - creating a method which will adjust page view based on screeen size. Mobile view is set to true if the inner width is <= 960 px to display mobile toggle menu
        handleView() {
          this.isMobileView = window.innerWidth <= 960;
        }
     },
     created() {
       this.handleView();
     }
  }
</script>

<style lang="scss" scoped>
  #logout {
     margin: 10px;
  }
</style>




