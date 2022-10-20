import {
  TextInput,
  ReferenceField,
  DateInput,
  SelectInput,
} from "react-admin";
import EditWrapper from "../../components/styleWrappers/EditWrapper";
import { getLocationDetails } from "../../utils/LocationDetailsHelper";

const GradeAssessmentEdit = () => {
  const { districts, clusters, blocks } = getLocationDetails();
  return (
    <EditWrapper>
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
    </EditWrapper>
  );
};
export default GradeAssessmentEdit;
