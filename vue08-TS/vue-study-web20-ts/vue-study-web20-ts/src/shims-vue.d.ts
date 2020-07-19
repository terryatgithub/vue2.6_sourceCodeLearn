//1. 确保在声明补充的类型之前导入 vue
import Vue from 'vue'
import { AxiosInstance } from 'axios'

declare module '*.vue' {
  export default Vue
}

//2. 定制一个文件，设置你想要补充的类型 
//   在types/vue.d.ts里vue有构造函数类型
declare module 'vue/types/vue' {
  //声明为vue补充的东西
  interface Vue {
    $axios: AxiosInstance
  }
}
 
declare module 'vue/types/vue' {
  //使用VueConstructor声明全局property
  interface VueConstructor {
    $myGlobal: string
  }
}

declare module 'vue/types/options' {
  //ComponentOptions声明于 types/options.d.ts之中
  interface ComponentOptions<V extends Vue> {
    myOption?: string
  }
}
