import {
  TextInput,
  ReferenceInput,
  SelectInput,
  Edit,
  SimpleForm,
} from "react-admin";

export const SchoolEdit = () => (
  <Edit mutationMode={"pessimistic"}>
    <SimpleForm>
        <div>
            <ReferenceInput source="id" reference="location">
                <SelectInput disabled optionText={"id"} />
            </ReferenceInput>
            <TextInput  source="district" />
            <TextInput source="block" />
            <TextInput source="cluster" />
        </div>
    </SimpleForm>
  </Edit>
);
export default SchoolEdit;
