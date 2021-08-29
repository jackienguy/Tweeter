
<template>
  <div class="ma-12 pa-12">
    <v-card>
      <v-navigation-drawer
        permanent
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
            <v-btn @click="editProfileBtn">Edit</v-btn>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <!-- {{this.data.username}} -->
              </v-list-item-title>
              <v-list-item-subtitle>Placeholder for email</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Tweets</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Discover</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title> <v-btn @click="logOut">Log Out</v-btn></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-card
      elevation="2"
    ></v-card>
     <v-card
      elevation="2"
    ></v-card>
    <div>
      <UserTweets/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import UserTweets from "../components/UserTweets.vue"

  export default {
    //
    components: {
      UserTweets
    },
    data () {
      return {
        userId: "",
        bio: '',
        username: 'Hulk'
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
                  userId: "1229",
                  bio: "",
                  username:"Hulk"
              }
          }).then((response)=> {
              cookies.get('loginToken'),
              console.log("got the user info"); 
              console.log(response.data[0]);
              console.log(response);
          }).catch((err)=> {
              console.error(err);
          })
        },
        logOut(){
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
