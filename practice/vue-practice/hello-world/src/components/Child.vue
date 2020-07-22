<template>
    <div class="child">
        <h2><button @click="$emit('enlarge-text', 0.2)">+</button>{{ msg }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Child',
        data() {
            return {
                msg: 'Child'
            }
        },
        methods: {
            enlargeText() {
                this.$emit('enlarge-text')
            }
        },
    }
</script>

<style  scoped>
.child {
    background: lightblue;
}
</style>