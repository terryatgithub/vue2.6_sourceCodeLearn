<template>
  <div class="container">
    <p>具名插槽</p>
    <p>注意v-slot只能添加在;lt;template;gt;`上（只有一点例外情况)</p>
    <header>
      <slot name="header"></slot>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
