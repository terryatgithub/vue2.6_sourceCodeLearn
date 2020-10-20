<template>
  <div>
      <h3>对齐方式</h3>
      <p>根据具体目标和制约因素，选择最佳的标签对齐方式</p>
      <p>通过设置 label-position属性可以改变表单域标签的位置，可选值为top left right，当设为top时标签会置于表单域的顶部</p>
    <el-radio-group v-model="labelPosition" size="small">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <div style="margin:20px;"></div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.style"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        style: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
