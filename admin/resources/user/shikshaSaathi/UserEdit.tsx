import { useEffect, useMemo, useRef, useState } from "react";
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
  required,
  number,
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
import _ from "lodash";
import { useLocation } from "react-router-dom";

let geographic_level: string = "";
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
  <Toolbar {...props}>
    <SaveButton sx={{backgroundColor : "green"}}/>
  </Toolbar>
);
const UserForm = () => {
  const { user: _loggedInUser } = useLogin();
  const [scope, setScope] = useState("");
  const [state, setState] = useState({
    userName: "",
    fullName: "",
    mobile: "",
    designation: "",
    geographicLevel: geographic_level,
    district: "",
    block: "",
    cluster: "",
    roles: [""],
    password: "1234abcd",
  });
  const designationChoices = getLowerDesignationsChoices(_loggedInUser);
  const dataProvider = useDataProvider();
  const {
    data: _districtData,
    isLoading,
    error,
  } = useQuery(["location", "getList", {}], () =>
    dataProvider.getList("location", {
      pagination: { perPage: 10000, page: 1 },
      sort: { field: "id", order: "asc" },
      filter: {},
    })
  );

  const location = useLocation();
  const params: any = new Proxy(new URLSearchParams(location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
  });
  const initialFilters = params.filter ? JSON.parse(params.filter) : null;
  const [selectedDistrict, setSelectedDistrict] = useState(
    initialFilters?.district || ""
  );
  const [selectedBlock, setSelectedBlock] = useState(
    initialFilters?.block || ""
  );
  const [selectedCluster, setSelectedCluster] = useState(
    initialFilters?.cluster || ""
  );

  const districtData = useMemo(() => {
    return _districtData?.data;
  }, [_districtData]);

  const districts = useMemo(() => {
    if (!districtData) {
      return [];
    }
    return _.uniqBy(districtData, "district").map((a) => {
      return {
        id: a.district,
        name: a.district,
      };
    });
  }, [districtData]);
  const blocks = useMemo(() => {
    if (!districtData) {
      return [];
    }
    if (!selectedDistrict) {
      return _.uniqBy(
        districtData,
        "block"
      ).map((a) => {
        return {
          id: a.block,
          name: a.block,
        };
      });
    }
    return _.uniqBy(
      districtData.filter((d) => d.district === selectedDistrict),
      "block"
    ).map((a) => {
      return {
        id: a.block,
        name: a.block,
      };
    });
  }, [selectedDistrict, districtData]);

  const clusters = useMemo(() => {
    if (!districtData) {
      return [];
    }
    if (!selectedBlock) {
      return _.uniqBy(
        districtData,
        "cluster"
      ).map((a) => {
        return {
          id: a.cluster,
          name: a.cluster,
        };
      });
    }
    return _.uniqBy(
      districtData.filter((d) => d.block === selectedBlock),
      "cluster"
    ).map((a) => {
      return {
        id: a.cluster,
        name: a.cluster,
      };
    });
  }, [selectedBlock, districtData]);

  const validatePhoneNumber = [
    required(),
    number(),
    minLength(10, "Phone Number must be 10 digit long"),
    maxLength(10, "Phone Number must be 10 digit long"),
  ];
  const record = useRecordContext();
  const firstRender = useRef(true);
  const [designationName, setDesignationName] = useState("");
  useEffect(() => {
    if (firstRender.current) {
      setDesignationName(record?.registrations?.[0].roles);
      firstRender.current = false;
      return;
    }
  }, [designationName]);
  return (
    <>
      <span>User Details</span>

      <TextInput
        onChange={(e) => setState({ ...state, userName: e.target.value })}
        source="username"
        disabled={true}
      />
      <TextInput
        onChange={(e) => setState({ ...state, fullName: e.target.value })}
        source="fullName"
        label="Full Name"
      />
      <TextInput
        onChange={(e) => setState({ ...state, mobile: e.target.value })}
        source="mobilePhone"
        label="Mobile Phone"
        validate={validatePhoneNumber}
      />
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
          geographic_level = scopeData[0].scope
        }}
        source="designation"
        label="Role"
        choices={designationChoices}
      />

      {scope === "District" || scope === "Block" || scope === "Cluster" ? (
        <SelectInput
          value={state.district}
          onChange={(e: any) => {
            setSelectedDistrict(e.target.value);
            setSelectedBlock(null);
            setSelectedCluster(null);
            setState({ ...state, cluster: e.target.value })
          }}
          source="district"
          label="District"
          // @ts-ignore
          choices={districts}
        />
      ) : null}

      {scope === "Block" || scope === "Cluster" ? (
        <SelectInput
          value={state.block}
          onChange={(e: any) => {
            setSelectedBlock(e.target.value);
            setSelectedCluster(null);
            setState({ ...state, cluster: e.target.value })
          }}
          source="block"
          label="Block"
          // @ts-ignore
          choices={blocks}
        />
      ) : null}
      {scope === "Cluster" ? (
        <SelectInput
          value={state.cluster}
          onChange={(e: any) => {
            setSelectedCluster(e.target.value)
            setState({ ...state, cluster: e.target.value })
          }}
          source="cluster"
          label="Cluster"
          // @ts-ignore
          choices={clusters}
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
              accountName: values["fullName"],
              roleData: {
                district: values?.district,
                block: values?.block,
                cluster: values?.cluster,
                designation: values?.designation,
                geographic_level: geographic_level
              },
            },
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
  );
};
export default UserEdit;
