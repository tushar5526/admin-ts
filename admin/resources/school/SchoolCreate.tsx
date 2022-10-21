import React from "react";
import {
  BooleanInput,
  Create,
  NumberField,
  NumberInput,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { getLocationDetails } from "../../utils/LocationDetailsHelper";

const SchoolCreate = () => {
  // Input Constraints
  const inputConstraints = {
    // userName: [required("Please provide username"), number("The username must be numeric")],
    // udise: [required("Please provide UDISE"), number("The UDISE must be numeric"), udiseSchoolCheck],
    fullName: [required("Please provide fullname"), regex(/^[a-zA-Z0-9 ]*$/, "Name can only contain alphabets, numbers and spaces")],
    // mobile: [required("Please provide mobile number"), number("Mobile must be numeric"), minLength(10), maxLength(10)],
    session: required("Please select session"),
    district: required("Please select a district"),
    block: required("Please select a block"),
    cluster: required("Please select a cluster"),
    type: required("Please select type"),
    coord: [required("Please enter a valid co-ordinate"), regex(/^[1-9]\d*(\.\d+)?$/, "Please enter a valid co-ordinate")]
  }

  const { districts, blocks, clusters } = getLocationDetails();

  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={inputConstraints.fullName} />
        <NumberInput source="udise" validate={required("Please enter a valid UDISE")} />
        <SelectInput source="location.districts" label="District" choices={districts} validate={inputConstraints.district} />
        <SelectInput source="location.block" label="Block" choices={blocks} validate={inputConstraints.district} />
        <SelectInput source="location.cluster" label="Cluster" choices={clusters} validate={inputConstraints.district} />
        <SelectInput source="session" label="Session" choices={["S", "W"].map(el => { return { id: el, name: el } })} validate={inputConstraints.session} />
        <SelectInput source="type" label="Type" choices={["GPS", "GMS", "GHS", "GSSS"].map(el => { return { id: el, name: el } })} validate={inputConstraints.type} />
        <BooleanInput source="is_active" />
        <TextInput source="latitude" validate={inputConstraints.coord} />
        <TextInput source="longitude" validate={inputConstraints.coord} />
        <NumberInput source="enroll_count" validate={required("Please enter a valid enroll count")} />
      </SimpleForm>
    </Create>
  );
};

export default SchoolCreate;
