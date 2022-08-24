import { Pagination } from "react-admin";
import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

const StudentList = () => {
  const PostPagination = () => (
    <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
  );
  return (
    <List pagination={<PostPagination />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <ReferenceField source="school_id" reference="school">
          <TextField label={"SCHOOL"} source="name" />
        </ReferenceField>
        <ReferenceField source="school_id" reference="school">
          <TextField label={"UDISE"} source="udise" />
        </ReferenceField>
        <TextField source="father_name" />
        <TextField source="mother_name" />
        <TextField source="gender" />
        <NumberField source="grade_number" />
        <TextField source="stream_tag" />
        <TextField source="category" />
        <BooleanField source="is_cwsn" />
        <BooleanField source="is_enabled" />
      </Datagrid>
    </List>
  );
};
export default StudentList;
