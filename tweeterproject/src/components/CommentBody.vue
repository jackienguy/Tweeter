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

      <!-- Use v-if/v-else to toggle tweet editing text field to display text field if isEditing is true when edit button is click, else, it will just display the tweet post. -->
     <v-card-text 
     class="text-h5 font-weight-bold"
     v-if="isEditing"
     >
        <v-text-field v-model="content"
            name="name"
            label="label"
            id="id"
            ></v-text-field>
          <v-btn 
          id="save-btn"
          @click="commentsEditSave" 
          color="success"
          >
              Save
          </v-btn>
          <v-btn 
          @click="isEditing = false" 
          color="error"
          >
              Cancel
          </v-btn>
      </v-card-text>

      <v-card-text 
      class="text-h5 font-weight-bold"
      v-else
      >
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
            <v-list-item-title> @ <b>{{username}}</b></v-list-item-title>
            <v-list-item-title>{{createdAt}}</v-list-item-title>
          </v-list-item-content>

          <v-row
            align="center"
            justify="end"
          >
           <!-- Like/Unlike button -->
            <div v-if="!isLiked">
                <v-btn
                @click="likedComment"
                class="ma-2"
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
            </div>

            <div v-else>
                <v-btn
                @click="unlikedComment"
                class="ma-2"
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
            </div>

             <LikesCounter
            :numLikesCount="numLikesCount"
            :tweetId="tweetId"
            />

          <!-- Edit tweet button -->
            <div>
                <v-btn
                @click="isEditing = !isEditing"
                class="ma-2"
                text
                icon
                >
                <v-icon
                small
                color="white darken-2"
                >
                      far fa-edit
                </v-icon>
                </v-btn>
            </div>

        <!-- Delete button -->
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
import LikesCounter from './LikesCounter.vue'

    export default {
        name: "CommentBody",
        components: {
          LikesCounter
        },
        props: {
            commentId: Number,
            tweetId: Number,
            userId: Number,
            username: String,
            content: String,
            createdAt: String,
            isExpanded: Boolean,
            isEditing: Boolean,
            isLiked: Boolean,
            numLikesCount: Number
        },
        methods: {
         // Deleting a comment
          deleteComment () {
              axios.request ({
                  url: "https://tweeterest.ml/api/comments",
                  method: "DELETE",
                  headers: {
                    'X-Api-Key': process.env.VUE_APP_API_KEY,
                    "Content-Type": "application/json"
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
          },
          // Editing comments
           commentsEditSave() {
             axios.request({
               url: "https://tweeterest.ml/api/comments",
               method: "PATCH",
               headers: {
                  'X-Api-Key': process.env.VUE_APP_API_KEY,
                  "Content-Type": "application/json"
                },
                data: {
                  loginToken: cookies.get('loginToken'),
                  commentId: this.commentId,
                  content: this.content
                }
             }).then((response)=>{
                  console.log(response);
                  this.isEditing = false;
             }).catch((err)=>{
                  console.error(err);
             })
           },
          //  Liking comment
           likedComment () {
                axios.request({
                    url: "https://tweeterest.ml/api/comment-likes",
                    method: "POST",
                     headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY,
                        "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get('loginToken'),
                        commentId: this.commentId
                    }
                }).then((response)=>{
                    console.log("You liked a tweet" +response);
                    this.isLiked = !this.isLiked;
                    this.numLikesCount += 1
                    cookies.set('numLikesCount', this.numLikesCount)
                }).catch((err)=>{
                     console.error("Already liked the tweet" +err);
                })
            },
            // unliking comment
            unlikedComment () {
                axios.request({
                    url: "https://tweeterest.ml/api/comment-likes",
                    method: "DELETE",
                    headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY,
                        "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get('loginToken'),
                        commentId: this.commentId
                    }
                }).then((response)=> {
                    console.log("unliked" +response);
                    this.numLikesCount -= 1;
                }).catch((err)=>{
                    console.error(err);
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
  #save-btn {
     margin: 10px;
  }
</style>