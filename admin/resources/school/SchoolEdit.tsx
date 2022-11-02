import {
  TextInput,
  ReferenceInput,
  SelectInput,
  Edit,
  SimpleForm,
  useDataProvider,
  NumberInput,
  BooleanInput,
  required,
  regex,
  FunctionField,
} from "react-admin";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import * as _ from "lodash";
import { getLocationDetails } from "../../utils/LocationDetailsHelper";

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

  // const districtData = useMemo(() => {
  //   return _districtData?.data;
  // }, [_districtData]);

  // const districts = useMemo(() => {
  //   if (!districtData) {
  //     return [];
  //   }
  //   return _.uniqBy(districtData, "district").map((a) => {
  //     return {
  //       id: a.district,
  //       name: a.district,
  //     };
  //   });
  // }, [districtData]);

  // const blocks = useMemo(() => {
  //   if (!selectedDistrict || !districtData) {
  //     return [];
  //   }

  //   return _.uniqBy(
  //     districtData.filter((d) => d.district === selectedDistrict),
  //     "block"
  //   ).map((a) => {
  //     return {
  //       id: a.block,
  //       name: a.block,
  //     };
  //   });
  // }, [selectedDistrict, districtData]);

  // const clusters = useMemo(() => {
  //   if (!selectedBlock || !districtData) {
  //     return [];
  //   }
  //   return _.uniqBy(
  //     districtData.filter((d) => d.block === selectedBlock),
  //     "cluster"
  //   ).map((a) => {
  //     return {
  //       id: a.cluster,
  //       name: a.cluster,
  //     };
  //   });
  // }, [selectedBlock, districtData]);

  // Input Constraints
  const inputConstraints = {
    // userName: [required("Please provide username"), number("The username must be numeric")],
    // udise: [required("Please provide UDISE"), number("The UDISE must be numeric"), udiseSchoolCheck],
    fullName: [required("Please provide fullname"), regex(/^[a-zA-Z0-9 ]*$/, "Name can only contain alphabets, numbers and spaces")],
    // mobile: [required("Please provide mobile number"), number("Mobile must be numeric"), minLength(10), maxLength(10)],
    session: required("Please select session"),
    district: required("Please select a district"),
    block: required("Please select a block"),
    cluster: required("Please select a cluster"),
    type: required("Please select type"),
    coord: [required("Please enter a valid co-ordinate"), regex(/^[1-9]\d*(\.\d+)?$/, "Please enter a valid co-ordinate")]
  }

  const { districts, blocks, clusters } = getLocationDetails();

  return (
    <Edit mutationMode={"pessimistic"}>
      <SimpleForm>
        {/* <ReferenceInput source="id" reference="location">
          <SelectInput disabled optionText={"id"} />
        </ReferenceInput> */}
        <TextInput source="name" validate={inputConstraints.fullName} />
        <SelectInput source="session" label="Session" choices={["S", "W"].map(el => { return { id: el, name: el } })} validate={inputConstraints.session} />
        <SelectInput source="type" label="Type" choices={["GPS", "GMS", "GHS", "GSSS"].map(el => { return { id: el, name: el } })} validate={inputConstraints.type} />
        <NumberInput source="udise" disabled />
        <NumberInput source="enroll_count" disabled />
        <BooleanInput source="is_active" />
        <TextInput source="latitude" validate={inputConstraints.coord} />
        <TextInput source="longitude" validate={inputConstraints.coord} />
        <SelectInput
          label="District"
          key={"district"}
          onChange={(e: any) => {
            setSelectedDistrict(e.target.value);
            setSelectedBlock(null);
            setSelectedCluster(null);
          }}
          value={selectedDistrict}
          source="location.district"
          choices={districts}
          validate={inputConstraints.district}
          disabled
        />
        <SelectInput
          label="Block"
          onChange={(e) => {
            setSelectedBlock(e.target.value);
            setSelectedCluster(null);
          }}
          value={selectedBlock}
          source="location.block"
          choices={blocks}
          validate={inputConstraints.block}
          disabled
        />
        <SelectInput
          label="Cluster"
          onChange={(e) => setSelectedCluster(e.target.value)}
          value={selectedCluster}
          source="location.cluster"
          validate={inputConstraints.cluster}
          choices={clusters}
          disabled
        />
      </SimpleForm>
    </Edit>
  );
};
export default SchoolEdit;
