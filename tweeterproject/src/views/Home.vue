<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Profile/>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from './Profile.vue'

export default {
  name: 'Home',
  components: {
    Profile
  }
}
</script>
