<template>
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
              min-height="60vh"
              width="30vw"
              rounded="lg"

            >
            <v-toolbar color="blue">
                <v-toolbar-title>Login to Kwitter</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col
                        cols="12"
                        md="10"
                    >
                        <v-text-field
                            v-model="email"
                            :error-messages="emailErrors"
                            label="E-mail"
                            required
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="1"
                        md="10"
                    >
                        <v-text-field
                            v-model="password"
                            :error-messages="passwordErrors"
                            label="Password"
                            type="password"
                            required
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <div>
                <v-btn class="mr-4" @click="login">Login</v-btn>
            </div>
        
            <v-spacer></v-spacer>
            <div>
                      <p>Don't have an account? <router-link to="/Register">Sign Up</router-link></p>
            </div>
            </v-sheet>
          </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>



------------------


<script>
import axios from 'axios';
import cookies from 'vue-cookies';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

    export default {
        name: "SignIn",
        mixins: [validationMixin],
        validations: {
            name: { required },
            email: { required, email },
            password:  { required }
        },
        data: () => ({
            name: '',
            email: '', 
            password: '',
        }),
        computed: {
            nameErrors () {
                const errors = []
                if (!this.$v.name.$dirty) return errors
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
            passwordErrors () {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required.')
                return errors
            }
        },
        methods: {
            login () {
                axios.request({
                    url: "https://tweeterest.ml/api/login",
                    method: "POST",
                    headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY,
                        "Content-Type": "application/json"
                    },
                    data: {
                        email: this.email,
                        password: this.password
                    }
                }).then((response) => {
                    cookies.set ('loginToken', response.data.loginToken);
                    cookies.set('username', response.data.username)
                    console.log(response.data.loginToken);
                    console.log(response);
                    this.$router.push("/Home")
                }).then((err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>