<template>
  <div class="parent">
    <h1>{{ msg }}</h1>
    <button @click="changeChildData">通过$children修改子组件数据</button>
    <div :style="{fontSize: childFontSize + 'em' }">
      <Child
        @enlarge-text="onEnlargeText"
        xxxx="testxxxx"
        yyyy="testyyyy"
        zzzz="1"
        v-bind="$attrs"
      />
      <Child2 v-bind="$attrs" v-on="$listeners" />
      <button @click="$emit('pa')">触发pa</button>
    </div>
  </div>
</template>

<script>
import Child from "./Child";
import Child2 from "./Child2";

export default {
  components: {
    Child,
    Child2
  },
  data() {
    return {
      msg: "Parent",
      childFontSize: 1
    };
  },
  methods: {
    onEnlargeText(e) {
      this.childFontSize += e;
    },
    changeChildData() {
      this.$children[0].msg = new Date();
    }
  }
};
</script>

<style  scoped>
.parent {
  border: 1px solid red;
}
</style>