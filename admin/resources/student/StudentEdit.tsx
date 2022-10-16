import {
  Edit,
  SimpleForm,
  TextInput,
  useRecordContext,
  useDataProvider,
  BooleanInput,
  NumberInput,
  ReferenceInput,
  regex,
  SelectInput
} from "react-admin";
import EditWrapper from "../../components/styleWrappers/EditWrapper";
import { streams_choices } from "./StudentStreams";
const StudentForm = () => {
  const validateName = regex(/^[a-zA-Z\s]*$/, 'Please Enter a Valid Name ');
  const validateFatherName= regex(/^[a-zA-Z\s]*$/, 'Please Enter a Valid Father Name ');
  const validateMotherName= regex(/^[a-zA-Z\s]*$/, 'Please Enter a Valid Mother Name ');

  const grade = () => {
    let grades = [];
    for(let i=1; i<=12; i++){
      grades[i] = { id : i , name : i};
    }
    return grades;
  }

  return (
    <>
      <span>Student Details</span>

      <TextInput source="id" disabled />
      <TextInput source="name" validate={validateName}/>
      <TextInput source="school.name" disabled/>
      <TextInput source="school.udise" />
      <TextInput source="father_name" validate={validateFatherName}/>
      <TextInput source="mother_name" validate={validateMotherName}/>
      <SelectInput source="gender" choices={[{id : "M", name : "M"},{ id: "F", name: "F"}]}/>
      <SelectInput source="grade_number" choices={grade()}/>
      <SelectInput source="stream_tag" choices={streams_choices}/>
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
