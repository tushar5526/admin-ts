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
} from "react-admin";

const MappingList = () => {
  const Filters = [
    <TextInput label="Username" source={"username"} alwaysOn key={"search"} />,
    <TextInput label="Quarter" source={"quarter"} key={"search"} />,
    <ReferenceInput label="School" source="school_id" reference="school">
      <SelectInput label="School" optionText="name" />
    </ReferenceInput>,
    <ReferenceInput label="Udise" source="school_id" reference="school">
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
        <NumberField label="Quarter ID" source="quarter" />

        {/* <ReferenceField
          label={"Year"}
          source={"id"}
          reference="ss_school_allocation_quarter"
        >
          <TextField source="year" />
        </ReferenceField>

        <ReferenceField
          label={"Month1"}
          source={"id"}
          reference="ss_school_allocation_quarter"
        >
          <TextField source="month1" />
        </ReferenceField>

        <ReferenceField
          label={"Month2"}
          source={"id"}
          reference="ss_school_allocation_quarter"
        >
          <TextField source="month2" />
        </ReferenceField>
        <ReferenceField
          label={"Month3"}
          source={"id"}
          reference="ss_school_allocation_quarter"
        >
          <TextField source="month3" />
        </ReferenceField> */}
        <ReferenceField label="School" source="school_id" reference="school">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Udise" source="school_id" reference="school">
          <TextField source="udise" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
export default MappingList;
