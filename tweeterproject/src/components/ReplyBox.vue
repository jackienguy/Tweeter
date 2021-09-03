<template>
     <div >
        <v-container fluid>
          <v-list-item-avatar>
                  <v-img src="https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"></v-img>
                  </v-list-item-avatar>
          <v-textarea 
              v-model="content" 
              placeholder="Add a comment"
              counter: maxlength="200"
          ></v-textarea>
          <v-btn @click="replyToComment(tweetId)">Reply</v-btn>
        </v-container>
        <v-divider></v-divider> 
    </div>
</template>

<script>

import axios from 'axios';
import cookies from 'vue-cookies';

    export default {
        name: "ReplyBox"
    }
</script>

<style lang="scss" scoped>

</style>