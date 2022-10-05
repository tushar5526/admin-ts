import {
  TextField,
  ReferenceField,
  DateField,
  BooleanField,
  NumberField,
  Show,
  SimpleShowLayout,
  FunctionField,
} from "react-admin";
import { ListDataGridWithPermissions } from "../../components/lists";
import InputFlexWrapper from "../../components/styleWrappers/InputFlexWrapper";
import ShowWrapper from "../../components/styleWrappers/ShowWrapper";
import DownLabledInput from "../../components/styleWrappers/DownLabledInput";

const AssessmentShow = () => {
  return (
    <ShowWrapper>
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
export default AssessmentShow;
