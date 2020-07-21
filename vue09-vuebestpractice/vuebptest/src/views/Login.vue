<template>
    <div>
        <input type="text" v-model="name" placeholder="input username"/>
        <button @click="goLogin" @keyup.enter="goLogin">登录</button> 
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: ''
            }
        },
        methods: {
            async goLogin() {
                await this.$store.dispatch('setToken', this.name)
                this.$router.push('/')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>