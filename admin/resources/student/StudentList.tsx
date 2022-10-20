import {
  Labeled,
  NumberInput,
  Pagination,
  ReferenceInput,
  SearchInput,
  ShowButton,
  useDataProvider,
} from "react-admin";

import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
  TextInput,
  SelectInput,
} from "react-admin";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import * as _ from "lodash";
import { isBoolean } from "lodash";
import EditButtonWrapper from "../../components/styleWrappers/EditButtonWrapper";
import { getLocationDetails } from "../../utils/LocationDetailsHelper";
import { streams_choices } from "./StudentStreams";


const StudentList = () => {
  const location = useLocation();
  const params: any = new Proxy(new URLSearchParams(location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
  });
  const initialFilters = params.filter ? JSON.parse(params.filter) : null;
  const [selectedStatus, setSelectedStatus] = useState(
    initialFilters?.is_enabled || ""
  );
  const [selectedGrade, setSelectedGrade] = useState(
    initialFilters?.grade_number || ""
  );
  const [selectedStream, setSelectedStream] = useState(
    initialFilters?.stream_tag || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters?.category || ""
  );
  const [selectedCwsn, setSelectedCwsn] = useState(
    initialFilters?.is_cwsn || ""
  );
  const [selectedGender, setSelectedGender] = useState(
    initialFilters?.gender || ""
  );

  const dataProvider = useDataProvider();
  const {
    data: _studentData,
    isLoading,
    error,
  } = useQuery(["student", "getList", {}], () =>
    dataProvider.getList("student", {
      pagination: { perPage: 10000, page: 1 },
      sort: { field: "id", order: "asc" },
      filter: {},
    })
  );

  const studentData = useMemo(() => {
    return _studentData?.data;
  }, [_studentData]);

  const enabled = useMemo(() => {
    if (!studentData) {
      return [];
    }
    return _.uniqBy(studentData, "is_enabled").map((a) => {
      return {
        id: a.is_enabled,
        name: a.is_enabled,
      };
    });
  }, [studentData]);

  const grade = useMemo(() => {
    if (!studentData) {
      return [];
    }
    let grades = [];
    for(let i=1; i<=12; i++){
      grades[i] = { id : i , name : i};
    }
    return grades;
  }, [selectedStatus, studentData]);

  const streams = useMemo(() => {
    if (!studentData) {
      return [];
    }
    return _.uniqBy(studentData, "stream_tag").map((a) => {
      return {
        id: a.stream_tag,
        name: a.stream_tag,
      };
    });
  }, [selectedGrade, studentData]);

  const category = useMemo(() => {
    if (!studentData) {
      return [];
    }
    return _.uniqBy(studentData, "category").map((a) => {
      return {
        id: a.category,
        name: a.category,
      };
    });
  }, [selectedStream, studentData]);

  const cwsn = useMemo(() => {
    if (!studentData) {
      return [];
    }
    return _.uniqBy(studentData, "is_cwsn").map((a) => {
      return {
        id: a.is_cwsn,
        name: a.is_cwsn,
      };
    });
  }, [selectedCategory, studentData]);

  const gender = useMemo(() => {
    if (!studentData) {
      return [];
    }
    return _.uniqBy(studentData, "gender").map((a) => {
      return {
        id: a.gender,
        name: a.gender,
      };
    });
  }, [selectedCwsn, studentData]);

  const { districts, blocks, clusters } = getLocationDetails();

  const Filters = [
    <NumberInput label="ID" source="id" alwaysOn />,
    <TextInput label="UDISE" source="school#udise" key="search" />,
    <TextInput label="School Name" source="school#name" key={"search"} />,
    <SelectInput
      label="Grade"
      onChange={(e) => {
        setSelectedStatus(null);
        setSelectedGrade(e.target.value);
        setSelectedStream(null);
        setSelectedCategory(null);
        setSelectedCwsn(null);
        setSelectedGender(null);
      }}
      value={selectedGrade}
      source="grade_number"
      choices={grade}
    />,
    <SelectInput
      label="Status"
      key={"is_enabled"}
      onChange={(e: any) => {
        setSelectedStatus(e.target.value);
        setSelectedGrade(null);
        setSelectedStream(null);
        setSelectedCategory(null);
        setSelectedCwsn(null);
        setSelectedGender(null);
      }}
      value={selectedStatus}
      source="is_enabled"
      choices={enabled}
      isRequired={true}
    />,
    <SelectInput
      label="Stream"
      onChange={(e) => {
        setSelectedStatus(null);
        setSelectedGrade(null);
        setSelectedStream(e.target.value);
        setSelectedCategory(null);
        setSelectedCwsn(null);
        setSelectedGender(null);
      }}
      value={selectedStream}
      source="stream_tag"
      choices={streams_choices}
      isRequired={true}
    />,
    <SelectInput
      label="Category"
      onChange={(e) => {
        setSelectedStatus(null);
        setSelectedGrade(null);
        setSelectedStream(null);
        setSelectedCategory(e.target.value);
        setSelectedCwsn(null);
        setSelectedGender(null);
      }}
      value={selectedCategory}
      source="category"
      choices={category}
      isRequired={true}
    />,
    <SelectInput
      label="cwsn"
      onChange={(e) => {
        setSelectedStatus(null);
        setSelectedGrade(null);
        setSelectedStream(null);
        setSelectedCategory(null);
        setSelectedCwsn(e.target.value);
        setSelectedGender(null);
      }}
      value={selectedCwsn}
      source="is_cwsn"
      choices={cwsn}
      isRequired={true}
    />,
    <SelectInput
      label="gender"
      onChange={(e) => {
        setSelectedStatus(null);
        setSelectedGrade(null);
        setSelectedStream(null);
        setSelectedCategory(null);
        setSelectedCwsn(null);
        setSelectedGender(e.target.value);
      }}
      value={selectedGender}
      source="gender"
      choices={gender}
      isRequired={true}
    />,
    <SelectInput label="District" source="school#location#district" choices={districts} />,
    <SelectInput label="Block" source="school#location#block" choices={blocks} />,
    <SelectInput label="Cluster" source="school#location#cluster" choices={clusters} />,
  ];
  const StudentPagination = () => (
    <Pagination rowsPerPageOptions={[10, 50, 75, 100]} />
  );
  return (
    <List filters={Filters} pagination={<StudentPagination />}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="father_name" />
        <TextField source="school.name" label="School" />
        <TextField source="school.udise" label="UDISE" />
        <NumberField source="grade_number" />
        <TextField source="stream_tag" />
        <BooleanField source="is_cwsn" label={"CWSN"} />
        <TextField source="gender" label={"Gender"} />
        <TextField source="school.location.district" label="District" />
        <TextField source="school.location.block" label="Block" />
        <TextField source="school.location.cluster" label="Cluster" />
        <BooleanField source="is_enabled" label={"Enabled"} />
        <EditButtonWrapper />
      </Datagrid>
    </List>
  );
};
export default StudentList;
