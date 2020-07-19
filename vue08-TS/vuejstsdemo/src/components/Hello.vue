<template>
  <div>
    {{msg}}
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

function Component(options: object) {
  return function(target: Function){
    return Vue.extend(options)
  }
}

@Component({
  props: {
    msg: {
      type: String,
      default: '自制默认值'
    },
  },
  methods: {
    test() {
      let x: number;
      if (x !== 1 || x!== 2) {
        //当x与2进行比较的时候，x的值肯定是1，因为(x!== 1) 为false； 
        //x为1，那 1!==2 肯定是true
        //所以上面的比较检查是非法的
      }
    }
  },
})
export default class Hello extends Vue {}
</script>