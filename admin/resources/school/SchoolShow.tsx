import React from "react";
import { ReferenceField, Show, SimpleShowLayout, TextField } from "react-admin";

const SchoolShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField label="UDISE" source="udise" />
        <ReferenceField
          source="location_id"
          label="District"
          reference="location"
        >
          <TextField label="District" source="district" />
        </ReferenceField>
        <ReferenceField source="location_id" label="Block" reference="location">
          <TextField label="Block" source="block" />
        </ReferenceField>{" "}
        <ReferenceField
          source="location_id"
          label="Cluster"
          reference="location"
        >
          <TextField label="Cluster" source="cluster" />
        </ReferenceField>
        {/* <FunctionField
              label="Session"
              render={(record: any) => {
                const obj = config.schoolSession.find(
                  (elem: any) => elem.id === record.session
                );
                return obj?.name;
              }}
            /> */}
      </SimpleShowLayout>
    </Show>
  );
};

export default SchoolShow;
