<template>
  <form>
    <v-card  elevation="12" outlined shaped tile>
        <v-toolbar dark color="blue">
            <v-toolbar-title>Create an Account for Tweeter</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                label="Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
            ></v-text-field>
            <!-- <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                label="Last Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
            ></v-text-field> -->
            <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
            ></v-text-field>
            <!-- <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                label="Username"
                :counter="10"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
            ></v-text-field> -->
            <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                label="Password"
                type="password"
                :counter="10"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
            ></v-text-field>
            <!-- <v-checkbox
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="Do you agree?"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
            ></v-checkbox> -->

            <v-btn class="mr-4" @click="submitSignup">Create Account</v-btn>
        </v-card-text>
    </v-card>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import axios from 'axios';
  import cookies from 'vue-cookies';

  export default {
    name: "Register",
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      password:  { required },
    //   checkbox: {
    //     checked (val) {
    //       return val
    //     },
      
    },

    data: () => ({
      name: '',
      email: '',
      password: '',
    //   checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      submitSignup () {
        axios.request({
            url: "https://tweeterest.ml/api/users",
            method: "POST",
            headers: {
                'X-Api-Key': process.env.VUE_APP_API_KEY,
                "Content-Type": "application/json"
            },
            data: {
                // use this to reference the data properties with v-models created above 
                name: this.name,
                email: this.email,
                password: this.password,
                // "username": "username",
                // "bio": "",
                // "imageUrl": "",
                // "bannerUrl": ""
            }
        }).then((response) => {
            cookies.set ('loginToken', response.data.token);
            console.log(response.data.token);
            console.log("You successfully created an account");
            this.$router.push("/")
        }).then((err)=>{
            console.log(err);
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>