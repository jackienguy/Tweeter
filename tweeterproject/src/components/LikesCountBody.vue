<template>
    <div>
        {{numLikesCount}}
    </div>
</template>

<script>
    export default {
        name: "LikesCounter",
        props: {
            tweetId: Number,
            numLikesCount: {
                type: Number,
                defaul: 0
            }    
        }
    }
</script>

<style lang="scss" scoped>

</style>