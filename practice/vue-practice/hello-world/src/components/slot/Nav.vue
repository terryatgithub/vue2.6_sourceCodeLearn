<template>
    <a :href="url" class="nav" :title="url">
        <slot></slot>
    </a>
</template>

<script>
    export default {
        data() {
            return {
                url: '#/profile'
            }
        },
    }
</script>

<style scoped>
.nav:hover{
    background: yellow;
}
</style>