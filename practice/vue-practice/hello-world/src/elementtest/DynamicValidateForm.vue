<template>
  <div>
    <h3>动态增减表单项</h3>
    <p>
      除了在form组件上一次性传递所有的验证规则外，还可以在单个的表单域上传递属性的验证规则
    </p>
    <p>
      Q: 动态增加的表单项 怎么验证？
      新增按钮改为新增邮箱，可以验证吗？prop怎么写
    </p>
    <p>A: 只要表单项上有prop属性和rules属性就可验证</p>

    <h3>数字类型验证</h3>
    <p>
      数字类型的验证需要在v-model处加上.number的修饰符，这是Vue自身提供的用于将绑定值转换为number类型的修饰符
    </p>

    <h3>表单内组件尺寸控制</h3>
    <p>
      通过设置Form上的size属性可以使该表单内所有可调节大小的组件继承该尺寸。
    </p>
    <p>Form-item也有该属性</p>
    <p>
      <b
        >嵌套在el-form-item中的el-form-item标签宽度默认为0，不会继承el-form的label-width，如果需要可以为其单独设置label-width属性</b
      >
    </p>
    <el-form
      :model="form"
      ref="dynamicValidateForm"
      label-width="100px"
      status-icon
      class="demo-dynamic"
      size="mini"
    >
      <!-- @validate="onValidateAge" -->
      <el-form-item label="邮箱" prop="email" :rules="emailRule">
          <template v-slot:label="{error}">
              err: {{ error }}
          </template>
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(domain, index) in form.domains"
        :key="domain.key"
        :label="'域名' + index"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true,
          message: '域名不能为空',
          trigger: 'blur',
        }"
      >
        <el-input v-model="domain.value"></el-input>
        <el-button @click.prevent="delDomain(domain)">删除</el-button>
      </el-form-item>

      <el-form-item
        label="年龄"
        prop="age"
        :rules="[
          { required: true, message: '请输入年龄', trigger: 'blur' },
          {
            type: 'number',
            message: '年龄必须为数字',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model.number="form.age"></el-input>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')"
          >提交</el-button
        >
        <el-button @click="addDomain">新增域名</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        <el-button @click="clearValidate('dynamicValidateForm')"
          >clearValidate</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailRule: [
        { required: true, message: "请输入邮箱名", trigger: "blur" },
        {
          type: "email",
          message: "请输入正确格式的邮箱",
          trigger: ["blur", "change"],
        },
      ],
      form: {
        domains: [{ value: "", key: Date.now() }],
        email: "",
        age: "",
      },
    };
  },
  methods: {
    addDomain() {
      this.form.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    delDomain(domain) {
      let idx = this.form.domains.indexOf(domain);
      if (idx !== -1) {
        this.form.domains.splice(idx, 1);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit ok");
        } else {
          alert("error");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
      alert("clearValidate done.");
    },
    onValidateAge(...rest) {
      alert(rest);
    },
  },
};
</script>

<style lang="scss" scoped></style>
