import {
  Show,
  FunctionField,
} from "react-admin";
import InputFlexWrapper from "../../components/styleWrappers/InputFlexWrapper";
import CustomTextField from "../../components/styleWrappers/CustomTextField";

const AssessmentList = () => {
  return (
    <Show>
      <FunctionField
        render={(record: any) => {
          return (
            <>
              <InputFlexWrapper flex>
                <CustomTextField i={record.id} label="Id" />
                <CustomTextField label="Type" i={record.type} />
                {/* <DateField source="start"/>
            <DateField source="end"/> */}
                <CustomTextField
                  i={record.overall_pass_percentage}
                  label="Overall Pass Percentage"
                />{" "}
                <CustomTextField
                  i={record.overall_total_marks}
                  label="Overall Total Marks"
                />
                {/* <TextField source="deadline_id"label="Deadline ID"/> */}
                <CustomTextField
                  label="Submission Type"
                  i={record.submission_type}
                />
                <CustomTextField
                  label="Evaluation Params"
                  i={record.evaluation_params}
                />
                <CustomTextField label="Is Enabled" i={record.is_enabled ? "True" : "False"} />
              </InputFlexWrapper>
            </>
          );
        }}
      />
    </Show>
  );
};
export default AssessmentList;
