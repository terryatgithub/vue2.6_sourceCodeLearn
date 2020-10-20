<template>
  <div>
    <h6>todo list:</h6>
    <p>
      插槽prop允许我们将插槽转换为可复用的模板，这些模板可以基于输入的prop渲染出不同的内容。
      这在设计封装数据逻辑，同时允许福及组件自定义部分布局的可复用组件时是最有用的。
    </p>
    <p>
      我们可以将每个todo作为福及组件的插槽，一次通过福及组件对齐进行控制，然后将todo作为一个插槽prop进行绑定
      我们为每个todo准备了一个插槽，将todo对象作为一个插槽的prop传入
      现在当我们使用todolist组建的额时候，我们可以选择为todo定义一个不一样的template作为替代方案，并且可以从子组件获取数据：
    </p>
    
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <slot :todo="todo"> default slot: {{ todo.title }} </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["todos"],
};
</script>

<style lang="scss" scoped></style>
