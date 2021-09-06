<template>
    <div>
         <v-btn @click="editProfile">Edit</v-btn>
          <v-btn @click="updateUsername">Edit</v-btn>
    </div>
</template>

<script>
    export default {
        name: "EditProfile",
        methods: {
            updateUsername(newUsername){
                return this.$store.dispatch('editUsername', newUsername)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>