import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Discovery from '../views/Discovery.vue'
import Register from '../views/Register.vue'
import EditProfile from '../views/EditProfile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/Discovery',
    name: 'Discovery',
    component: Discovery
  },
  {
    path: '/',
    name: 'Sign In',
    component: SignIn
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/EditProfile',
    name: 'Edit Profile',
    component: EditProfile
  }
]

const router = new VueRouter({
  routes
})

export default router
