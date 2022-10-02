import {
    TextInput,
    ReferenceInput,
    DateInput,
    FunctionInput,
  } from "react-admin";
import EditWrapper from "../../StyleWrappers/EditWrapper";
  
  const GradeAssessmentEdit = () => {
    return (
      <EditWrapper>
        <TextInput source="id" />
        <TextInput label={"Assessment"} source="assessment_id" />
        <TextInput source="grade_number" />
        <TextInput source="section" />
        <TextInput source="school_id" />
        <ReferenceInput label="Udise" source="school_id" reference="school">
          <TextInput source="udise" />
        </ReferenceInput>
        <ReferenceInput label="District" source="location" reference="school">
          <TextInput source="district" />
        </ReferenceInput>
        <ReferenceInput label="Block" source="district" reference="location">
          <TextInput source="block" />
        </ReferenceInput>
        <TextInput source="streams_id" />
        <DateInput source="created" />
        <DateInput source="updated" />
      </EditWrapper>
    );
  };
  export default GradeAssessmentEdit;
  