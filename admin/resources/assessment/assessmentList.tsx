import { TextField, ReferenceField, DateField, BooleanField, NumberField, EditButton, TextInput, SelectInput } from "react-admin";
import { ListDataGridWithPermissions } from "../../components/lists";

const AssessmentList = () => {
    const Filters = [
        <TextInput label="Deadline ID" source="deadline_id" alwaysOn key={"search"} />,
    ];
    return (
        <ListDataGridWithPermissions dataGridProps={{ rowClick: "show", bulkActionButtons: false }} listProps={{ filters: Filters }}>
            <TextField source="id" />
            <TextField source="type" />
            {/* <DateField source="start"/>
            <DateField source="end"/> */}
            <TextField source="deadline_id"/>
            <NumberField source="overall_pass_percentage" />
            <NumberField source="overall_total_marks" />
            {/* <TextField source="deadline_id"label="Deadline ID"/> */}
            <TextField source="submission_type" />
            <TextField
                label="Evaluation Params"
                source="evaluation_params"
                sortable={false}
            />
            <BooleanField label="Is Enabled" source="is_enabled" />
            <EditButton />
        </ListDataGridWithPermissions>
    );
};
export default AssessmentList;
