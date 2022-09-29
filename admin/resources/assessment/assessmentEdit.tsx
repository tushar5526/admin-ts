import {
  TextInput,
  NumberInput,
  BooleanInput,
  Edit,
  SimpleForm,
} from "react-admin";
import { ListDataGridWithPermissions } from "../../components/lists";

const AssessmentEdit = () => {
  return (
    <Edit mutationMode={"pessimistic"}>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="type" />
        {/* <DateField source="start"/>
            <DateField source="end"/> */}
        <NumberInput source="overall_pass_percentage" />
        <NumberInput source="overall_total_marks" />
        {/* <TextField source="deadline_id"label="Deadline ID"/> */}
        <TextInput source="submission_type" />
        <TextInput label="Evaluation Params" source="evaluation_params" />
        <BooleanInput label="Is Enabled" source="is_enabled" />
      </SimpleForm>
    </Edit>
  );
};
export default AssessmentEdit;
