import {
  TextInput,
  useRecordContext,
  ReferenceInput,
  useDataProvider,
  SelectInput,
  Edit,
  SimpleForm,
} from "react-admin";

const SchoolForm = () => {
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

export const SchoolEdit = () => (
  <Edit mutationMode={"pessimistic"}>
    <SimpleForm>
      <SchoolForm />
    </SimpleForm>
  </Edit>
);
export default SchoolEdit;
