import {
  NumberField,
  TextField,
  FunctionField,
  SearchInput,
  useGetOne,
  LinearProgress,
  ReferenceField,
  SelectInput,
  TextInput,
  useDataProvider,
  useRecordContext,
} from "react-admin";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import * as _ from "lodash";
import { ListDataGridWithPermissions } from "../../../components/lists";
import { Chip } from "@mui/material";

const ApplicationId = "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da";
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
const getTeacherDataByRecord = (id: any) => {
  const TEACHER = "teacher";
  //@ts-ignore
  const { data: teacher } = useGetOne(TEACHER, { user_id: id });

  return teacher;
};
const getCorrespondingTeacherDistrict = (record: any) => {
  const teacher = getTeacherDataByRecord(record?.id);

  if (!teacher) return <LinearProgress />;

  return (
    <ReferenceField source="school_id" reference="school" record={teacher}>
      <ReferenceField source="location_id" reference="location">
        <TextField source="district" />
      </ReferenceField>
    </ReferenceField>
  );
};

const getCorrespondingTeacherBlock = (record: any) => {
  const teacher = getTeacherDataByRecord(record?.id);

  if (!teacher) return <LinearProgress />;

  return (
    <ReferenceField source="school_id" reference="school" record={teacher}>
      <ReferenceField source="location_id" reference="location">
        <TextField source="block" />
      </ReferenceField>
    </ReferenceField>
  );
};

const getCorrespondingTeacherCluster = (record: any) => {
  const teacher = getTeacherDataByRecord(record?.id);

  if (!teacher) return <LinearProgress />;
  return (
    <ReferenceField source="school_id" reference="school" record={teacher}>
      <ReferenceField source="location_id" reference="location">
        <TextField source="cluster" />
      </ReferenceField>
    </ReferenceField>
  );
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

  const Filters = [
    <TextInput label="Username" source="username" alwaysOn key={"search"} />,
    <SelectInput
      label="Role"
      source="esamwadRoles"
      choices={["Teacher", "Principal", "school"].map(el => { return { id: el, name: el } })}
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

  const statusChoices = [
    {
      id: "PENDING",
      name: "Pending",
      icon: "warning",
      color: "#FEC400",
    },
    {
      id: "REJECTED",
      name: "Rejected",
      icon: "pending_actions",
      color: "#F12B2C",
      templateId: "1007409368881000345",
      template:
        "Your registration request for e-Samvad has been rejected. Please contact your school head regarding this matter.\n\nSamagra Shiksha, Himachal Pradesh",
    },
    {
      id: "ACTIVE",
      name: "Active",
      icon: "inventory",
      color: "#29CC97",
      templateId: "1007578130357765332",
      template:
        "Your registration on e-Samvad has been approved. You can login to the app to access all the features.\n\nSamagra Shiksha, Himachal Pradesh",
    },
    {
      id: "DEACTIVATED",
      name: "Deactivated",
      icon: "real_estate_agent",
      color: "#cbcbcb",
    },
  ];

  const ColoredChipField = (props: any) => {
    const record = useRecordContext();

    let data = statusChoices.find((elem) => elem.id === record[props.source]);
    return (
      <Chip
        style={{ backgroundColor: data?.color, color: "#FFF" }}
        label={data?.name}
      />
    );
  };

  return (
    <ListDataGridWithPermissions
      listProps={{ filters: Filters }}
    >
      <TextField source="username" sortable={false}/>
      <NumberField source="data.udise" label="UDISE" sortable={false}/>
      <ColoredChipField label="Account Status" source="usernameStatus" sortable={false}/>
      <FunctionField
        label="Full Name"
        render={(record: any) => `${record.firstName} ${record.lastName}`}
      />
      ;
      <NumberField source="mobilePhone" label="Mobile Phone" sortable={false} />
      ;
      <FunctionField
        label="Role"
        render={(record: any) => {
          return DisplayRoles(record);
        }}
      />
      <TextField source="data.roleData.district" label="District" sortable={false}/>
      <TextField source="data.roleData.block" label="Block" sortable={false}/>
      <TextField source="data.roleData.cluster" label="Cluster" sortable={false}/>
      <TextField source="data.roleData.designation"label="Designation" 
      sx={{
          padding: "7px 10px",
          margin: "5px",
          color: "white",
          borderRadius: "25px",
          backgroundColor: "#5a968b",
          display: "inline-block",
        }} 
        sortable={false}/>
      {/* <FunctionField
        label="District"
        render={(record: any) => {
          console.log(record);
          return getCorrespondingTeacherDistrict(record)
        }}
      />
      <FunctionField
        label="Block"
        render={(record: any) => {
          console.log(record);
          return getCorrespondingTeacherBlock(record)
        }}
      />
      <FunctionField
        label="Cluster"
        render={(record: any) => {
          console.log(record);
          return getCorrespondingTeacherCluster(record)
        }}
      /> */}
    </ListDataGridWithPermissions>
  );
};
export default UserList;
