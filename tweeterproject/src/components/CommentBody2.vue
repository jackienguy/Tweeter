<template>
    <div>
        <v-card
        max-width="550"
        height="200"
        class="mx-auto"
        >
        <v-list three-line>
            <div> 
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title><b>{{username}}</b></v-list-item-title>
                        <v-list-item-subtitle >{{content}}</v-list-item-subtitle>
                        <v-list-item-subtitle >{{createdAt}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
          </div>
        </v-list>

    <!-- Reaction Buttons -->
        <div>
            <v-row class="pa-md-4 mx-lg-auto" >
                <v-btn
                class="ma-2"
                text
                icon
                >
                <v-icon
                    small
                    color="green darken-2"
                >
                    far fa-comment-alt
                </v-icon>
                </v-btn>
    
                <v-btn
                @click="likeTweet"
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

                
            </v-row>
        </div>
      </v-card>
    </div>
</template>

<script>
    export default {
        name: "CommentBody2",
        props: {
            commentId: Number,
            tweetId: Number,
            userId: Number,
            username: String,
            content: String,
            createdAt: String
        }
    }
</script>

<style lang="scss" scoped>

</style>