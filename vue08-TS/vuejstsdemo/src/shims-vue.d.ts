import Vue from "vue";
import { AxiosInstance } from "axios";

declare module '*.vue' {
  // import Vue from 'vue'
  export default Vue
}

//利用模块补充$axios属性到Vue实例，从而在组件里直接使用
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
}