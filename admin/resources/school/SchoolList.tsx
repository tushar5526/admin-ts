import {
  TextField,
  ReferenceField,
  TextInput,
  FunctionField,
  SelectInput,
} from "react-admin";
import { WithMyDistricts } from "../../components/withAccesses";
import { ListDataGridWithPermissions } from "../../components/lists";
import { BooleanField } from "react-admin";

const SchoolList = () => {
  const typeChoice = [
    { id: "GPS", name: "GPS" },
    { id: "GMS", name: "GMS" },
    { id: "GHS", name: "GHS" },
    { id: "GSSS", name: "GSSS" },
  ];
  const sessionChoices = [
    { id: "S", name: "S" },
    { id: "W", name: "W" },
  ];
  const activeChoices = [
    { id: true, name: true },
    { id: false, name: false },
  ];
  const Filters = [
    <TextInput label="School Name" source="name" alwaysOn key={"search"} />,
    <TextInput label="Udise" source="udise" key={"search"} />,
    <SelectInput label="Type" source="type" choices={typeChoice} />,
    <SelectInput label="Session" source="session" choices={sessionChoices} />,
    <SelectInput label="Active" source="is_active" choices={activeChoices} />,
  ];
  return (
    <WithMyDistricts>
      {(districts: any) => {
        return (
          <ListDataGridWithPermissions
            dataGridProps={{ rowClick: "show" }}
            listProps={{
              filter: {
                location: {
                  format: "hasura-raw-query",
                  value: {
                    district: { _in: districts.map((d: any) => d.id) },
                  },
                },
              },
              filters: Filters,
            }}
          >
            <TextField label="UDISE" source="udise" />
            <TextField label="Name" source="name" />
            <TextField label="Type" source="type" />
            <TextField label="Session" source="session" />
            <ReferenceField
              source="location_id"
              label="District"
              reference="location"
            >
              <TextField label="District" source="district" />
            </ReferenceField>
            <ReferenceField
              source="location_id"
              label="Block"
              reference="location"
            >
              <TextField label="Block" source="block" />
            </ReferenceField>{" "}
            <ReferenceField
              source="location_id"
              label="Cluster"
              reference="location"
            >
              <TextField label="Cluster" source="cluster" />
            </ReferenceField>
            {/* <FunctionField
              label="Session"
              render={(record: any) => {
                const obj = config.schoolSession.find(
                  (elem: any) => elem.id === record.session
                );
                return obj?.name;
              }}
            /> */}
            <BooleanField label="Active" source="is_active" />
          </ListDataGridWithPermissions>
        );
      }}
    </WithMyDistricts>
  );
};
export default SchoolList;
