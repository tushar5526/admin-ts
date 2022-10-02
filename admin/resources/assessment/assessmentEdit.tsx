import {
  TextInput,
  NumberInput,
  DateInput,
  BooleanInput,
  Edit,
  SimpleForm,
  ReferenceInput
} from "react-admin";
import EditWrapper from "../../StyleWrappers/EditWrapper";

const AssessmentEdit = () => {
  return (
    <EditWrapper>
      <TextInput source="id" disabled/>
      <TextInput source="type" />
      <ReferenceInput
        source="deadline_id"
        reference="deadline"
        label="District"
      >
        <TextInput label={"District"} source="district" />
      </ReferenceInput>
      <ReferenceInput source="deadline_id" reference="deadline" label="Date">
        <DateInput label={"Date"} source="date" />
      </ReferenceInput>
      <ReferenceInput
        source="submission_type_v2_id"
        reference="submission_type"
        label="Aggregation"
      >
        <TextInput source="aggregation" />
      </ReferenceInput>
      <ReferenceInput
        source="submission_type_v2_id"
        reference="submission_type"
        label="Category"
      >
        <TextInput source="category" />
      </ReferenceInput>
      <TextInput
        label="Evaluation Params"
        source="evaluation_params"
      />
      <BooleanInput label="Is Enabled" source="is_enabled" />
      </EditWrapper>
  );
};
export default AssessmentEdit;
