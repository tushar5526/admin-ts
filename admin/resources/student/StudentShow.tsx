import {
  TextField,
  BooleanField,
  NumberField,
  ReferenceField,
  SimpleShowLayout,
  Show,
} from "react-admin";


const StudentShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField label={"SCHOOL"} source="school_id" reference="school">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label={"UDISE"} source="school_id" reference="school">
        <TextField source="udise" />
      </ReferenceField>
      <TextField source="father_name" />
      <TextField source="mother_name" />
      <TextField source="gender" />
      <NumberField source="grade_number" />
      <TextField source="stream_tag" />
      <TextField source="category" />
      <BooleanField source="is_cwsn" />
      <BooleanField source="is_enabled" />
    </SimpleShowLayout>
  </Show>
);
export default StudentShow;
