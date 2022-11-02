import {
  TextInput,
  ReferenceField,
  DateInput,
  SelectInput,
  Edit,
  SimpleForm,
} from "react-admin";
import { getLocationDetails } from "../../utils/LocationDetailsHelper";

const GradeAssessmentEdit = () => {
  const { districts, clusters, blocks } = getLocationDetails();
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput label={"Assessment"} source="assessment_id" />
        <TextInput source="grade_number" />
        <TextInput source="section" />
        <TextInput source="school_id" />
        <TextInput source="school.udise" />
        <SelectInput source="school.location.district" label="District" choices={districts} />
        <SelectInput source="school.location.block" label="Block" choices={clusters} />
        <SelectInput source="school.location.cluster" label="Cluster" choices={blocks} />
        <TextInput source="streams_id" />
        <DateInput source="created" />
        <DateInput source="updated" />
      </SimpleForm>
    </Edit>
  );
};
export default GradeAssessmentEdit;
