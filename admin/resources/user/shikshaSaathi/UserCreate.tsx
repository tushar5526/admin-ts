import { useState } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  Button,
} from "react-admin";
import { useLogin } from "../hooks";
import { getClusters } from "../designation";
import { designationLevels } from "../esamwaad/designation";
import {
  getAllDistricts,
  getBlocks,
  getLowerDesignations,
  getLowerDesignationsChoices,
  getVisibility,
} from "../designation";
import { client } from "../../../api-clients/users-client";
// const ApplicationId = "1ae074db-32f3-4714-a150-cc8a370eafd1";
const UserCreate = (props: any) => {
  const { user: _loggedInUser } = useLogin();
  const [userCreated, setUserCreated] = useState(false);
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
  // to be called when submitted
  const createUser = () => {
    // to be completed
    const endPoint = "/admin/createUser";
    const body = {
      registration: {
        applicationId: "1ae074db-32f3-4714-a150-cc8a370eafd1",
        roles: state.roles,
        username: state.userName,
      },
      user: {
        data: {
          accountName: state.fullName,
          phone: state.mobile,
          roledata: {
            block: state.block,
            cluster: state.cluster,
            designation: state.designation,
            district: state.district,
            geographic_level: state.geographicLevel,
          },
        },
        fullName: state.fullName,
        mobilePhone: state.mobile,
        password: state.password,
        username: state.userName,
      },
    };
    const res = client.post(endPoint, body);
    console.log(res, "response of user creation");

    res.then((data) => {
      if (data?.data?.responseCode === "OK") {
        setUserCreated(true);
      }
    });
  };

  //   const designation = getLowerDesignations(_loggedInUser);
  const designationChoices = getLowerDesignationsChoices(_loggedInUser);
  const districtChoices = getAllDistricts("", _loggedInUser);
  const blockChoices = getBlocks(state.district, "", _loggedInUser);
  const clusterChoices = getClusters(state.block, "", _loggedInUser);

  return userCreated ? (
    <>
      <p>User Successfully Created</p>
      <Button label="Back" />
    </>
  ) : (
    <Create {...props}>
      <SimpleForm onSubmit={createUser}>
        <TextInput
          onChange={(e) => setState({ ...state, userName: e.target.value })}
          source="username"
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

        <TextInput
          onChange={(e) =>
            setState({ ...state, geographicLevel: e.target.value })
          }
          disabled
          source="geographic_level"
          label="GeoGraphic Level"
        />
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
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
