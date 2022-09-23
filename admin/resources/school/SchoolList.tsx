import { TextField, ReferenceField } from "react-admin";
import { WithMyDistricts } from "../../components/withAccesses";
import { ListDataGridWithPermissions } from "../../components/lists";

const SchoolList = () => {
  return (
    <WithMyDistricts>
      {(districts: any) => {
        return (
          <ListDataGridWithPermissions
            listProps={{
              filter: {
                location: {
                  format: "hasura-raw-query",
                  value: {
                    district: { _in: districts.map((d: any) => d.id) },
                  },
                },
              },
            }}
          >
            <TextField label="UDISE" source="udise" />
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
          </ListDataGridWithPermissions>
        );
      }}
    </WithMyDistricts>
  );
};
export default SchoolList;
