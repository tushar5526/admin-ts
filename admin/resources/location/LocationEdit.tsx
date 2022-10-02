import {
  TextInput,
  useRecordContext,
  ReferenceInput,
  useDataProvider,
  SelectInput,
  Edit,
  SimpleForm,
} from "react-admin";
import EditWrapper from "../../StyleWrappers/EditWrapper";

const LocationForm = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
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
