<template>
  <div id="app">
    <Nav>
      your profile
    </Nav>
    <img ref="logo" alt="Vue logo" src="./assets/logo.png">
    <alert-box>{{error}}</alert-box>
    <ul>
      <li><button @click="changeComp(1)">alert</button></li>
      <li><button @click="changeComp(2)">Parent</button></li>
      <li><button @click="changeComp(3)">button-counter</button></li>
    </ul>
    <component :is="selectedComp"></component>
    <Demo />
    <!-- <Blog /> -->
    <button @click="changeGrandpa">$ref修改grandpa标题</button>
    <Grandpa ref='gp' />
    <Parent />
    searchText: {{searchText }}<br>
    <custom-input v-model="searchText"></custom-input>
    <!-- <custom-input :search='searchText' @search="searchText=$event"></custom-input> -->
    <button-counter></button-counter>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Demo from '@/components/Demo.vue';
import Grandpa from '@/components/Grandpa.vue'
import Parent from '@/components/Parent.vue'
import CustomInput from '@/components/CustomInput.vue'
import AlertBox from '@/components/Alert.vue'
import Nav from '@/components/slot/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav,
    HelloWorld,
    Demo,
    Grandpa,
    Parent,
    CustomInput,
    AlertBox
  },
  provide() {
    return {
      fooProvide: 'foo by provide',
      barProvide: 1111
    }
  },
  data() {
    return {
      searchText: 'default search',
      error: 'some thing happend.',
      selectedComp: AlertBox
    }
  },
  methods: {
    changeComp(num) {
      console.log(num);
      let comp
      switch(num) {
        case 1: comp = AlertBox; break;
        case 2: comp = Parent; break;
        case 3: comp = CustomInput; break;
      }
      this.selectedComp = comp
    },
     changeGrandpa() {
          this.$refs.gp.msg = 'grandpa changed by $ref.gp.msg'
      }
  },
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
