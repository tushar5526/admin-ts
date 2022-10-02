import {
  FunctionField,
  NumberField,
  TextField,
  SimpleShowLayout,
  Show,
} from "react-admin";
import DownLabledInput from "../../../components/utilities/DownLabledInput/DownLabledInput";
import InputFlexWrapper from "../../../StyleWrappers/InputFlexWrapper";
import ShowWrapper from "../../../StyleWrappers/ShowWrapper";
const ApplicationId = "1ae074db-32f3-4714-a150-cc8a370eafd1";
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
const UserShow = () => {
  return (
    <ShowWrapper>
      <FunctionField
        render={(record: any) => {
          return (
            <>
              <InputFlexWrapper>
                <DownLabledInput i={record?.username} label="Username" />
                <DownLabledInput i={record?.fullName} label="Full Name" />
                <DownLabledInput i={record?.mobilePhone} label="Mobile Phone" />
              </InputFlexWrapper>
            </>
          );
        }}
      />

      <FunctionField
        label="Role"
        render={(record: any) => {
          return record.roles ? DisplayRoles(record) : null;
        }}
      />
    </ShowWrapper>
    // show wrapper added
  );
};
export default UserShow;
