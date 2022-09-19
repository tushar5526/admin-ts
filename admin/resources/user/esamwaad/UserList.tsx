import {
  NumberField,
  TextField,
  FunctionField,
  TextInput,
  EditButton,
  ShowButton,
  SearchInput,
  Filter,
} from "react-admin";
import { ListDataGridWithPermissions } from "../../../components/lists";
import { useRecordContext } from "react-admin";

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

const UserList = () => {
  const CustomerFilter = [
    <SearchInput
      placeholder="Username"
      source="username"
      resettable
      alwaysOn
    />,
  ];
  return (
    <ListDataGridWithPermissions listProps={{ filters: CustomerFilter }}>
      <TextField source="username" />
      <FunctionField
        label="Full Name"
        render={(record: any) => `${record.firstName} ${record.lastName}`}
      />
      ;
      <NumberField source="mobilePhone" label="Mobile Phone" />
      <FunctionField
        label="Full Name"
        render={(record: any) => `${record.firstName} ${record.lastName}`}
      />
      ;
      <FunctionField
        label="Role"
        render={(record: any) => DisplayRoles(record)}
      />
      <EditButton />
      <ShowButton />
    </ListDataGridWithPermissions>
  );
};
export default UserList;
