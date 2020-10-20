<template>
  <div>
    <Table />
    <Form />
    <Inlineform />
    <AlignForm />
    <ValidateForm />
    <CustomValidateForm />
    <DynamicValidateForm />
  </div>
</template>

<script>
import Table from './Table'
import Form from "./Formtest.vue";
import Inlineform from "./InlineForm.vue";
import AlignForm from "./AlignForm.vue";
import ValidateForm from "./ValidateForm.vue";
import CustomValidateForm from "./CustomValidateForm.vue";
import DynamicValidateForm from "./DynamicValidateForm.vue";
export default {
  components: {
    DynamicValidateForm,
    CustomValidateForm,
    ValidateForm,
    AlignForm,
    Inlineform,
    Form,
    Table,
  },
};
</script>

<style scoped></style>
