import { useEffect, useMemo, useState } from "react";
import {
  TextInput,
  useRecordContext,
  ReferenceInput,
  useDataProvider,
  SelectInput,
  Edit
} from "react-admin";
import EditWrapper from "../../components/styleWrappers/EditWrapper";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import * as _ from "lodash";

const LocationForm = () => {
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
    if (!districtData) {
      return [];
    }
    if(!selectedDistrict){
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
    if(!selectedBlock){
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

  return (
    <>
      <span>Location Details</span>
        <ReferenceInput source="id" reference="location">
          <SelectInput disabled optionText={"id"} />
        </ReferenceInput>

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
        />
        <TextInput source="block" />
        <TextInput source="cluster" />
    </>
  );
};

export const LocationEdit = () => (
  <EditWrapper>
    <LocationForm />
  </EditWrapper>
);
export default LocationEdit;
