<template>
    <div class="pt-4 pb-1">
  <v-card
    class="mx-auto"
    color="caf0f8"
    dark
    max-width="750"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-twitter
      </v-icon>
      <span class="text-h6 font-weight-light">Kweeter</span>
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
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
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
            @click="isExpanded = !isExpanded"
            class="ma-2"
            text
            icon
            >
            <v-icon
                
                small
                color="white darken-2"
            >
                far fa-comment-alt
            </v-icon>
            </v-btn>

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
        
            <v-btn
            @click="isExpanded = !isExpanded"
            class="ma-2"
            outlined
            fab
            color="white"
            >
            <v-icon small>fas fa-caret-down</v-icon>
            </v-btn>
        </v-row>
      </v-list-item>

    <v-divider></v-divider>

    <!-- Reaction Buttons -->
       
        </v-card-actions>
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
            createdAt: String,
            isExpanded: Boolean,
        }
    }
</script>

<style lang="scss" scoped>

</style>