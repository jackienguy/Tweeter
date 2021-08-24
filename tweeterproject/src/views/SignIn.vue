<template>
    <div>
    <!-- Vuetify Form for Signin -->
        <v-form>
             <v-row>
                <v-col
                    cols="12"
                    md="6"
                    >
                    <v-card  elevation="12" outlined shaped tile>
                        <v-toolbar dark color="blue">
                            <v-toolbar-title>Login to Tweeter</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col
                                    cols="12"
                                    md="8"
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
                                    cols="12"
                                    md="8"
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
                        <v-btn class="mr-4" @click="login">Login</v-btn>
                        <p id="signupMessage">Don't have an account? <router-link to="/Register">Sign Up</router-link></p>
                        </v-card>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

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
                        "email": "email",
                        "password": "password"
                    }
                }).then((response) => {
                    cookies.set ('loginToken', response.data.token);
                    console.log(response.data.token);
                    this.$router.push("/")
                }).then((err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>