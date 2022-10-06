import {
  TextInput,
  ReferenceField,
  DateInput,
} from "react-admin";
import EditWrapper from "../../components/styleWrappers/EditWrapper";

const GradeAssessmentEdit = () => {
  return (
    <EditWrapper>
      <TextInput source="id" />
      <TextInput label={"Assessment"} source="assessment_id" />
      <TextInput source="grade_number" />
      <TextInput source="section" />
      <TextInput source="school_id" />
      <ReferenceField label="Udise" source="school_id" reference="school"> 
        <TextInput source="udise" />
      </ReferenceField>
      <ReferenceField label="District" source="school_id" reference="school">
        <ReferenceField source="location_id" reference="location">
          <TextInput source="district" />
        </ReferenceField>
      </ReferenceField>
      <ReferenceField label="Block" source="school_id" reference="school">
        <ReferenceField source="location_id" reference="location">
          <TextInput source="block" />
        </ReferenceField>
      </ReferenceField>
      <ReferenceField label="Cluster" source="school_id" reference="school">
        <ReferenceField source="location_id" reference="location">
          <TextInput source="cluster" />
        </ReferenceField>
      </ReferenceField>
      <TextInput source="streams_id" />
      <DateInput source="created" />
      <DateInput source="updated" />
    </EditWrapper>
  );
};
export default GradeAssessmentEdit;
