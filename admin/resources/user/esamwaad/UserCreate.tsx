import { useEffect, useState } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SaveButton,
} from "react-admin";
import { useLogin } from "../hooks";
import { getLowerDesignationsChoices } from "../designation";
import { client } from "../../../api-clients/users-client";
import { useSearchSchoolByUDISE } from "../useSearchSchoolByUdise";
// const ApplicationId = "1ae074db-32f3-4714-a150-cc8a370eafd1";

const UserCreate = (props: any) => {
  const { user: _loggedInUser } = useLogin();
  const [userCreated, setUserCreated] = useState(false);
  const { school, refresh: fetchSchool } = useSearchSchoolByUDISE();
  const [state, setState] = useState({
    userName: "",
    fullName: "",
    mobile: "",
    roles: ["school"],
    udise: school?.udise,
    school: school?.id,
    designation: "",
  });

  useEffect(() => {
    fetchSchool(state.udise);
  }, [state.udise]);

  // to be called when submitted
  const createUser = () => {
    // to be completed
    const endPoint = "/admin/createUser";
    const body = {
      registration: {
        applicationId: "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da",
        roles: state.roles,
        username: state.userName,
      },
      user: {
        data: {
          accountName: state.fullName,
          phone: state.mobile,
          school: state.school,
          udise: state.udise,
        },
        firstName: state.fullName,
        mobilePhone: state.mobile,
        password: "himachal12345",
        username: state.userName,
      },
    };
    const res = client.post(endPoint, body);
    res.then((data) => {
      if (data?.data?.responseCode === "OK") {
        setUserCreated(true);
      }
    });
  };

  const designationChoices = getLowerDesignationsChoices(_loggedInUser);
  const roleChoices = [
    { id: "Teacher", name: "Teacher" },
    { id: "Principal", name: "Principal" },
    { id: "school", name: "school" },
  ];

  return userCreated ? (
    <>
      <p>User Created Successfully</p>
    </>
  ) : (
    <Create {...props}>
      <SimpleForm onSubmit={createUser}>
        <TextInput
          onChange={(e) => setState({ ...state, userName: e.target.value })}
          source="userName"
          label="User Name"
        />
        <TextInput
          onChange={(e) => setState({ ...state, fullName: e.target.value })}
          source="fullName"
          label="Name"
        />
        <NumberInput
          onChange={(e) => setState({ ...state, mobile: e.target.value })}
          source="mobilePhone"
          label="Mobile Phone"
        />
        <SelectInput
          onChange={(e) => setState({ ...state, roles: e.target.value })}
          source="roles"
          value={state.roles}
          disabled
          choices={roleChoices}
          label="Roles"
        />
        <SelectInput
          value={state.designation}
          onChange={(e: any) =>
            setState({ ...state, designation: e.target.value })
          }
          source="designation"
          label="Designation"
          choices={designationChoices}
        />
        <ReferenceInput source="school_id" reference="school">
          <>
            {school ? (
              <span>School : {school?.name}</span>
            ) : (
              <span>No School</span>
            )}

            <TextInput
              onChange={(e) => setState({ ...state, udise: e.target.value })}
              source="udise"
              label="School UDISE"
            />
          </>
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
export default UserCreate;
