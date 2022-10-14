import {
  TextField,
  ReferenceField,
  DateField,
  TextInput,
  useDataProvider,
  SearchInput,
  FunctionField,
  SelectInput,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { ListDataGridWithPermissions } from "../../components/lists";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";

const GradeAssessmentList = () => {
  const location = useLocation();
  const params: any = new Proxy(new URLSearchParams(location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
  });
  const initialFilters = params.filter ? JSON.parse(params.filter) : null;

  const [selectUdise, setSelectUdise] = useState(initialFilters?.udise || "");
  const [selectedDistrict, setSelectedDistrict] = useState(
    initialFilters?.district || ""
  );

  const [selectedBlock, setSelectedBlock] = useState(
    initialFilters?.block || ""
  );

  const dataProvider = useDataProvider();
  const { data: _districtData } = useQuery(["lcoation", "getList", {}], () =>
    dataProvider.getList("location", {
      pagination: { perPage: 10000, page: 1 },
      sort: { field: "id", order: "asc" },
      filter: {},
    })
  );

  const {
    data: _schoolData,
    isLoading,
    error,
  } = useQuery(["school", "getList", {}], () =>
    dataProvider.getList("school", {
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

  const displayDistrict = (a: any) => {
    const data = districtData?.filter((item: any, index: number) => {
      return item.id == a.id;
    })[0];

    return data?.district || "";
  };
  const displayBlock = (a: any) => {
    const data = districtData?.filter((item: any, index: number) => {
      return item.id == a.id;
    })[0];

    return data?.block || "";
  };
  const blocks = useMemo(() => {
    return _.uniqBy(districtData, "block").map((a) => {
      return {
        id: a.block,
        name: a.block,
      };
    });
  }, [districtData]);

  const schoolData = useMemo(() => {
    return _schoolData?.data;
  }, [_schoolData]);

  const school = useMemo(() => {
    if (!selectUdise || !schoolData) {
      return [];
    }
    return _.uniqBy(
      schoolData.filter((d) => d.udise === selectUdise),
      "udise"
    ).map((a) => {
      return {
        id: a.udise,
        name: a.udise,
      };
    });
  }, [selectUdise, schoolData]);

  const Filters = [
    <TextInput label="UDISE" source="school#udise" key={"search"} alwaysOn />,
    <TextInput label="Grade Number" source="grade_number" key={"search"} />,
    <TextInput source="assessment#type" label="Assessment Type" />
  ];

  return (
    <ListDataGridWithPermissions
      dataGridProps={{ rowClick: "show" }}
      listProps={{ filters: Filters }}
    >
      <TextField source="id" />
      <TextField label={"Assessment"} source="assessment_id" />
      <TextField source="grade_number" />
      <TextField source="section" />
      <TextField source="school_id" />
      <TextField source="assessment.type" label="Assessment Type" />
      <TextField source="school.udise" label="UDISE"/>
      <TextField source="school.location.district" label="District" />
      <TextField source="school.location.block" />
      <TextField source="school.location.cluster" />
      <TextField source="streams_id" />
      <DateField source="created" />
      <DateField source="updated" />
    </ListDataGridWithPermissions>
  );
};
export default GradeAssessmentList;
