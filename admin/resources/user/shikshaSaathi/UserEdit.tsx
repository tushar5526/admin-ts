import {
  Edit,
  Labeled,
  FunctionField,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
  useDataProvider,
} from "react-admin";
import { designationLevels } from "../esamwaad/designation";
const ApplicationId = "1ae074db-32f3-4714-a150-cc8a370eafd1";

const displayRoles = (a: any) => {
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
const UserForm = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();

  return (
    <>
      <span>User Details</span>

      <TextInput source="username" disabled={true} />
      <TextInput source="fullName" label="Full Name" />
      <TextInput source="mobilePhone" label="Mobile Phone" />
      <Labeled label="Roles">
        <FunctionField
          label="Role"
          render={(record: any) => displayRoles(record)}
        />
      </Labeled>
      <SelectInput source="designation" choices={designationLevels} />
    </>
  );
};
const UserEdit = () => (
  <Edit>
    <SimpleForm
      onSubmit={(values) => {
        // We will get Form Values on submission
        console.log(values);
      }}
    >
      <UserForm />
    </SimpleForm>
  </Edit>
);
export default UserEdit;
