import {
  FunctionField,
  Show,
} from "react-admin";
import CustomTextField from "../../../components/styleWrappers/CustomTextField";
// import DownLabledInput from "../../../components/styleWrappers/DownLabledInput";
import InputFlexWrapper from "../../../components/styleWrappers/InputFlexWrapper";
// import ShowWrapper from "../../../components/styleWrappers/ShowWrapper";
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
    <Show>
      <FunctionField
        render={(record: any) => {
          return (
            <>
              <InputFlexWrapper flex>
                <CustomTextField i={record?.username} label="Username" />
                <CustomTextField i={record?.fullName} label="Full Name" />
                <CustomTextField i={record?.mobilePhone} label="Mobile Phone" />
              </InputFlexWrapper>
            </>
          );
        }}
      />

      <FunctionField
        label="Role"
        render={(record: any) => {
          return DisplayRoles(record);
        }}
      />
    </Show>
    // show wrapper added
  );
};
export default UserShow;
