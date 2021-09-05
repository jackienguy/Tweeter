<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
  
      <UserInfoSheet
        :userId="userId"
        :bio="bio"
        :username="username"
        :email="email"
        :password="password"
        :birthdate="birthdate"
        :imageUrl="imageUrl"
        :bannerUrl="bannerUrl"
      />
   
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
          <v-btn @click="logout">Logout</v-btn>
           
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
import UserInfoSheet from "../components/UserInfoSheet.vue";

  export default {
    //
    components: {
      newTweets,
      UserInfoSheet
    },
    data () {
      return {
        items: [
          { title: 'Home', icon: 'fas fa-home', to: '/Home' },
          { title: 'Discovery', icon: 'fas fa-hashtag', to: '/Discovery' },
        ],
        drawer: null, 
        // I planned to have a seperate component for individual user info and render the info to the parent 'Profile', but ran into issue with v-sheet and props not populating on the 'Profile' component and was not able to find the issue thorough debugging so I moved on to work on other aspects of the project
      }
    },
     methods: {
        // log out
        logout (){
              cookies.remove.loginToken;
              cookies.remove.username;
              this.$router.push("/");
        },
    }
}
    
  
</script>
