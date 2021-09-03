<template>
    <div>
        {{numLikes}}
    </div>
</template>

<script>
    export default {
        name: "LikesCounter",
        props: {
            numLikes: {
                type: Boolean,
                defaul: 0
            }    
        }
    }
</script>

<style lang="scss" scoped>

</style>