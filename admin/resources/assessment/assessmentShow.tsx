import {
  TextField,
  ReferenceField,
  DateField,
  BooleanField,
  NumberField,
  EditButton,
  Show,
  SimpleShowLayout,
  FunctionField,
} from "react-admin";
import { ListDataGridWithPermissions } from "../../components/lists";
import InputFlexWrapper from "../../StyleWrappers/InputFlexWrapper/InputFlexWrapper";
import ShowWrapper from "../../StyleWrappers/ShowWrapper/ShowWrapper";
import DownLabledInput from "../../components/utilities/DownLabledInput/DownLabledInput";
import { useState } from "react";

const AssessmentList = () => {
  return (
    <ShowWrapper
      astShow={{
        val: "",
      }}
      simpleShowProp={{
        val: "",
      }}
    >
      <FunctionField
        render={(record: any) => {
          return (
            <>
              <InputFlexWrapper>
                <DownLabledInput i={record.id} label="Id" />
                <DownLabledInput label="Type" i={record.type} />
                {/* <DateField source="start"/>
            <DateField source="end"/> */}
                <DownLabledInput
                  i={record.overall_pass_percentage}
                  label="Overall Pass Percentage"
                />{" "}
                <DownLabledInput
                  i={record.overall_total_marks}
                  label="Overall Total Marks"
                />
                {/* <TextField source="deadline_id"label="Deadline ID"/> */}
                <DownLabledInput
                  label="Submission Type"
                  i={record.submission_type}
                />
                <DownLabledInput
                  label="Evaluation Params"
                  i={record.evaluation_params}
                />
                <DownLabledInput label="Is Enabled" i={record.is_enabled} />
              </InputFlexWrapper>
            </>
          );
        }}
      />
    </ShowWrapper>
  );
};
export default AssessmentList;
