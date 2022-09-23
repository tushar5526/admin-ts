import { TextField, ReferenceField, DateField, BooleanField, NumberField, EditButton, Show, SimpleShowLayout } from "react-admin";
import { ListDataGridWithPermissions } from "../../components/lists";

const AssessmentList = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="type" />
                {/* <DateField source="start"/>
            <DateField source="end"/> */}
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
            </SimpleShowLayout>
        </Show>
    );
};
export default AssessmentList;
