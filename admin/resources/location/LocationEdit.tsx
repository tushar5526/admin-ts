import {
  TextInput,
  useRecordContext,
  ReferenceInput,
  useDataProvider,
  SelectInput,
} from "react-admin";
import EditWrapper from "../../components/styleWrappers/EditWrapper";

const LocationForm = () => {
  return (
    <>
      <span>Location Details</span>
      <div>
        <ReferenceInput source="id" reference="location">
          <SelectInput disabled optionText={"id"} />
        </ReferenceInput>
        <TextInput source="district" />
        <TextInput source="block" />
        <TextInput source="cluster" />
      </div>
    </>
  );
};

export const LocationEdit = () => (
  <EditWrapper>
    <LocationForm />
  </EditWrapper>
);
export default LocationEdit;
