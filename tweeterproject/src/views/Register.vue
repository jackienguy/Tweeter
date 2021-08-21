<template>
    <div>
        <form @submit.prevent="Register">
            <input type="text" placeholder="First Name" v-model="firstName">
            <input type="text" placeholder="Last Name" v-model="lastName">
            <input type="email" placeholder="Email" v-model="email">
            <input type="text" placeholder="Username" v-model="username">
            <input type="password" placeholder="password" v-model="password">
            <button>Sign Up</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style lang="scss" scoped>

</style>