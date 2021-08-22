<template>
    <div>
    <!-- Vuetify Form for Signin -->
    <form>
        <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
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
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
        ></v-text-field>
        <v-btn class="mr-4" @click="login">Login</v-btn>
    </form>
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
                    url:"https://tweeterest.ml/api/login",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                         'X-Api-Key': process.env.VUE_APP_API_KEY
                    },
                }).then((response) => {
                    cookies.set('loginToken', response.data.token);
                    console.log(response.data.token);
                }).catch((err) => {
                    console.error(err);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>