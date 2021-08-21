<template>
    <div>
        <form @submit.prevent="signin">
            <h1>Log into Tweeter</h1>
            <input type="text" placeholder="Username or Email" v-model="user"/>
            <input type="password" placeholder="password" v-model="password"/>

        </form>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>