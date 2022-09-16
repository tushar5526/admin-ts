import { useState } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
} from "react-admin";
import { useLogin } from "../hooks";
import { getClusters } from "../designation";
import {
  getAllDistricts,
  getBlocks,
  getLowerDesignations,
  getLowerDesignationsChoices,
  getVisibility,
} from "../designation";
// const ApplicationId = "1ae074db-32f3-4714-a150-cc8a370eafd1";
const UserCreate = (props: any) => {
  const { user: _loggedInUser } = useLogin();
  const [state, setState] = useState({
    userName: "",
    fullName: "",
    mobile: "",
    designation: "",
    geographicLevel: "",
    district: "",
    block: "",
    cluster: "",
  });
  const handleSubmit = () => {
    console.log(state, "I am geting submitted ");
  };

  //   const designation = getLowerDesignations(_loggedInUser);
  const designationChoices = getLowerDesignationsChoices(_loggedInUser);
  const districtChoices = getAllDistricts("", _loggedInUser);
  const blockChoices = getBlocks(state.district, "", _loggedInUser);
  const clusterChoices = getClusters(state.block, "", _loggedInUser);

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSubmit}>
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
          source="geographic_level"
          label="GeoGraphic Level"
        />
        <SelectInput
          value={state.designation}
          onChange={(e) => setState({ ...state, designation: e.target.value })}
          source="designation"
          label="Designation"
          choices={designationChoices}
        />
        {getVisibility(state.designation, "District") && (
          <SelectInput
            value={state.district}
            onChange={(e) =>
              setState({ ...state, designation: e.target.value })
            }
            source="district"
            label="District"
            // @ts-ignore
            choices={districtChoices}
          />
        )}

        {getVisibility(state.designation, "Block") && state.district.length && (
          <SelectInput
            value={state.block}
            onChange={(e) => setState({ ...state, block: e.target.value })}
            source="block"
            label="Block"
            // @ts-ignore
            choices={blockChoices}
          />
        )}
        {getVisibility(state.designation, "Cluster") &&
          state.district.length &&
          state.block.length && (
            <SelectInput
              value={state.cluster}
              onChange={(e) => setState({ ...state, cluster: e.target.value })}
              source="cluster"
              label="Cluster"
              // @ts-ignore
              choices={clusterChoices}
            />
          )}
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
