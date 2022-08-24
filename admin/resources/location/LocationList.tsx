import { useMemo, useState } from "react";
import { Datagrid, List, SelectInput, TextField, TextInput } from "react-admin";
import * as _ from "lodash";

const LocationList = () => {
  //   const params = new Proxy(new URLSearchParams(props.location.search), {
  //     get: (searchParams, prop) => searchParams.get(prop),
  //   });
  //   const initialFilters = params.filter ? JSON.parse(params.filter) : null;
  //   const [selectedDistrict, setSelectedDistrict] = useState(
  //     initialFilters?.district || ""
  //   );
  //   const [selectedBlock, setSelectedBlock] = useState(
  //     initialFilters?.block || ""
  //   );
  //   const [selectedCluster, setSelectedCluster] = useState(
  //     initialFilters?.cluster || ""
  //   );
  //   const {
  //     data: districtData,
  //     isLoading,
  //     error,
  //   } = useQuery(
  //     {
  //       type: "getList",
  //       resource: "location",
  //       payload: {},
  //     },
  //     {}
  //   );
  //   const districts = useMemo(() => {
  //     if (!districtData) {
  //       return [];
  //     }
  //     return _.uniqBy(districtData, "district").map((a) => {
  //       return {
  //         id: a.district,
  //         name: a.district,
  //       };
  //     });
  //   }, [districtData]);
  //   const blocks = useMemo(() => {
  //     if (!selectedDistrict || !districtData) {
  //       return [];
  //     }
  //     return _.uniqBy(
  //       districtData.filter((d) => d.district === selectedDistrict),
  //       "block"
  //     ).map((a) => {
  //       return {
  //         id: a.block,
  //         name: a.block,
  //       };
  //     });
  //   }, [selectedDistrict, districtData]);

  //   const clusters = useMemo(() => {
  //     if (!selectedBlock || !districtData) {
  //       return [];
  //     }
  //     return _.uniqBy(
  //       districtData.filter((d) => d.block === selectedBlock),
  //       "cluster"
  //     ).map((a) => {
  //       return {
  //         id: a.cluster,
  //         name: a.cluster,
  //       };
  //     });
  //   }, [selectedBlock, districtData]);

  //   const postFilters = [
  //     <TextInput label="Search" source="id" alwaysOn />,
  //     <SelectInput
  //       label="District"
  //       onChange={(e) => setSelectedDistrict(e.target.value)}
  //       value={selectedDistrict}
  //       source="district"
  //       choices={districts}
  //     />,
  //     selectedDistrict ? (
  //       <SelectInput
  //         label="Block"
  //         onChange={(e) => setSelectedBlock(e.target.value)}
  //         value={selectedBlock}
  //         source="block"
  //         choices={blocks}
  //       />
  //     ) : (
  //       <></>
  //     ),
  //     selectedBlock ? (
  //       <SelectInput
  //         label="Cluster"
  //         onChange={(e) => setSelectedCluster(e.target.value)}
  //         value={selectedCluster}
  //         source="cluster"
  //         choices={clusters}
  //       />
  //     ) : (
  //       <></>
  //     ),
  //   ];
  return (
    <List
    // filters={postFilters}
    >
      <Datagrid rowClick={"edit"}>
        <TextField source="id" />
        <TextField source="district" />
        <TextField source="block" />
        <TextField source="cluster" />
      </Datagrid>
    </List>
  );
};
export default LocationList;
