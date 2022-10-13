import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
} from "react-admin";
import * as _ from "lodash";

const LocationCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="district" />
        <TextInput source="block" />
        <TextInput source="cluster" />
      </SimpleForm>
    </Create>
  );
};

export default LocationCreate;
