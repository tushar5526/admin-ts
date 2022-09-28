import React from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";
import ShowWrapper from "../../StyleWrappers/ShowWrapper/ShowWrapper";

const LocationShow = () => {
  return (
    <ShowWrapper>
      <TextField source="id" />
      <TextField source="district" />
      <TextField source="block" />
      <TextField source="cluster" />
    </ShowWrapper>
  );
};

export default LocationShow;
