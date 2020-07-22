<template>
    <div class="alert">
        <strong>Error!</strong>
        <slot></slot>
        <slot name="more"></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style  scoped>
.alert {
    color: red;
}
</style>