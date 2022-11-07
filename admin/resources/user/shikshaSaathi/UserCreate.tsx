import { useMemo, useState } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  Button,
  minLength,
  maxLength,
  required,
  number,
  useDataProvider,
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
import { useQuery } from "react-query";
import _ from "lodash";
import { useLocation } from "react-router-dom";
// const ApplicationId = "1ae074db-32f3-4714-a150-cc8a370eafd1"
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
    password: "1234abcd",
  });
  // to be called when submitted
  const createUser = () => {
    // to be completed
    const endPoint = "/admin/createUser";
    const body = {
      registration: {
        applicationId: "1ae074db-32f3-4714-a150-cc8a370eafd1",
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
    if(!selectedDistrict){
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
    if(!selectedBlock){
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
  const validatePhoneNumber = [required(),number(),minLength(10,"Phone Number must be of 10 digit"),maxLength(10,"Phone Number must be of 10 digit")];
  return userCreated ? (
    <>
      <p>User Successfully Created</p>
      <Button label="Back" onClick={() => history.back()} />
    </>
  ) : (
    <Create {...props}>
      <SimpleForm onSubmit={createUser}>
        <TextInput
          onChange={(e) => setState({ ...state, userName: e.target.value })}
          source="username"
          label="User Name"
          validate={[required()]}
        />
        <TextInput
          onChange={(e) => setState({ ...state, fullName: e.target.value })}
          source="fullName"
          label="Name"
          validate={[required()]}
        />
        <TextInput
          onChange={(e) => setState({ ...state, mobile: e.target.value })}
          source="mobilePhone"
          label="Mobile Phone"
          validate={validatePhoneNumber}
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
            onChange={(e: any) => {
              setSelectedDistrict(e.target.value);
              setSelectedBlock(null);
              setSelectedCluster(null);
              setState({ ...state, cluster: e.target.value })
            }}
            source="district"
            label="District"
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
            choices={clusters}
          />
        ) : null}
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
