<template>
  <div>
    <h3>Dialog对话框</h3>
    <p>在保留当前页面状态的情况下，告知用户并承载相关操作</p>
    <h4>基本用法</h4>
    <p>Dialog弹出一个对话框，适合需要定制性更大的场景</p>
    <el-button type="text" @click="dialogVisible = true"
      >点击打开dialog</el-button
    >

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>

      <button @click="handleNestedDialog">打开一个dialog</button>
      <el-dialog title="嵌套dialog" :visible.sync="showNestedDialog" append-to-body>
        <span>嵌套dialog</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showNestedDialog = false">取消</el-button>
          <el-button type="primary" @click="showNestedDialog = false"
            >确定</el-button
          >
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <el-button @click="dialogFormVisible = true"
      >打开嵌套表单的dialog</el-button
    >

    <el-dialog
      :visible.sync="dialogFormVisible"
      title="栏目资源选择(可多选)(可反选)"
    >
      <el-form :v-model="form" label-width="100px" inline width="30%">
        <el-col :span="8">
          <el-form-item>
            <el-select
              multiple
              v-model="form.source"
              placeholder="来源 video_source"
            >
              <el-option
                v-for="option in sourceOptions"
                :label="option.label"
                :key="option.value"
                :value="option.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-select
              multiple
              v-model="form.category"
              placeholder="类型 category"
            >
              <el-option
                v-for="option in categoryOptions"
                :label="option.label"
                :key="option.value"
                :value="option.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item>
            <el-select multiple v-model="form.tag" placeholder="标签 tags">
              <el-option
                v-for="option in tagOptions"
                :label="option.label"
                :key="option.value"
                :value="option.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogFormVisible: false,
      form: {
        source: [],
        category: [],
        tag: [],
      },
      sourceOptions: [
        {
          label: "奈飞",
          value: "netflix",
        },
        {
          label: "油管",
          value: "youtube",
        },
      ],
      categoryOptions: [
        {
          label: "Movies",
          value: "movie",
        },
        {
          label: "TV",
          value: "tv",
        },
      ],
      tagOptions: [
        {
          label: "ohio",
          value: "ohio",
        },
        {
          label: "Goldstate",
          value: "goldstate",
        },
      ],
      showNestedDialog: false
    };
  },
  methods: {
    handleNestedDialog() {
      this.showNestedDialog = true
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
