import {
  NumberField,
  TextField,
  FunctionField,
  TextInput,
  EditButton,
  ShowButton,
  SearchInput,
  Filter,
  useGetOne,
  LinearProgress,
  Loading,
} from "react-admin";
import { ListDataGridWithPermissions } from "../../../components/lists";
import { useRecordContext, useListContext } from "react-admin";

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
const getLocationDataByRecord = (id: any) => {
  const TEACHER = "teacher";
  //@ts-ignore
  const { data: teacher } = useGetOne("teacher", { user_id: id });
  const { data: school } = useGetOne("school", {
    //@ts-ignore
    school_id: teacher?.school_id,
  });
  const { data: location } = useGetOne("location", {
    //@ts-ignore
    id: school?.location_id,
  });
  return location;
};
const getCorrespondingTeacherDistrict = (record: any) => {
  const location = getLocationDataByRecord(record?.id);

  if (!location) return <LinearProgress />;

  return <TextField label="District" source="district" record={location} />;
};

const getCorrespondingTeacherBlock = (record: any) => {
  const location = getLocationDataByRecord(record?.id);

  if (!location) return <LinearProgress />;

  return <TextField label="Block" source="block" record={location} />;
};

const getCorrespondingTeacherCluster = (record: any) => {
  const location = getLocationDataByRecord(record?.id);

  if (!location) return <LinearProgress />;

  return <TextField label="Cluster" source="cluster" record={location} />;
};
const UserList = () => {
  // const { data, isLoading } = useListContext();
  // console.log(data, "of users");

  const CustomerFilter = [
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
        render={(record: any) => DisplayRoles(record)}
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
