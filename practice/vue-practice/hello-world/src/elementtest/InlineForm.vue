<template>
  <div>
    <h3>行内表单</h3>
    <p>当垂直方向控件受限且表单较简单时，可以在一行内放置表单</p>
    <p>设置 inline属性可以让表单域变为行内的表单域</p>
    <el-form :model="formInline" :inline="true" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.auditor" placeholder="审批人"></el-input>
      </el-form-item>

      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 行内表单
export default {
  data() {
    return {
      formInline: {
        auditor: "",
        region: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit", this.formInline);
    },
  },
};
</script>

<style lang="scss" scoped></style>
