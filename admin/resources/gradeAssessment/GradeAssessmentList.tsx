import {
  TextField,
  ReferenceField,
  DateField,
  TextInput,
  useDataProvider,
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

  const dataProvider = useDataProvider();

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

  const schoolData = useMemo(() => {
    return _schoolData?.data;
  }, [_schoolData]);
  console.log(schoolData, "schoolData");

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
    <TextInput label="School" source="school_id" key={"search"} />,
    <TextInput label="Grade Number" source="grade_number" key={"search"} />,
    <TextInput label="Udise" source="udise" key={"search"} />,
  ];
  return (
    <ListDataGridWithPermissions listProps={{ filters: Filters }}>
      <TextField source="id" />
      <TextField label={"Assessment"} source="assessment_id" />
      <TextField source="grade_number" />
      <TextField source="section" />
      <TextField source="school_id" />

      <ReferenceField label="Udise" source="school_id" reference="school">
        <TextField source="udise" />
      </ReferenceField>
      <TextField source="streams_id" />

      <DateField source="created" />
      <DateField source="updated" />
    </ListDataGridWithPermissions>
  );
};
export default GradeAssessmentList;
