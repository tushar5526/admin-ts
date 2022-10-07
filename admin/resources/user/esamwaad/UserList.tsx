import {
  NumberField,
  TextField,
  FunctionField,
  SearchInput,
  useGetOne,
  LinearProgress,
  ReferenceField,
} from "react-admin";
import { ListDataGridWithPermissions } from "../../../components/lists";

const ApplicationId = "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da";
const DisplayRoles = (a: any) => {
  const registration = a.registrations?.find(
    (r: any) => r.applicationId === ApplicationId
  );
  if (!registration) {
    return <span>-</span>;
  }
  const { roles } = registration;
  return roles.map((role: any, index: number) => {
    return (
      <span
        style={{
          border: "1px solid rgba(224, 224, 224, 1)",
          padding: "5px",
          marginRight: "5px",
          marginBottom: "5px",
        }}
        key={index}
      >
        {role}
      </span>
    );
  });
};
const getTeacherDataByRecord = (id: any) => {
  const TEACHER = "teacher";
  //@ts-ignore
  const { data: teacher } = useGetOne(TEACHER, { user_id: id });

  return teacher;
};
const getCorrespondingTeacherDistrict = (record: any) => {
  const teacher = getTeacherDataByRecord(record?.id);
  console.log(teacher, "teacher");

  if (!teacher) return <LinearProgress />;

  return (
    <ReferenceField source="school_id" reference="school" record={teacher}>
      <ReferenceField source="location_id" reference="location">
        <TextField source="district" />
      </ReferenceField>
    </ReferenceField>
  );
};

const getCorrespondingTeacherBlock = (record: any) => {
  const teacher = getTeacherDataByRecord(record?.id);

  if (!teacher) return <LinearProgress />;

  return (
    <ReferenceField source="school_id" reference="school" record={teacher}>
      <ReferenceField source="location_id" reference="location">
        <TextField source="block" />
      </ReferenceField>
    </ReferenceField>
  );
};

const getCorrespondingTeacherCluster = (record: any) => {
  const teacher = getTeacherDataByRecord(record?.id);

  if (!teacher) return <LinearProgress />;
  return (
    <ReferenceField source="school_id" reference="school" record={teacher}>
      <ReferenceField source="location_id" reference="location">
        <TextField source="cluster" />
      </ReferenceField>
    </ReferenceField>
  );
};
const UserList = () => {
  const CustomerFilter = [
    // eslint-disable-next-line react/jsx-key
    <SearchInput
      placeholder="Username"
      source="username"
      resettable
      alwaysOn
    />,
  ];
  return (
    <ListDataGridWithPermissions
      dataGridProps={{ rowClick: "show" }}
      listProps={{ filters: CustomerFilter }}
    >
      <TextField source="username" />
      <FunctionField
        label="Full Name"
        render={(record: any) => `${record.firstName} ${record.lastName}`}
      />
      ;
      <NumberField source="mobilePhone" label="Mobile Phone" />
      ;
      <FunctionField
        label="Role"
        render={(record: any) => {
          return DisplayRoles(record);
        }}
      />
      <FunctionField
        label="District"
        render={(record: any) => getCorrespondingTeacherDistrict(record)}
      />{" "}
      <FunctionField
        label="Block"
        render={(record: any) => getCorrespondingTeacherBlock(record)}
      />{" "}
      <FunctionField
        label="Cluster"
        render={(record: any) => getCorrespondingTeacherCluster(record)}
      />
    </ListDataGridWithPermissions>
  );
};
export default UserList;
