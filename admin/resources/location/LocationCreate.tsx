import React, { useEffect, useMemo, useState } from "react";
import {
  Create,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useRecordContext,
} from "react-admin";
import * as _ from "lodash";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

const LocationCreate = () => {
  const record = useRecordContext();
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

  return (
    <Create>
      <SimpleForm>
        <SelectInput
          label="District"
          onChange={(e) => {
            // const nam: any = districtData?.filter((item) => {
            //   return e.target.value === item.district;
            // });

            setSelectedDistrict(e.target.value);
          }}
          value={selectedDistrict}
          source="district"
          choices={districts}
          validate={[required()]}
        />
        <TextInput source="block" />
        <TextInput source="cluster" />
      </SimpleForm>
    </Create>
  );
};

export default LocationCreate;
