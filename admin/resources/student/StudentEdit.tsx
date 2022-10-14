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
  const validateName = regex(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g, 'Please Enter a Valid Name ');
  const validateFatherName= regex(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g, 'Please Enter a Valid Name ');
  const validateMotherName= regex(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g, 'Please Enter a Valid Name ');

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
      <TextInput source="name" />
      <TextInput source="school.name" disabled/>
      <TextInput source="school.udise" />
      <TextInput source="father_name" />
      <TextInput source="mother_name" />
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
