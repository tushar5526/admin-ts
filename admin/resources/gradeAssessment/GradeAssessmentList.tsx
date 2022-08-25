import {
  Datagrid,
  List,
  TextField,
  FunctionField,
  ReferenceField,
} from "react-admin";

const GradeAssessmentList = () => {
  return (
    <List>
      <Datagrid>
        <ReferenceField source="assessment_id" reference="assessment">
          <TextField label={"Type"} source="type" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
export default GradeAssessmentList;
