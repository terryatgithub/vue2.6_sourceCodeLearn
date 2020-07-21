<template>
    <div>
        <h1>Home Page</h1>
        <router-link to="/login">go login</router-link>
        <router-link to="/about">go about</router-link>
        <router-link to="/admin">go admin</router-link>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    a {
        margin: 10px;
    }
</style>