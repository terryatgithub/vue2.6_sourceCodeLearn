import { Store } from 'vuex'

declare const store: Store<{
  count: number
}>

export default store

//以下也可行：但是不像上面还有约束
// import { Store } from "vuex";

// declare const store: Store<{}>;

// export default store