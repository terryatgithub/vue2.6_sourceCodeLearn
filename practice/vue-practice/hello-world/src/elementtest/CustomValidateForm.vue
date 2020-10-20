<template>
  <div>
    <h3>自定义校验规则</h3>
    <p>这个例子展示了如何使用自定义验证规则来完成密码的二次验证</p>
    <p>本例还使用status-icon属性为输入框添加了表示校验结果的反馈图标</p>
    <code>this.$refs.ruleForm.validateForm('password2')</code><br />
    <code>password: [ {validator: validatePassword, trigger: 'blur'} ] </code
    ><br />
    <p>自定义校验 callback 必须被调用。 更多高级用法可以参考 async-validator</p>
    <p>表单内嵌套表单时的校验方法总结:</p>
    <p>1. 表单内直接签到form表单</p>
    <p>2. 嵌套的表单form组件不用rules和ref属性</p>
    <p>3. 嵌套的表单项form-item组件prop属性取自父form组件，rules属性可写在自己的form组件上吗？ 待会试下，涉及到数据的传递</p>
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      status-icon
    >
      <form
        v-for="(person, index) in form.persons"
        :key="person.name"
        :label="'person' + index"
      >
        <el-form-item
          label="姓名"
          :prop="'persons.' + index + '.name'"
          :rules="{
            required: true,
            message: 'pls input name',
            trigger: 'blur',
          }"
        >
          <el-input v-model="person.name"></el-input>
        </el-form-item>

        <el-form-item
          label="国籍"
          :prop="'persons.' + index + '.country'"
          :rules="{
            required: true,
            message: 'pls input country',
            trigger: 'blur',
          }"
        >
          <el-input v-model="person.country"></el-input>
        </el-form-item>

        <el-form-item
          label="Email"
          :prop="'persons.' + index + '.email'"
          :rules="[
            { required: true, message: 'pls input email', trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' },
          ]"
        >
          <el-input v-model="person.email"></el-input>
        </el-form-item>
      </form>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="password2">
        <el-input
          v-model="form.password2"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="form.age"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      rule;
      if (!value) {
        callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.password2 !== "") {
          this.$refs.ruleForm.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    // var validateEmail = (rule, value, callback) => {
    //   if (!/.{1,}@.{1,}\..{1,}/.test(value)) {
    //     return callback(new Error("email format error"));
    //   }
    // };
    return {
      form: {
        persons: [
          {
            name: "1",
            country: "cn",
            email: "111",
          },
          {
            name: "2",
            country: "us",
            email: "222",
          },
        ],
        password: "",
        password2: "",
        age: "",
      },
      rules: {
        // persons: {
        //   email: [
        //     { required: true, message: "pls input email", trigger: "blur" },
        //     { validator: validateEmail, trigger: "blur" },
        //   ],
        // },
        password: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    validateEmail(rule, value, callback) {
      if (!/.{1,}@.{1,}\..{1,}/.test(value)) {
        return callback(new Error("email format error"));
      }
    },
    submitForm(formName) {
      console.log("submit", this.form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit ok");
        } else {
          alert("error");
          return false;
        }
      });
    },
    getPropByPath(obj, path, strict) {
      let tempObj = obj;
      path = path.replace(/\[(\w+)\]/g, ".$1");
      path = path.replace(/^\./, "");

      let keyArr = path.split(".");
      let i = 0;
      for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) break;
        let key = keyArr[i];
        if (key in tempObj) {
          tempObj = tempObj[key];
        } else {
          if (strict) {
            throw new Error("please transfer a valid prop path to form item!");
          }
          break;
        }
      }
      return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj ? tempObj[keyArr[i]] : null,
      };
    },
    resetForm(formName) {
      console.log("reset", this.form);
      let { form } = this;
      let index = 0;
      let path = "persons." + index + ".name";
      let res = this.getPropByPath(form, path, true);
      console.log("res: ", res);
      formName;
      //   this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped></style>
