import React from "react";
import {
  Create,
  ReferenceField,
  ReferenceInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

const SchoolCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput label="UDISE" source="udise" />
        <ReferenceInput
          source="location_id"
          label="District"
          reference="location"
        >
          <TextInput label="District" source="district" />
        </ReferenceInput>
        <ReferenceInput source="location_id" label="Block" reference="location">
          <TextInput label="Block" source="block" />
        </ReferenceInput>{" "}
        <ReferenceInput
          source="location_id"
          label="Cluster"
          reference="location"
        >
          <TextInput label="Cluster" source="cluster" />
        </ReferenceInput>
        {/* <FunctionField
              label="Session"
              render={(record: any) => {
                const obj = config.schoolSession.find(
                  (elem: any) => elem.id === record.session
                );
                return obj?.name;
              }}
            /> */}
      </SimpleForm>
    </Create>
  );
};

export default SchoolCreate;
