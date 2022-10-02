import {
  TextInput,
  ReferenceInput,
  SelectInput,
  Edit,
  SimpleForm,
} from "react-admin";
import EditWrapper from "../../StyleWrappers/EditWrapper";

export const SchoolEdit = () => (
  <EditWrapper>
    <ReferenceInput source="id" reference="location">
      <SelectInput disabled optionText={"id"} />
    </ReferenceInput>
    <TextInput source="district" />
    <TextInput source="block" />
    <TextInput source="cluster" />
  </EditWrapper>
);
export default SchoolEdit;
