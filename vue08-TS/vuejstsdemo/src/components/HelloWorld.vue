<template>
  <div>
    <input type="text" @keyup.enter="submitPhone" placeholder="请输入9位手机号码" /><br/>
    <input type="text" @keyup.enter="submitName" placeholder="请输入英文姓名" />
    <p>{{msg}}</p>
    <div>
      <input type="text" placeholder="输入新特性" @keyup.enter="addFeature" />
    </div>
    <ul>
      <li
        v-for="feature in features"
        :key="feature.id"
        :class="{selected: feature.selected}"
      >{{ feature.name }}</li>
    </ul>
    <p>total: {{count}}</p>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { FeatureSelect } from "../types";

function validatePhone(value: string) { //手机号校验
  const re = /\d{9}/
  return re.test(value)
}
function validateName(value: string) { //姓名校验
  const re = /^\w+/i
  return re.test(value)
}
//暗号： you can you up
//方法装饰器，校验用户输入格式是否正确
function validate(cb:(val:string)=>boolean) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value; //保存原方法
    descriptor.value = function(e: KeyboardEvent) {
      const inp = e.target as HTMLInputElement;
      console.log('validate: ' + inp.value);
      const ret = cb(inp.value)
      if(ret) {
        window.alert('输入ok')
        fn.call(this, e);
      } else {
        window.alert('请输入正确格式')
      }
    };
  };
}
@Component
export default class Hello extends Vue {
  @validate(validatePhone)
  submitPhone(e: KeyboardEvent) {
    const inp = e.target as HTMLInputElement;
    console.log('submit phone: ' + inp.value);
  }
  @validate(validateName)
  submitName(e: KeyboardEvent) {
    const inp = e.target as HTMLInputElement;
    console.log('submit name: ' + inp.value);
  }
  @Prop() private msg!: string;
  features: FeatureSelect[] = [
    { id: 1, name: "类型注解", selected: true },
    { id: 2, name: "编译型语言", selected: false }
  ];

  addFeature(e: KeyboardEvent) {
    //e.target 是EventTarget类型，需要断言为HTMLInputElement
    const inp = e.target as HTMLInputElement;
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: inp.value,
      selected: false
    };
    this.features.push(feature);
    inp.value = "";
  }

  //利用getter设置计算属性
  get count() {
    return this.features.length;
  }

  created() {
    this.features = [{ id: 1, name: "类型注解", selected: false }];
  }

  async mounted() {
    console.log("hello world component");
    const resp = await this.$axios.get<FeatureSelect[]>("/api/list");
    this.features = resp.data;
  }
}
</script>

<style scoped>
.selected {
  background: #4765a5;
}
</style>