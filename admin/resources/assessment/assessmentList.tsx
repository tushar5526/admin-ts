import {
  TextField,
  ReferenceField,
  DateField,
  BooleanField,
} from "react-admin";
import { ListDataGridWithPermissions } from "../../components/lists";

const AssessmentList = () => {
  return (
    <ListDataGridWithPermissions dataGridProps={{ rowClick: "show" }}>
      <TextField source="id" />
      <TextField source="type" />
      <ReferenceField
        source="deadline_id"
        reference="deadline"
        label="District"
      >
        <TextField label={"District"} source="district" />
      </ReferenceField>
      <ReferenceField source="deadline_id" reference="deadline" label="Date">
        <DateField label={"Date"} source="date" />
      </ReferenceField>
      <ReferenceField
        source="submission_type_v2_id"
        reference="submission_type"
        label="Aggregation"
      >
        <TextField source="aggregation" />
      </ReferenceField>
      <ReferenceField
        source="submission_type_v2_id"
        reference="submission_type"
        label="Category"
      >
        <TextField source="category" />
      </ReferenceField>
      <TextField
        label="Evaluation Params"
        source="evaluation_params"
        sortable={false}
      />
      <BooleanField label="Is Enabled" source="is_enabled" />
    </ListDataGridWithPermissions>
  );
};
export default AssessmentList;
