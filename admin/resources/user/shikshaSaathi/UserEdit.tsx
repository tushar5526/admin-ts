import { useEffect, useRef, useState } from "react";
import {
  useResourceContext,
  useNotify,
  useRefresh,
  useRedirect,
  Edit,
  FunctionField,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
  useDataProvider,
  maxLength,
  minLength,
  Toolbar,
  SaveButton,
} from "react-admin";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  getAllDistricts,
  getBlocks,
  getLowerDesignationsChoices,
} from "../designation";
import { useLogin } from "../hooks";
import { getClusters } from "../designation";
import { ChangePasswordButton } from "../ChangePasswordButton";
import { designationLevels } from "../esamwaad/designation";  

const displayRoles = (a: any) => {
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
      >
        {a}
      </span>
    );
};
const UserEditToolbar = (props: any) => (
  <Toolbar {...props} >
    <SaveButton />
  </Toolbar>
);
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
    roles: [""],
    password: "1234abcd",
  });
  const designationChoices = getLowerDesignationsChoices(_loggedInUser);
  const districtChoices = getAllDistricts("", _loggedInUser);
  const blockChoices = getBlocks(state.district, "", _loggedInUser);
  const clusterChoices = getClusters(state.block, "", _loggedInUser);

  const validatePhoneNumber = [minLength(10, "Phone Number must be 10 digit long"), maxLength(10, "Phone Number must be 10 digit long")];
  const record = useRecordContext();
  const firstRender = useRef(true);
  const [designationName, setDesignationName] = useState("");
  useEffect(() => {
    if(firstRender.current){
      setDesignationName(record?.registrations?.[0].roles);
      firstRender.current = false;
      return;
    }   
  },[designationName]);
  return (
    <>
      <span>User Details</span>

      <TextInput
        onChange={e => setState({ ...state, userName: e.target.value })}
        source="username"
        disabled={true} />
      <TextInput
        onChange={e => setState({ ...state, fullName: e.target.value })}
        source="fullName"
        label="Full Name" />
      <TextInput
        onChange={e => setState({ ...state, mobile: e.target.value })}
        source="mobilePhone"
        label="Mobile Phone"
        validate={validatePhoneNumber} />
      <SelectInput
        defaultValue={record?.registrations?.[0].roles}
        onChange={(e) => {
          const des = e.target.value;
          setState({ ...state, designation: des });
          const scopeData = designationLevels.filter((s) => {
            if (s.designation == des) {
              return s.scope;
            }
          });
          setDesignationName(e.target.value);
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
              {displayRoles(designationName)}
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
const UserEdit = () => {
  const notify = useNotify();
  const resource = useResourceContext();
  const dataProvider = useDataProvider();
  const redirect = useRedirect();
  const params = useParams();
  const refresh = useRefresh();
  const { mutate, isLoading } = useMutation(
    ["updateUser", params.id],
    (value) => dataProvider.updateUser(resource, value),
    {
      onSuccess: (data: any) => {
        refresh();
        redirect("/" + resource);
      },
      onError: (error: any) => {
        notify(error.toString(), { type: "error" });
      },
    }
  );
  return (
    <Edit>
      <SimpleForm
        toolbar={<UserEditToolbar />}
        onSubmit={(values) => {
          const _v: any = {
            mobilePhone: values["mobilePhone"],
            userName: values["userName"],
            fullName: values["fullName"],
            data: {
              phone: values["mobilePhone"],
              accountName: values["userName"],
              district: values?.data.district,
              block: values?.data.block,
              cluster: values?.data.cluster
            },
            designation: values.designation,
            id: values.id,
          };
          _v["gql"] = {
            designation: _v.designation,
            cadre: _v.designation,
          };
          mutate(_v);
          notify(`User updated successfully`, { type: "success" });
        }}
      >
        <UserForm />
      </SimpleForm>
    </Edit>
  )
};
export default UserEdit;
