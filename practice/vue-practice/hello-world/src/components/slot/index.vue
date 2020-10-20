<template>
  <div class="slot">
    <p>
      父级模板里的所有内容都是在父级作用域中编译的；
    </p>
    <p>
      子模板里的所有内容都是在子作用域中编译的
    </p>
    <Nav url="/profile">
      <span class="slot-span">插槽span元素</span>
      <br />
      your profile Logged in as {{ user.firstName }}
      <br />
      clicking here will send you to {{ url }}
    </Nav>

    <SubmitButton></SubmitButton>
    <SubmitButton>Save</SubmitButton>
    <base-layout>
      <template v-slot:header>
        <h1>Here is a title</h1>
      </template>
      <template v-slot:default>
        <p>a paragraph for the main</p>
        <p>another paragraph for the main</p>
      </template>
      <template v-slot:footer>
        <p>footer: some contact info</p>
      </template>
    </base-layout>
    <current-user :user="user"></current-user>
    <current-user :user="user">
      <template v-slot:default="slotProps">
        <p>
          换掉备用内容：
          在父级作用域中，可以使用带值的v-slot来定义我们提供的插槽prop的名字：
          在这个例子中，我们选择将包含所有插槽prop的对象命名为 slotProps
        </p>
        user(scoped slot): {{ slotProps.user.lastName }}
      </template>
    </current-user>
    <current-user :user="user" v-slot:default="slotProps">
        <h4>独占默认插槽的缩写语法</h4>
        <p>
            当被提供的内容只有默认插槽时，组件的标签才可以被当做插槽的模板来使用，这样可以把v-slot直接用在组件上
        </p>
        {{ slotProps.user }}
    </current-user>
    <current-user :user="user" v-slot="slotProps">
        <h4>这种写法还可以更简单，就像嘉定未指明的内容对应默认插槽一样，不带参数的s-slot对应默认插槽</h4>
        {{ slotProps.user }}
    </current-user>
    <current-user :user="user" :other="other">
        <template v-slot:default="slotProps">
            user(scoped slot): {{ slotProps.user }}
        </template>
        <template v-slot:other="otherSlotProps">
            other(scoped slot): {{ otherSlotProps.other }}
        </template>
    </current-user>
    <current-user :user="user" :other="other" v-slot="{user: person, other, undef = {firstName: 'undef'}}">
        <p>解构插槽prop</p>
        <p>作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里</p>
        <p>这意味着v-slot的值实际上可以是任何能够作为函数定义中的参数的js表达式。</p>
        <p>可以使用解构来传入具体的插槽prop，这样可以使模板更简洁，尤其是在该插槽提供了多个prop的时候</p>
        <p>它同样开启了prop重命名等其它可能</p>
        <p>甚至可以定义后备内容，用哦关于插槽prop是undefined的情形</p>
        <p>user: {{person}}</p>
        <p>other:{{other}}</p>
        <p>undef: {{undef}}</p>
    </current-user>

    <todo-list :todos="todos">
        <template #default="{todo}">
            scoped slot: <span v-if="todo.completed">√</span>
            {{todo.title}}
        </template>
    </todo-list>
    
  </div>
</template>

<script>
import Nav from "./Nav.vue";
import SubmitButton from "./SubmitButton";
import BaseLayout from "./BaseLayout";
import CurrentUser from "./CurrentUser";
import TodoList from './TodoList'

export default {
  components: {
    Nav,
    SubmitButton,
    BaseLayout,
    CurrentUser,
    TodoList
  },
  data() {
    return {
        todos: [
            {id: 1, title: 'study slot', completed: true },
            {id: 2, title: 'do exercise', completed: true },
            {id: 3, title: 'do summary', completed: false },
        ],
      user: {
        firstName: "terry",
        lastName: "yuan",
      },
      other: {
          name: 'youyuxi',
          age: 30
      }
    };
  },
};
</script>

<style scoped>
.slot {
  background: lightcyan;
}
.slot-span {
  color: blue;
}
</style>
