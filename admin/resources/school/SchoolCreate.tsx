import React from "react";
import {
  BooleanInput,
  Create,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  regex,
  required,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

const SchoolCreate = () => {
  const validateZipCode = regex(/^\d{5}$/, "Must be a valid Zip Code");

  return (
    <Create>
      <SimpleForm>
        <NumberInput source="enroll_count" />
        <BooleanInput source="is_active" />
        <NumberInput source="latitude" />
        <ReferenceInput source="location_id" reference="location">
          <TextInput source="block" />
        </ReferenceInput>
        <ReferenceInput source="location_id" reference="location">
          <TextInput source="cluster" />
        </ReferenceInput>
        <ReferenceInput source="location_id" reference="location">
          <TextInput source="districts" />
        </ReferenceInput>
        <NumberField source="longitude" />
        <TextInput source="name" />
        <TextInput type="string" source="session" />
        <TextInput source="type" />
        <NumberInput source="udise" />
      </SimpleForm>
    </Create>
  );
};

export default SchoolCreate;
