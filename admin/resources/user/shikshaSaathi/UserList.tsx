import {
  FunctionField,
  Datagrid,
  List,
  NumberField,
  TextField,
  TextInput,
  LinearProgress,
  useGetOne,
  useDataProvider,
  useRecordContext,
  SelectInput,
} from "react-admin";

import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import * as _ from "lodash";
import { ListDataGridWithPermissions } from "../../../components/lists";
import { ChangePasswordButton } from "../ChangePasswordButton";

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

const getLocationDataByRecord = (id: any) => {
  const TEACHER = "teacher";
  //@ts-ignore
  const { data: teacher } = useGetOne("teacher", { user_id: id });
  const { data: school } = useGetOne("school", {
    //@ts-ignore
    school_id: teacher?.school_id,
  });
  const { data: location } = useGetOne("location", {
    //@ts-ignore
    id: school?.location_id,
  });
  return location;
};
const getCorrespondingTeacherDistrict = (record: any) => {
  const location = getLocationDataByRecord(record?.id);

  if (!location) return <LinearProgress />;

  return <TextField label="District" source="district" record={location} />;
};

const getCorrespondingTeacherBlock = (record: any) => {
  const location = getLocationDataByRecord(record?.id);

  if (!location) return <LinearProgress />;

  return <TextField label="Block" source="block" record={location} />;
};

const getCorrespondingTeacherCluster = (record: any) => {
  const location = getLocationDataByRecord(record?.id);

  if (!location) return <LinearProgress />;

  return <TextField label="Cluster" source="cluster" record={location} />;
};

const UserList = () => {
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
    return _.uniqBy(
      districtData,
      "block"
    ).map((a) => {
      return {
        id: a.block,
        name: a.block,
      };
    });
  }, [districtData]);

  const clusters = useMemo(() => {
    if (!districtData) {
      return [];
    }
    return _.uniqBy(
      districtData,
      "cluster"
    ).map((a) => {
      return {
        id: a.cluster,
        name: a.cluster,
      };
    });
  }, [districtData]);

  const Filters = [
    <TextInput label="Username" source="username" alwaysOn key={"search"} />,
    <SelectInput
      label="Role"
      source="data.roleData.role"
      choices={districts}
      key={"role"}
    />,
    <SelectInput
      label="District"
      key={"district"}
      onChange={(e: any) => {
        setSelectedDistrict(e.target.value);
        setSelectedBlock(null);
        setSelectedCluster(null);
      }}
      value={selectedDistrict}
      source="data.roleData.district"
      choices={districts}
    />,
    <SelectInput
      label="Block"
      onChange={(e) => {
        setSelectedBlock(e.target.value);
        setSelectedCluster(null);
      }}
      key="block"
      value={selectedBlock}
      source="block"
      choices={blocks}
    />,
    <SelectInput
      label="Cluster"
      onChange={(e) => setSelectedCluster(e.target.value)}
      value={selectedCluster}
      source="cluster"
      choices={clusters}
      key="cluster"
    />,
  ];

  return (
    <ListDataGridWithPermissions
      listProps={{ filters: Filters }}
      dataGridProps={{ rowClick: "show" }}
    >
      <TextField source="username" />
      <TextField source="fullName" />
      <NumberField source="mobilePhone" label="Mobile Phone" />
      <FunctionField
        label="Role"
        render={(record: any) => {
          return DisplayRoles(record);
        }}
      />
      <TextField source="data.roleData.district" label="District" />
      <TextField source="data.roleData.block" label="Block" />
      <TextField source="data.roleData.cluster" label="Cluster" />

      {/* <FunctionField
        label="District"
        render={(record: any) => getCorrespondingTeacherDistrict(record)}
      />{" "}
      <FunctionField
        label="Block"
        render={(record: any) => getCorrespondingTeacherBlock(record)}
      />{" "}
      <FunctionField
        label="Cluster"
        render={(record: any) => getCorrespondingTeacherCluster(record)}
      /> */}
    </ListDataGridWithPermissions>
  );
};
export default UserList;
