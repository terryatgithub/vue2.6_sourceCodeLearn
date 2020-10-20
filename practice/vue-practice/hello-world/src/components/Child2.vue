<template>
  <div class="child">
    {{msg}}
    <ul>
      <li v-for="(item, index) in $attrs" :key="index">$attrs {{ index }}:{{item}}</li>
    </ul>
    <button @click="$emit('pa')">触发pa</button>
    <p>foo by provide/inject: {{foo}}</p>
  </div>
</template>

<script>
export default {
  name: "Child2",
  props: {
    msg: {
      type: String,
      default: "child2"
    }
  },
//   inject: ['fooProvide'],
  inject: {
      foo: {
          from: 'fooProvide',
      }
  },
  methods: {
      
  },
  mounted() {
    this.$bus.$on("childevent", e => {
      console.log("child2, 收到child1 $bus发送的事件: " + e);
    });
    this.$parent.$on("childevent", e => {
      console.log("child2, 收到child1 $parent发送的时间" + e);
    });
    this.$root.$on("childevent", e => {
      console.log("child2, 收到child1 $root发送的时间" + e);
    });
  }
};
</script>

<style scoped>
.child {
  background: lightcyan;
}
</style>