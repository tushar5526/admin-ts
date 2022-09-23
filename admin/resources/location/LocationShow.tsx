import React from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";

const LocationShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="district" />
        <TextField source="block" />
        <TextField source="cluster" />
      </SimpleShowLayout>
    </Show>
  );
};

export default LocationShow;
