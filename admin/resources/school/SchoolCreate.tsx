import React from "react";
import {
  BooleanInput,
  Create,
  NumberField,
  NumberInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const SchoolCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <NumberInput source="enroll_count" />
        <BooleanInput source="is_active" />
        <NumberInput source="latitude" />
        {/* <TextInput source="location.block" />
        <TextInput source="location.cluster" />
        <TextInput source="location.districts" /> */}
        <NumberInput source="longitude" />
        <TextInput source="name" />
        <TextInput source="session" />
        <TextInput source="type" />
        <NumberInput source="udise" />
      </SimpleForm>
    </Create>
  );
};

export default SchoolCreate;
