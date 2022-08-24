import {
  TextInput,
  useRecordContext,
  ReferenceInput,
  useDataProvider,
  SelectInput,
  Edit,
  SimpleForm,
} from "react-admin";

const LocationForm = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  console.log(dataProvider);
  return (
    <>
      <span>Location Details</span>
      <div>
        <ReferenceInput source="id" reference="location">
          <SelectInput disabled optionText={"id"} />
        </ReferenceInput>
        <TextInput locales="en-IN" source="district" />
        <TextInput source="block" />
        <TextInput source="cluster" />
      </div>
    </>
  );
};

export const LocationEdit = () => (
  <Edit mutationMode={"pessimistic"}>
    <SimpleForm>
      <LocationForm />
    </SimpleForm>
  </Edit>
);
export default LocationEdit;
