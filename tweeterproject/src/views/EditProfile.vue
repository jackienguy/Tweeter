<template>
    <div>
        <v-card  elevation="12" outlined shaped tile>
        <v-toolbar dark color="blue">
            <v-toolbar-title>Edit Profile</v-toolbar-title>
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
                label="imageUrl"
                required
                @input="$v.imageUrl.$touch()"
                @blur="$v.username.$touch()"
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
            <div>
                <v-btn class="ma-2" @click="updateProfile">Update Profile</v-btn>
                <v-btn @click="cancelEdit">Cancel</v-btn>
            </div>
            
        </v-card-text>
        </v-card>
    
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import cookies from 'vue-cookies';
import axios from 'axios';
  
  export default {
    name: "Register",
    mixins: [validationMixin],
    
    validations: {
      username: { required, maxLength: maxLength(20) },
      email: { required, email },
      bio: { required, maxLength: maxLength(200) },
      birthdate: {required},
    },
    data: () => ({
      userId: '',
      username: '',
      email: '',
      bio: '',
      birthdate: '',
      imageUrl: '',
      bannerUrl: '',
    }),

    computed: {
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
        updateProfile() {
            axios.request({
                url: "https://tweeterest.ml/api/users",
                method: "PATCH",
                headers: {
                    'X-Api-Key': process.env.VUE_APP_API_KEY,
                     "Content-Type": "application/json"
                },
                data: {
                  loginToken: cookies.get('loginToken'),
                  bio: this.bio,
                  birthdate: this.birthdate,
                  email: this.email,
                  username: this.username,
                  imageUrl:this.imageUrl
                },
            }).then((response)=> {
                cookies.get('loginToken'),
                console.log("update success"); 
                console.log(response);
                this.$router.push("/Profile")
            }).catch((err)=> {
                console.error(err);
            })
        },
        cancelEdit(){
          this.$router.push('/Profile')
        }

    }
}

</script>


<style lang="scss" scoped>

</style>






// methods: {
//       editProfile (){
//         axios.request({
//           url:"https://tweeterest.ml/api/users",
//           method: "PATCH",
//            headers: {
//                 'X-Api-Key': process.env.VUE_APP_API_KEY,
//                 "Content-Type": "application/json"
//             },
//             data: {
//                 username: this.username,
//                 email: this.email,
//                 bio: this.bio,
//                 birthdate: "2000-09-02"   
//             }
//         }).then((response)=>{
//           console.log(response);
//           console.log("this worked ");
//           cookies.get('loginToken')
//         })
//       }
//     }
  