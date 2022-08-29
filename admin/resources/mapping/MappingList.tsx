import {
  Pagination,
  ReferenceInput,
  SelectInput,
  TextInput,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
  useRecordContext,
  useDataProvider,
  useResourceContext,
  LinearProgress,
} from "react-admin";
import { useQuery } from "react-query";
import { Box, Typography } from "@mui/material";

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
  console.log(data);
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
const MappingList = () => {
  const Filters = [
    <TextInput label="Username" source={"username"} alwaysOn key={"search"} />,
    <TextInput label="Quarter" source={"quarter"} key={"search"} />,
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
  ];
  const MappingPagination = () => (
    <Pagination rowsPerPageOptions={[50, 75, 100]} />
  );

  return (
    <List filters={Filters} pagination={<MappingPagination />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="username" />
        <QuarterField label={"Year  /  Month1  /  Month2  /  Month3"} />

        <ReferenceField label="District" source="school_id" reference="school">
          <ReferenceField
            label="District"
            source="location_id"
            reference="location"
          >
            <TextField source="district" />
          </ReferenceField>
        </ReferenceField>
        <ReferenceField label="Block" source="school_id" reference="school">
          <ReferenceField
            label="Block"
            source="location_id"
            reference="location"
          >
            <TextField source="block" />
          </ReferenceField>
        </ReferenceField>
        <ReferenceField label="Cluster" source="school_id" reference="school">
          <ReferenceField
            label="Cluster"
            source="location_id"
            reference="location"
          >
            <TextField source="cluster" />
          </ReferenceField>
        </ReferenceField>
        <ReferenceField label="Udise" source="school_id" reference="school">
          <TextField source="udise" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
export default MappingList;
