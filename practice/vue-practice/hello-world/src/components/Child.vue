<template>
    <div class="child">
        <h1>Child1</h1>
        <ul>
            <li v-for="(item, index) in $attrs" :key="index">$attrs {{ index }}:{{item}}</li>
        </ul>
        <h2><button @click="$emit('enlarge-text', 0.2)">+</button>{{ msg }}</h2>
        <button @click="onClick">emit event to child2 by $bus</button>
        <button @click="onClick1">emit event to child2 by $parent</button>
        <button @click="onClick2">emit event to child2 by $root</button>
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
            },
            onClick() {
                this.$bus.$emit('childevent', 'msg from child1 by $bus')
            },
            onClick1() {
                this.$parent.$emit('childevent', 'msg from child1 by $parent')
            },
            onClick2() {
                this.$root.$emit('childevent', 'msg from child1 by $root')
            }
        },
    }
</script>

<style  scoped>
.child {
    background: lightblue;
}
</style>