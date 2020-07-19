<template>
  <div>
    <p>{{msg}}</p>
    <div>
      <input type="text" placeholder="输入新特性" @keyup.enter="addFeature" />
    </div>
    <div>
      tips:
      <br />
      <input type="text" v-model="tips" />
    </div>
    <button @click="changeTips">复位tips</button>
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
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { FeatureSelect } from "../types";

function rec(target: any, key: string, descriptor: PropertyDescriptor) {
  const fn = descriptor.value;
  console.log(target);
  
  descriptor.value = function(val: string) {
    console.log(target);
    console.log(key);
    console.log(descriptor);
    fn.call(this, val)
  };
}

@Component
export default class Hello extends Vue {
  @Prop() //Prop()参数是为Vue提供属性选项
  private msg!: string; //!是明确赋值断言，是提供给ts编译器的

  public tips = "this is some tips";
  @Watch("tips")
  onMsgChanged(val: string, oldVal: any) {
    console.log("msg changed: " + val);
  }

  changeTips() {
    this.tips = "intial tips..";
  }

  features: FeatureSelect[] = [
    { id: 1, name: "类型注解", selected: true },
    { id: 2, name: "编译型语言", selected: false }
  ];

  @rec
  @Emit()
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
    return feature;
    // this.$emit('add-feature', feature)
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