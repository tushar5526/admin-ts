import {
  TextField,
  ReferenceField,
  DateField,
  BooleanField,
  FunctionField,
} from "react-admin";
import { ListDataGridWithPermissions } from "../../components/lists";
import { useRecordContext } from "react-admin";

const AssessmentList = () => {
  const record = useRecordContext();
  return (
    <ListDataGridWithPermissions dataGridProps={{ rowClick: "show" }}>
      <TextField source="id" />
      <TextField source="type" />
      <TextField label={"District"} source="deadline.district" />
      <DateField label={"Date"} source="deadline.date" />
      {/* <TextField source="submission_type.aggregation" />
      <TextField source="submission_type.category" />*/}
      <TextField
        label="Evaluation Params"
        source="evaluation_params"
      />
      <BooleanField label="Is Enabled" source="is_enabled" />
    </ListDataGridWithPermissions>
  );
};
export default AssessmentList;
