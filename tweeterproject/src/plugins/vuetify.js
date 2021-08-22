// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuelidate from 'vuelidate'

Vue.use(Vuetify)
Vue.use(Vuelidate)

const opts = {}

export default new Vuetify(opts)