import {
  Labeled,
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
    const yesBool = isBoolean(selectedStatus);
    if (!yesBool || !studentData) {
      return [];
    }
    return _.uniqBy(
      studentData.filter((d) => d.is_enabled === selectedStatus),
      "grade_number"
    ).map((a) => {
      return {
        id: a.grade_number,
        name: a.grade_number,
      };
    });
  }, [selectedStatus, studentData]);

  const streams = useMemo(() => {
    if (!selectedGrade || !studentData) {
      return [];
    }
    return _.uniqBy(
      studentData.filter((d) => d.grade_number === selectedGrade),
      "stream_tag"
    ).map((a) => {
      return {
        id: a.stream_tag,
        name: a.stream_tag,
      };
    });
  }, [selectedGrade, studentData]);

  const category = useMemo(() => {
    if (!selectedStream || !studentData) {
      return [];
    }
    return _.uniqBy(
      studentData.filter((d) => d.stream_tag === selectedStream),
      "category"
    ).map((a) => {
      return {
        id: a.category,
        name: a.category,
      };
    });
  }, [selectedStream, studentData]);

  const cwsn = useMemo(() => {
    if (!selectedCategory || !studentData) {
      return [];
    }
    return _.uniqBy(
      studentData.filter((d) => d.category === selectedCategory),
      "is_cwsn"
    ).map((a) => {
      return {
        id: a.is_cwsn,
        name: a.is_cwsn,
      };
    });
  }, [selectedCategory, studentData]);

  const gender = useMemo(() => {
    const yesBool = isBoolean(selectedCwsn);
    if (!yesBool || !studentData) {
      return [];
    }
    return _.uniqBy(
      studentData.filter((d) => d.is_cwsn === selectedCwsn),
      "gender"
    ).map((a) => {
      return {
        id: a.gender,
        name: a.gender,
      };
    });
  }, [selectedCwsn, studentData]);

  const Filters = [
    <SearchInput placeholder="Name" source={"name"} alwaysOn key={"search"} />,
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
    />,
    selectedStatus === "" ? (
      <></>
    ) : (
      <SelectInput
        label="Grade"
        onChange={(e) => {
          setSelectedGrade(e.target.value);
          setSelectedStream(null);
          setSelectedCategory(null);
          setSelectedCwsn(null);
          setSelectedGender(null);
        }}
        value={selectedGrade}
        source="grade_number"
        choices={grade}
      />
    ),
    selectedGrade ? (
      <SelectInput
        label="Stream"
        onChange={(e) => {
          setSelectedStream(e.target.value);
          setSelectedCategory(null);
          setSelectedCwsn(null);
          setSelectedGender(null);
        }}
        value={selectedStream}
        source="stream_tag"
        choices={streams}
      />
    ) : (
      <></>
    ),
    selectedStream ? (
      <SelectInput
        label="Category"
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setSelectedCwsn(null);
          setSelectedGender(null);
        }}
        value={selectedCategory}
        source="category"
        choices={category}
      />
    ) : (
      <></>
    ),
    selectedCategory ? (
      <SelectInput
        label="cwsn"
        onChange={(e) => {
          setSelectedCwsn(e.target.value);
          setSelectedGender(null);
        }}
        value={selectedCwsn}
        source="is_cwsn"
        choices={cwsn}
      />
    ) : (
      <></>
    ),
    selectedCwsn === "" ? (
      <></>
    ) : (
      <SelectInput
        label="gender"
        onChange={(e) => {
          setSelectedGender(e.target.value);
        }}
        value={selectedGender}
        source="gender"
        choices={gender}
      />
    ),
  ];
  const StudentPagination = () => (
    <Pagination rowsPerPageOptions={[50, 75, 100]} />
  );
  return (
    //  <List filters={Filters} pagination={<StudentPagination />}>
    //   <Datagrid rowClick="edit"></Datagrid>
    <List filters={Filters} pagination={<StudentPagination />}>
      <Datagrid rowClick="show"  bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="name" />
        <ReferenceField  label="SCHOOL" source="school_id" reference="school">
          <TextField  source="name" />
        </ReferenceField>
        <ReferenceField label="UDISE" source="school_id" reference="school">
          <TextField source="udise" />
        </ReferenceField>
        <TextField source="father_name" />
        <TextField source="mother_name" />
        <TextField source="gender" />
        <NumberField source="grade_number" />
        <TextField source="stream_tag" />
        <TextField source="category" />
        <BooleanField source="is_cwsn" label={"CWSN"}/>
        <BooleanField source="is_enabled" label={"Enabled"}/>
        <EditButton/>
      </Datagrid>
    </List>
  );
};
export default StudentList;
