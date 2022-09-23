import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const LocationCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="district" />
        <TextInput source="block" />
        <TextInput source="cluster" />
      </SimpleForm>
    </Create>
  );
};

export default LocationCreate;
