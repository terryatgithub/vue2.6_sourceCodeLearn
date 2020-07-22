<template>
  <div class="parent">
    <h1>{{ msg }}</h1>
    <div :style="{fontSize: childFontSize + 'em' }">
      <Child @enlarge-text="onEnlargeText" />
    </div>
  </div>
</template>

<script>
import Child from "./Child";

export default {
  components: {
    Child
  },
  data() {
    return {
      msg: "Parent",
      childFontSize: 1
    };
  },
  methods: {
      onEnlargeText(e) {
          this.childFontSize += e
      }
  },
};
</script>

<style  scoped>
.parent {
  border: 1px solid red;
}
</style>