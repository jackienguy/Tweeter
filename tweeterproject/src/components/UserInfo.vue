<template>
    <v-sheet
    class="pa-4"
    height="250"
    >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
        <v-img src='imageUrl'></v-img>
        </v-avatar>

        <v-btn @click="editProfileBtn">Edit</v-btn>

        <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <b>{{username}}</b> 
              </v-list-item-title>
              <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{bio}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-sheet>
</template>

<script>
    export default {
        name: "UserInfo",
        props: {
            userId: Number,
            bio: String,
            username: String,
            email: String,
            password: String,
            birthdate: String,
            imageUrl: String,
            bannerUrl: String 
        },
        methods: {
            editProfileBtn() {
                this.$emit(' editProfileBtn', this.$router.push("/EditProfile"))
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>