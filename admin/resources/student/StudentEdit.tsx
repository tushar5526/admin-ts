import {
  TextInput,
  useDataProvider,
  BooleanInput,
  regex,
  SelectInput,
  FunctionField
} from "react-admin";
import EditWrapper from "../../components/styleWrappers/EditWrapper";
import { streams_choices } from "./StudentStreams";
import { useQuery } from "react-query";
import { useMemo, useState, useEffect, useRef } from "react";
import * as _ from "lodash";
import CustomTextField from "../../components/styleWrappers/CustomTextField";


const StudentForm = (record: any) => {

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

  const {
    data: _schoolData,
  } = useQuery(["sschool", "getList", {}], () =>
    dataProvider.getList("school", {
      pagination: { perPage: 10000, page: 1 },
      sort: { field: "id", order: "asc" },
      filter: {},
    })
  );

  const studentData = useMemo(() => {
    return _studentData?.data;
  }, [_studentData]);

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
  }, [studentData]);

  const firstRender = useRef(true);
  const [schoolName, setSchoolName] = useState("");
  const [udise, setUdise] = useState(0);
  const fetchSchoolData = async (udise: any) => {
    return await dataProvider.getList('school', {
      pagination: { perPage: 10000, page: 1 },
      sort: { field: 'id', order: 'asc' },
      filter: { udise: udise }
    })
  }

  useEffect(() => {
    fetchSchoolData(udise).then(res => {
      if (res?.data?.[0]?.name) {
        setSchoolName(res?.data?.[0]?.name);
      } else {
        setSchoolName("Invalid UDISE");
      }
    })
  }, [udise])
  const validateName = regex(/^([A-Za-z\s/]*)$/, 'Name should contain only letters, spaces and slashes.');
  const validateFatherName = regex(/^([A-Za-z\s/]*)$/, 'Father Name should contain only letters, spaces and slashes.');
  const validateMotherName = regex(/^([A-Za-z\s/]*)$/, 'Mother Name should contain only letters, spaces and slashes.');
  const grade = () => {
    let grades = [];
    for (let i = 1; i <= 12; i++) {
      grades[i] = { id: i, name: i };
    }
    return grades;
  }

  return (
    <>
      <span>Student Details</span>
      <TextInput source="id" disabled />
      <TextInput source="name" validate={validateName} />
      <FunctionField
        render={(record: any) => {
          return (
            <CustomTextField label="School Name" i={schoolName} customStyle={{ marginBottom: "15px", minWidth: "13rem", height: "3rem" }} />
          )
        }} />
      <FunctionField
        render={(record: any) => {
          useEffect(() => {
            if (firstRender.current) {
              setUdise(record?.school?.udise);
              firstRender.current = false;
              return;
            }
          })
          return (
            <TextInput source="school.udise" label="UDISE" disabled onChange={e => {
              setUdise(Number(e.target.value));
            }} />
          )
        }} />
      <TextInput source="father_name" validate={validateFatherName} />
      <TextInput source="mother_name" validate={validateMotherName} />
      <SelectInput source="gender" choices={[{ id: "M", name: "M" }, { id: "F", name: "F" }, { id: "N", name: "N" }]} />
      <SelectInput source="grade_number" choices={grade()} />
      <SelectInput source="stream_tag" choices={streams_choices} />
      <SelectInput source="category" choices={category} />
      <BooleanInput source="is_cwsn" />
      <BooleanInput source="is_enabled" />
    </>
  );
};
const StudentEdit = () => (
  <EditWrapper>
    <StudentForm />
  </EditWrapper>
);
export default StudentEdit;
