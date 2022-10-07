import {
  TextInput,
  ReferenceInput,
  SelectInput,
  Edit,
  SimpleForm,
  useDataProvider,
  NumberInput,
  BooleanInput,
} from "react-admin";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import * as _ from "lodash";

export const SchoolEdit = () => {
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

  return (
    <Edit mutationMode={"pessimistic"}>
      <SimpleForm>
        {/* <ReferenceInput source="id" reference="location">
          <SelectInput disabled optionText={"id"} />
        </ReferenceInput> */}
        <NumberInput source="enroll_count" />
        <BooleanInput source="is_active" />
        <TextInput source="latitude" />
        <ReferenceInput source="location_id" reference="location">
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
          />
        </ReferenceInput>
        <ReferenceInput source="location_id" reference="location">
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
        </ReferenceInput>
        <ReferenceInput source="location_id" reference="location">
          <SelectInput
            label="Cluster"
            onChange={(e) => setSelectedCluster(e.target.value)}
            value={selectedCluster}
            source="cluster"
            choices={clusters}
          />
        </ReferenceInput>
        <TextInput source="longitude" />
        <TextInput source="name" />
        <TextInput source="session" />
        <TextInput source="type" />
        <NumberInput source="udise" />
      </SimpleForm>
    </Edit>
  );
};
export default SchoolEdit;
