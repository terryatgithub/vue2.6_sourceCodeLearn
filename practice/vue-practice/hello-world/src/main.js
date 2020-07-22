import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.component('button-counter', {
  data: function() {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{count}} times.</button>'
})

Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{title}}</h3>'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
