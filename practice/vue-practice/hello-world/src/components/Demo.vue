<template>
    <div>
        <span :title="title">查看页面加载时间</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: new Date().toLocaleString()
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>