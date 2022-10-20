import { useEffect, useState } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SaveButton,
  required,
  number,
  maxLength,
  minLength,
  regex
} from "react-admin";
import { useLogin } from "../hooks";
import { getLowerDesignationsChoices } from "../designation";
import { client } from "../../../api-clients/users-client";
import { designationESamwaad } from "./designation";
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
    accountStatus: "",
    modeOfEmployment: ""
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

  // Input dropdown choices
  const inputChoices = {
    designations: designationESamwaad.map(el => { return { id: el.designation, name: el.designation } }),
    accountStatuses: ["ACTIVE", "DEACTIVATED", "PENDING", "REJECTED"].map(el => { return { id: el, name: el } }),
    roles: ["Teacher", "Principal", "school"].map(el => { return { id: el, name: el } }),
    employment: ["Permanent", "Contractual"].map(el => { return { id: el, name: el } })
  }


  const udiseSchoolCheck = (value: any) => {
    if (value == school?.udise && state.roles.includes("school")) {
      return 'Cannot register more than one school for this UDISE';
    }
    return undefined;
  };

  // Input Constraints
  const inputConstraints = {
    userName: [required("Please provide username"), number("The username must be numeric")],
    udise: [required("Please provide UDISE"), number("The UDISE must be numeric"), udiseSchoolCheck],
    fullName: [required("Please provide fullname"), regex(/^[a-zA-Z0-9 ]*$/, "Name can only contain alphabets, numbers and spaces")],
    mobile: [required("Please provide mobile number"), number("Mobile must be numeric"), minLength(10), maxLength(10)],
    role: required("Please select a role"),
    designation: required("Please select a designation"),
    accountStatus: required("Please select account status"),
    modeOfEmployment: required("Please select mode of employment")
  }


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
          validate={inputConstraints.userName}
        />
        <TextInput
          onChange={(e) => setState({ ...state, fullName: e.target.value })}
          source="fullName"
          label="Name"
          validate={inputConstraints.fullName}
        />
        <NumberInput
          onChange={(e) => setState({ ...state, mobile: e.target.value })}
          source="mobilePhone"
          label="Mobile Phone"
          validate={inputConstraints.mobile}
        />
        <SelectInput
          onChange={(e) => setState({ ...state, roles: e.target.value })}
          source="roles"
          value={state.roles}
          choices={inputChoices.roles}
          label="Roles"
          validate={inputConstraints.role}
        />
        {state.roles && (state.roles.includes("Principal") || state.roles.includes("Teacher")) &&
          <>
            <SelectInput
              value={state.designation}
              onChange={(e: any) =>
                setState({ ...state, designation: e.target.value })
              }
              source="designation"
              label="Designation"
              choices={inputChoices.designations}
              validate={inputConstraints.designation}
            />
            <SelectInput
              value={state.accountStatus}
              onChange={(e: any) =>
                setState({ ...state, accountStatus: e.target.value })
              }
              source="account_status"
              label="Account Status"
              choices={inputChoices.accountStatuses}
              validate={inputConstraints.accountStatus}
            />
            <SelectInput
              value={state.modeOfEmployment}
              onChange={(e: any) =>
                setState({ ...state, modeOfEmployment: e.target.value })
              }
              source="mode_of_employment"
              label="Mode of employment"
              validate={inputConstraints.modeOfEmployment}
              choices={inputChoices.employment}
            />
          </>}
        <ReferenceInput source="school_id" reference="school">
          <>
            {/* {school ? (
              <span>School : {school?.name}</span>
            ) : (
              <span>No School</span>
            )} */}

            <TextInput
              onChange={(e) => setState({ ...state, udise: e.target.value })}
              source="udise"
              label="School UDISE"
              validate={inputConstraints.udise}
            />
          </>
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
export default UserCreate;
