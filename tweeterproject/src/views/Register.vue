<template>
<!-- The form is from Vuetify -->
<v-app id="inspire">
    <v-app-bar
      app
      color="grey lighten-3"
      flat
    > 
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
          <v-col>
            <v-sheet
              id="registerForm"
              min-height="60vh"
              width="50vw"
              rounded="lg"
            >
            <v-toolbar color="blue">
              <v-icon
              large
              color="blue darken-2"
              class="ma-2"
              >
                  fas fa-kiwi-bird 
              </v-icon>
              <v-toolbar-title>Register for Kwitter</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-row>
                  <v-col
                      cols="12"
                      md="10"
                  >
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
                            label="Profile piuture URL"
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
                            label="Birthday (YYYY-MM-DD)"
                            required
                            @input="$v.birthdate.$touch()"
                            @blur="$v.birthdate.$touch()"
                        ></v-text-field>
                        <v-btn class="mr-4" @click="submitSignup">Create Account</v-btn>
                      </v-card-text>
                  </v-col>
              </v-row> 
            </v-card-text>
            </v-sheet>
          </v-col>
      </v-container>
    </v-main>
</v-app>
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
      userId: '',
      username: '',
      email: '',
      password: '',
      bio: '',
      birthdate: '',
      imageUrl: '',
      loginToken: '',
      bannerUrl:''
    }),

    computed: {
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
                birthdate: this.birthdate,
                imageUrl: this.imageUrl
            }
        }).then((response) => {
            console.log(response);
            console.log("You successfully created an account");
            cookies.set ('loginToken', response.data.token);
            cookies.set ('username', response.data.username);
            
            this.$router.push("/#");
        }).catch((err)=>{
            console.log(err);
            return alert ("Invalid Fields")
            
        })
      },
     
    },
  }
  
</script>

<style lang="scss" scoped>
  #registerForm {
    margin-left: 20vw
  }
</style>