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
import { assessmentTypeChoices, gradeNumberChoices } from "../../utils/InputChoicesHelper";
import { getLocationDetails } from "../../utils/LocationDetailsHelper";

const GradeAssessmentList = () => {

  const { districts, blocks, clusters } = getLocationDetails();

  const Filters = [
    <TextInput label="UDISE" source="school#udise" key={"search"} alwaysOn />,
    <SelectInput label="Grade Number" source="grade_number" key={"search"} choices={gradeNumberChoices} />,
    <SelectInput source="assessment#type" label="Assessment Type" choices={assessmentTypeChoices} />,
    <SelectInput source="school#location#district" label="District" choices={districts} />,
    <SelectInput source="school#location#block" label="Block" choices={blocks} />,
    <SelectInput source="school#location#cluster" label="Cluster" choices={clusters} />
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
      <TextField source="school.udise" label="UDISE" />
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
