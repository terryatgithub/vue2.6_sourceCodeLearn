<template>
  <div>
    <p>作用域插槽</p>
    <p>让插槽内容能够访问子组件中才有的数据</p>
    <p>
      为了让user在父级的插槽内容中可用，可以将user作为slot元素的一个attribute绑定上去:
    </p>
    <p>绑定在slot元素上的attribute恒伟’插槽prop'</p>

    <slot :user="user" :other="other"> user(slot): {{ user.firstName }} </slot>
    <br />
    <slot name="other" :other="other">
      other slot(default)
    </slot>
  </div>
</template>

<script>
export default {
  props: ["user", "other"],
};
</script>

<style lang="scss" scoped></style>
