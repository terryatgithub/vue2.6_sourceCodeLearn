<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <p @click="add">count: {{count}}</p>
    <p @click="asyncAdd">count: {{count}}</p>
    <!-- <p @click="$store.state.counter.add">count: {{count}}</p>
    <p @click="$store.state.counter.asyncAdd">count: {{count}}</p> -->
    <p>{{ $store.state.counter.count }}</p>
    <HelloWorld 
      msg="Welcome to Your Vue.js + TypeScript App"
      @add-feature="addFeature"
    />
    <Hello msg="自制component hello" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Hello from "./components/Hello.vue";
import { FeatureSelect } from './types';
import CounterModule from "./store/counter";

@Component({
  components: {
    HelloWorld,
    Hello
  },
})
export default class App extends Vue {
  addFeature(feature:FeatureSelect) {
    console.log('new feature added: ' + feature.name);
  }

  get count() {
    return CounterModule.count
  }

  add() {
    CounterModule.add()
  }

  asyncAdd() {
    CounterModule.asyncAdd()
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
