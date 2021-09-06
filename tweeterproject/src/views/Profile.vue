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
      flat
      height="72"
      color="blue darken-2"
    >
      <h1>Profile</h1>

    <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      color="grey lighten-3"
    >
      <v-sheet
    class="pa-4"
    height="250"
    color="grey lighten-3"
    >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
        <v-img src='imageUrl'></v-img>
        </v-avatar>

        <v-btn 
        class="ml-5"
        small 
        @click="editProfileBtn"
        >
          Edit
        </v-btn>

        <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <b>{{this.users.username}}</b> 
              </v-list-item-title>
              <v-list-item-subtitle>{{users.email}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{users.bio}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-sheet>
   
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
          </v-list>
        <!-- Logout Button -->
           <v-btn 
             class="ml-14 mt-2" 
             small 
             @click="logout"
             >
                Logout
             </v-btn>

           
           {{ this.$route.params.id}}
    </v-navigation-drawer>

<!-- User profile main body -->
    <v-main>
        <newTweets/>
        
    </v-main>
     
  </v-app>
</template>

<script>
import cookies from 'vue-cookies'
import axios from 'axios'
import newTweets from "../components/newTweets.vue";
// import UserProfileInfo from '../components/UserProfileInfo.vue'

  export default {
    //
    components: {
      newTweets,
      // UserProfileInfo
    },
    data () {
      return {
        items: [
          { title: 'Home', icon: 'fas fa-home', to: '/Home' },
          { title: 'Discovery', icon: 'fas fa-hashtag', to: '/Discovery' },
        ],
        drawer: null, 
        users: [
          {
            userId: '',
            email: '',
            username: '',
            bio: '',
            birthdate: '',
            imageUrl: ''
          }

        ]
        // I planned to have a seperate component for individual user info and render the info to the parent 'Profile', but ran into issue with v-sheet and props not populating on the 'Profile' component and was not able to find the issue thorough debugging so I moved on to work on other aspects of the project
      }
    },
    mounted () {
            this.getUserInfo();
    },
     methods: {
        // log out
        logout (){
              cookies.remove.loginToken;
              cookies.remove.username;
              this.$router.push("/");
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
                  console.log("got user date");
              }).catch((err)=>{
                  console.error(err);
              })
        },
        editProfileBtn () {
          this.$route.push('/editProfile')
        }
    }
}
    
  
</script>

<style lang="scss" scoped>

</style>

