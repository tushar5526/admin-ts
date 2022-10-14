import {
  Pagination,
  ReferenceInput,
  SelectInput,
  TextInput,
  Datagrid,
  List,
  ReferenceField,
  TextField,
  useRecordContext,
  useDataProvider,
  useResourceContext,
  LinearProgress,
  Button,
} from "react-admin";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Typography } from "@mui/material";
import { ListDataGridWithPermissions } from "../../components/lists";
import { useMemo, useState } from "react";
import * as _ from "lodash";
import FormatSelectorModal from "./FormatSelectorModal";

const QuarterField = ({ label }: { label: string }) => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const resource = useResourceContext();
  const { data, isLoading, refetch } = useQuery(
    ["ss_school_allocation_quarter", record.quarter],
    () =>
      dataProvider.getList("ss_school_allocation_quarter", {
        sort: { field: "id", order: "asc" },
        pagination: { perPage: 1, page: 1 },
        filter: { quarter_id: record.quarter },
      })
  );
  if (isLoading) {
    return <LinearProgress />;
  }
  if (!data?.data?.[0]) {
    return <Typography>NA</Typography>;
  }
  return (
    <div style={{ display: "flex" }}>
      <Box sx={{ mr: 1 }}>
        <TextField label={"Year"} source={"year"} record={data?.data?.[0]} />
      </Box>
      <Box sx={{ mr: 1 }}>/</Box>
      <Box sx={{ mr: 1 }}>
        <TextField source={"month1"} record={data?.data?.[0]} />
      </Box>
      <Box sx={{ mr: 1 }}>/</Box>
      <Box sx={{ mr: 1 }}>
        <TextField source={"month2"} record={data?.data?.[0]} />
      </Box>
      <Box sx={{ mr: 1 }}>/</Box>
      <Box sx={{ mr: 1 }}>
        <TextField source={"month3"} record={data?.data?.[0]} />
      </Box>
    </div>
  );
};
const SchoolMappingList = () => {
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
  const [open, setOpen] = useState(false);
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
    if (!selectedDistrict || !districtData) {
      return [];
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
    if (!selectedBlock || !districtData) {
      return [];
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

  const quarterChoices = [
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
  ];
  const importButton = <button>Import</button>;
  const Filters = [
    <TextInput label="Username" source={"username"} alwaysOn key={"search"} />,
    <SelectInput label="Quarter" source={"quarter"} choices={quarterChoices} />,
    <ReferenceInput
      key={"school_id"}
      label="School"
      source="school_id"
      reference="school"
    >
      <SelectInput label="School" optionText="name" />
    </ReferenceInput>,
    <ReferenceInput
      key={"udise"}
      label="Udise"
      source="school_id"
      reference="school"
    >
      <SelectInput label="Udise" optionText="udise" />
    </ReferenceInput>,
    <SelectInput
      label="District"
      key={"district"}
      onChange={(e: any) => {
        setSelectedDistrict(e.target.value);
        setSelectedBlock(null);
        setSelectedCluster(null);
      }}
      value={selectedDistrict}
      source="district"
      choices={districts}
    />,
    selectedDistrict ? (
      <SelectInput
        label="Block"
        onChange={(e) => {
          setSelectedBlock(e.target.value);
          setSelectedCluster(null);
        }}
        value={selectedBlock}
        source="block"
        choices={blocks}
      />
    ) : (
      <></>
    ),
    selectedBlock ? (
      <SelectInput
        label="Cluster"
        onChange={(e) => setSelectedCluster(e.target.value)}
        value={selectedCluster}
        source="cluster"
        choices={clusters}
      />
    ) : (
      <></>
    ),
  ];

  const toggleModal = () => setOpen(!open);

  return (
    <>
      <div className="student_mapping_imp">
        <Button label="Import" onClick={toggleModal} />
        <FormatSelectorModal open={open} handleOpen={toggleModal} />
      </div>
      <ListDataGridWithPermissions
        listProps={{ filters: Filters }}
        dataGridProps={{ rowClick: "edit" }}
      >
        <TextField source="id" />
        <TextField source="username" />
        <QuarterField label={"Year  /  Month1  /  Month2  /  Month3"} />
        <TextField label="School" source="school.name" />
        <TextField label="UDISE" source="school.udise" />
        <TextField label="District" source="school.location.district" />
        <TextField label="Block" source="school.location.block" />
        <TextField label="Cluster" source="school.location.cluster" />
      </ListDataGridWithPermissions>
    </>
  );
};
export default SchoolMappingList;
