import {
  Edit,
  SimpleForm,
  TextInput,
  useRecordContext,
  useDataProvider,
  BooleanInput,
  NumberInput,
  ReferenceInput,
} from "react-admin";
import EditWrapper from "../../components/styleWrappers/EditWrapper";

const StudentForm = () => {
  return (
    <>
      <span>Student Details</span>

      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="school.name" />
      <TextInput source="school.udise" />
      <TextInput source="father_name" />
      <TextInput source="mother_name" />
      <TextInput source="gender" />
      <NumberInput source="grade_number" />
      <TextInput source="stream_tag" />
      <TextInput source="category" />
      <BooleanInput source="is_cwsn" />
      <BooleanInput source="is_enabled" />
    </>
  );
};
const StudentEdit = () => (
  <EditWrapper>
    <StudentForm />
  </EditWrapper>
);
export default StudentEdit;
