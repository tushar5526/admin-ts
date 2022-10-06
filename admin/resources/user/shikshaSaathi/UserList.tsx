import {
  FunctionField,
  Datagrid,
  List,
  NumberField,
  TextField,
  TextInput,
  LinearProgress,
  useGetOne,
} from "react-admin";
import { ListDataGridWithPermissions } from "../../../components/lists";
import { useQuery } from "react-query";
import { useDataProvider } from "react-admin";
const ApplicationId = "1ae074db-32f3-4714-a150-cc8a370eafd1";
const DisplayRoles = (a: any) => {
  const registration = a.registrations?.find(
    (r: any) => r.applicationId === ApplicationId
  );
  if (!registration) {
    return <span>-</span>;
  }
  console.log(registration, "registation");
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
  const Filters = [
    <TextInput label="Username" source="username" alwaysOn key={"search"} />,
  ];
  // const dataProvider = useDataProvider();
  // const { data } = useQuery(["shiksha_saathi_user", "getList", {}], () =>
  //   dataProvider.getList("shiksha_saathi_user", {
  //     pagination: { perPage: 10000, page: 1 },
  //     sort: { field: "id", order: "asc" },
  //     filter: {},
  //   })
  // );
  // console.log(data, "user");
  return (
    <ListDataGridWithPermissions
      listProps={{ filters: Filters }}
      dataGridProps={{ rowClick: "show" }}
    >
      <TextField source="username" />
      <TextField source="fullName" />
      <NumberField source="mobilePhone" label="Mobile Phone" />
      <FunctionField
        label="Role"
        render={(record: any) => {
          return DisplayRoles(record);
        }}
      />
      {/* <FunctionField
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
      /> */}
    </ListDataGridWithPermissions>
  );
};
export default UserList;
