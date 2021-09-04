<template>
  <div class="pt-4 pb-1">
    <v-card
      class="mx-auto"
      color="caf0f8"
      dark
      width="60vw"
    >
      <v-card-title>
        <v-icon
          large
          left
        >
          fas fa-kiwi-bird 
        </v-icon>
        <span class="text-h6 font-weight-light">Kwitter</span>
      </v-card-title>

      <v-card-text class="text-h5 font-weight-bold">
        {{content}}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              alt=""
              
            ></v-img>
            <!-- :src="{{userImageUrl}}" -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{username}}</v-list-item-title>
            <v-list-item-title>{{createdAt}}</v-list-item-title>
          </v-list-item-content>

          <v-row
            align="center"
            justify="end"
          >
            <v-btn
            class="likeClicked"
            text
            icon
            >
            <v-icon
            small
            color="green darken-2"
            >
                far fa-thumbs-up
            </v-icon>
            </v-btn>

            <v-btn
            class="unlikeClicked"
            text
            icon
            >
            <v-icon
            small
            color="white darken-2"
            >
                far fa-thumbs-up
            </v-icon>
            </v-btn>

            <v-btn
            @click="deleteComment"
            class="ma-2"
            text
            icon
            >
            <v-icon
            small
            color="white darken-2"
            >
                far fa-trash-alt
            </v-icon>
            </v-btn>
          </v-row>
        </v-list-item>  
      </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';

    export default {
        name: "CommentBody",
        props: {
            commentId: Number,
            tweetId: Number,
            userId: Number,
            username: String,
            content: String,
            createdAt: String,
            isExpanded: Boolean,
        },
        methods: {
         // Deleting a comment
          deleteComment () {
              axios.request ({
                  url: "https://tweeterest.ml/api/comments",
                  method: "DELETE",
                  headers: {
                  'X-Api-Key': process.env.VUE_APP_API_KEY
                  },
                  data: {
                      loginToken: cookies.get('loginToken'),
                      commentId: this.commentId
                  }
              }).then((response)=> {
                    console.log(response);
              }).catch((err)=>{
                    console.error(err);
              })
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>