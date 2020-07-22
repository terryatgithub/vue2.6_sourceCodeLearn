<template>
  <div class="custom-input">
    Custom input( support v-model):
    <br />
    <p>{{value}}</p>
    <label for="name">name:</label>
    <!-- 组件为了支持其父元素可以在其上使用v-model, 这个组件内的input必须
    1. 将其value绑定到一个名叫‘value’的属性上
    2. 在其input事件被触发时，将新的值通过自定义的input事件抛出 
    https://cn.vuejs.org/v2/guide/components.html#%E7%9B%91%E5%90%AC%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BA%8B%E4%BB%B6
    -->
    <input id="name" type="text" :value="value" @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
    }
};
</script>

<style   scoped>
.custom-input {
    background: lightcoral;
}
</style>