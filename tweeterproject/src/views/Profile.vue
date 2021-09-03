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
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
        height="250"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
          <v-img src='https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'></v-img>
        </v-avatar>

        <v-btn @click="editProfileBtn">Edit</v-btn>

        <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <b>{{this.username}}</b> 
              </v-list-item-title>
              <v-list-item-subtitle>{{this.email}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{this.bio}}</v-list-item-subtitle>

            </v-list-item-content>
          </v-list-item>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text] in links"
          :key="icon"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <newTweets/>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import newTweets from "../components/newTweets.vue"
// import CommentReplyBox from "../components/CommentReplyBox.vue"

  export default {
    //
    components: {
      newTweets,
      // CommentReplyBox
    },
    data () {
      return {
        cards: ['Today', 'Yesterday'],
        drawer: null,
        links: [
          ['mdi-inbox-arrow-down', 'Home'],
          ['mdi-send', 'Discovery'],
          ['mdi-delete', 'Delete Profile'],
          ['mdi-alert-octagon', 'Logout'],
        ],
        userId: '',
        bio: '',
        username: '',
        email: '',
        password: '',
      }
    },
    created (){
      this.getUserData()
    },
    methods: {
      editProfileBtn() {
         this.$router.push("/EditProfile");
      },
      getUserData() {
          axios.request({
              url: "https://tweeterest.ml/api/users",
              method: "GET",
              headers: {
                  'X-Api-Key': process.env.VUE_APP_API_KEY,
              },
              params: {
                  userId: this.userId,
                  bio: this.bio,
                  username: this.username
              }
          }).then((response)=> {
              cookies.get('loginToken'),
              cookies.get('username')
              console.log("got the user info"); 
              console.log(response);
              this.username = response.data[0].username;
              this.email = response.data[0].email;
              this.bio = response.data[0].bio;

          }).catch((err)=> {
              console.error(err);
          })
        },
        // log out
        logout (){
          cookies.remove.loginToken
        },
        // delete profile
        deleteProfile(){
          axios.request({
              url: "https://tweeterest.ml/api/users",
              method: "DELETE",
              headers: {
                'X-Api-Key': process.env.VUE_APP_API_KEY,
                'Content-Type': "application/json"
              },
              data: {
                'loginToken': 'aiAakhG865LmH96dVMpyp5jTaLrr9baf4A5jjpstDRd1nSr5yX',
                'password': "I am hulk"
              }
            }).then((response)=> {
              console.log(response);
              console.log("log out success");
              this.$router.push('/Signin')
            }).catch((err)=>{
              console.error(err);
            })
        }
    }
    
  }
</script>
