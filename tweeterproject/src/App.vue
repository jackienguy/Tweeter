<template>
  <div id="app">
      <div id="nav">
        <router-link to="/">Sign In</router-link> |
        <router-link to="/Home">Home</router-link> |
        <router-link to="{name: 'Profile', params: {id: userId}}">Profile</router-link> |
        <router-link to="/Profile/CaptainAmerica">Profile</router-link> |
        <router-link to="/Profile/Spiderman">Profile</router-link> |
        <router-link to="/Feed">Feed</router-link> |
        <router-link to="/Discovery">Discovery</router-link> |
        <router-link to="/Register">Sign Up</router-link> |
        <router-link to="/EditProfile">Edit Profile</router-link>
      </div>
    <router-view/>
  </div>
</template>





