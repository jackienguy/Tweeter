<template>
  <form>
    <v-card  elevation="12" outlined shaped tile>
        <v-toolbar dark color="blue">
            <v-toolbar-title>Create an Account for Tweeter</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-text-field
                v-model="username"
                :error-messages="nameErrors"
                label="Username"
                :counter="20"
                required
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
            ></v-text-field>
            <v-text-field
                v-model="imageUrl"
                :error-messages="imageUrlErrors"
                label="Profile pisture URL"
                @input="$v.imageUrl.$touch()"
                @blur="$v.imageUrl.$touch()"
            ></v-text-field>
            <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
            ></v-text-field>
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
            <v-text-field
                v-model="bio"
                :error-messages="bioErrors"
                label="Bio"
                :counter="200"
                required
                @input="$v.bio.$touch()"
                @blur="$v.bio.$touch()"
            ></v-text-field>
            <v-text-field
                v-model="birthdate"
                :error-messages="birthdateErrors"
                label="Birthday"
                required
                @input="$v.birthdate.$touch()"
                @blur="$v.birthdate.$touch()"
            ></v-text-field>

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
      username: { required, maxLength: maxLength(20) },
      email: { required, email },
      password:  { required },
      bio: { required, maxLength: maxLength(200) },
      birthdate: {required}, 
    },
    data: () => ({
      username: '',
      email: '',
      password: '',
      bio: '',
      birthdate: '',
      imageUrl: ''
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
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.username.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      bioErrors () {
        const errors = []
        if (!this.$v.bio.$dirty) return errors
        !this.$v.bio.maxLength && errors.push('Bio is at most 100 characters long')
        !this.$v.bio.required && errors.push('Bio is required.')
        return errors
      },
      birthdateErrors () {
        const errors = []
        if (!this.$v.birthdate.$dirty) return errors
        !this.$v.birthdate.required && errors.push('Name is required.')
        return errors
      }
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
                username: this.username,
                email: this.email,
                password: this.password,
                bio: this.bio,
                birthdate: "2000-09-02"
            }
        }).then((response) => {
            console.log(response);
            console.log("You successfully created an account");
            cookies.set ('loginToken', response.data.token);
            console.log(response.data.token);
            this.$router.push("/");
        }).catch((err)=>{
            console.log(err.request);
            console.log(err.response);
        })
      },
     
    },
  }
  
</script>

<style lang="scss" scoped>
</style>