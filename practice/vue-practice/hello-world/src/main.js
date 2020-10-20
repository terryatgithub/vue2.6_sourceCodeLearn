import Vue from 'vue'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

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

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
