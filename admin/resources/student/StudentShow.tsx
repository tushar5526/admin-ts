import React from "react";
import {
  BooleanField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

const StudentShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
        <ReferenceField label={"School"} source="school_id" reference="school">
          <TextField label={"SCHOOL"} source="name" />
        </ReferenceField>
        <ReferenceField label={"Udise"} source="school_id" reference="school">
          <TextField label={"UDISE"} source="udise" />
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
};

export default StudentShow;
