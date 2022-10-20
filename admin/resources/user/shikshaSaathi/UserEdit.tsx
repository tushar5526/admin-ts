import { useState } from "react";
import {
  Edit,
  Labeled,
  FunctionField,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
  useDataProvider,
  regex,
  maxLength,
  minLength,
} from "react-admin";
import {
  getAllDistricts,
  getBlocks,
  getLowerDesignations,
  getLowerDesignationsChoices,
  getVisibility,
} from "../designation";
import { useLogin } from "../hooks";
import { getClusters } from "../designation";
import { ChangePasswordButton } from "../ChangePasswordButton";
import { designationLevels } from "../esamwaad/designation";
import EditWrapper from "../../../components/styleWrappers/EditWrapper";
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
          padding: "7px 10px",
          margin: "5px",
          color: "white",
          borderRadius: "25px",
          backgroundColor: "#5a968b",
          display: "inline-block",
        }}
        key={index}
      >
        {role}
      </span>
    );
  });
};
const UserForm = () => {
  const { user: _loggedInUser } = useLogin();
  const [scope, setScope] = useState("No");
  const [state, setState] = useState({
    userName: "",
    fullName: "",
    mobile: "",
    designation: "",
    geographicLevel: "Block",
    district: "",
    block: "",
    cluster: "",
    roles: ["school"],
    password: "1234abcd",
  });
  const designationChoices = getLowerDesignationsChoices(_loggedInUser);
  const districtChoices = getAllDistricts("", _loggedInUser);
  const blockChoices = getBlocks(state.district, "", _loggedInUser);
  const clusterChoices = getClusters(state.block, "", _loggedInUser);

  const validatePhoneNumber = [minLength(10, "Phone Number must be 10 digit long"), maxLength(10, "Phone Number must be 10 digit long")];

  return (
    <>
      <span>User Details</span>

      <TextInput source="username" disabled={true} />
      <TextInput source="fullName" label="Full Name"  />
      <TextInput source="mobilePhone" label="Mobile Phone" validate={validatePhoneNumber} />
      <SelectInput
        value={state.designation}
        onChange={(e) => {
          const des = e.target.value;
          setState({ ...state, designation: des });
          const scopeData = designationLevels.filter((s) => {
            if (s.designation == des) {
              return s.scope;
            }
          });
          setScope(scopeData[0].scope);
        }}
        source="designation"
        label="Designation"
        choices={designationChoices}
      />

      {scope === "District" || scope === "Block" || scope === "Cluster" ? (
        <SelectInput
          value={state.district}
          onChange={(e) => setState({ ...state, district: e.target.value })}
          source="district"
          label="District"
          // @ts-ignore
          choices={districtChoices}
        />
      ) : null}

      {scope === "Block" || scope === "Cluster" ? (
        <SelectInput
          value={state.block}
          onChange={(e) => setState({ ...state, block: e.target.value })}
          source="block"
          label="Block"
          // @ts-ignore
          choices={blockChoices}
        />
      ) : null}
      {scope === "Cluster" ? (
        <SelectInput
          value={state.cluster}
          onChange={(e) => setState({ ...state, cluster: e.target.value })}
          source="cluster"
          label="Cluster"
          // @ts-ignore
          choices={clusterChoices}
        />
      ) : null}

      <FunctionField
        label="Role"
        render={(record: any) => {
          return (
            <>
              {displayRoles(record)}
              <br />
              <br />
              <ChangePasswordButton record={record} />
              <br />
              <br />
            </>
          );
        }}
      />
    </>
  );
};
const UserEdit = () => (
  <EditWrapper>
    <UserForm />
  </EditWrapper>
);
export default UserEdit;
