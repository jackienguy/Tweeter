<template>
<!-- Using Vuetify wireframe for layout and design -->
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

      <UserProfileInfo/>

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
import newTweets from "../components/newTweets.vue";
import UserProfileInfo from '../components/UserProfileInfo.vue'

  export default {
    //
    components: {
      newTweets,
      UserProfileInfo
    },
    data () {
      return {
        items: [
          { title: 'Home', icon: 'fas fa-home', to: '/Home/:profileId' },
          { title: 'Discovery', icon: 'fas fa-hashtag', to: '/Discovery' },
        ],
        drawer: null, 
      }
    },
     methods: {
        // log out
        logout (){
              cookies.remove.loginToken;
              cookies.remove.username;
              this.$router.push("/");
        },
        editProfileBtn () {
          this.$router.push('/editProfile')
        }
    }
}
    
  
</script>

<style lang="scss" scoped>

</style>

