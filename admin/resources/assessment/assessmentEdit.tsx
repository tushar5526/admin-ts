import {
  TextInput,
  NumberInput,
  DateInput,
  BooleanInput,
  Edit,
  SimpleForm,
  ReferenceField,
} from "react-admin";
import EditWrapper from "../../components/styleWrappers/EditWrapper";

const AssessmentEdit = () => {
  return (
    <EditWrapper>
      <TextInput source="id" disabled />
      <TextInput source="type" />
      <ReferenceField
        source="deadline_id"
        reference="deadline"
        label="District"
      >
        <TextInput label={"District"} source="district" />
      </ReferenceField>
      <ReferenceField source="deadline_id" reference="deadline" label="Date">
        <DateInput label={"Date"} source="date" />
      </ReferenceField>
      <ReferenceField
        source="submission_type_v2_id"
        reference="submission_type"
        label="Aggregation"
      >
        <TextInput source="aggregation" />
      </ReferenceField>
      <ReferenceField
        source="submission_type_v2_id"
        reference="submission_type"
        label="Category"
      >
        <TextInput source="category" />
      </ReferenceField>
      <TextInput label="Evaluation Params" source="evaluation_params" />
      <BooleanInput label="Is Enabled" source="is_enabled" />
    </EditWrapper>
  );
};
export default AssessmentEdit;
