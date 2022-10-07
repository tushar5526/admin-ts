import React from "react";
import {
  DateField,
  FunctionField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import InputFlexWrapper from "../../components/styleWrappers/InputFlexWrapper";
import ShowWrapper from "../../components/styleWrappers/ShowWrapper";
import DownLabledInput from "../../components/styleWrappers/DownLabledInput";

const GradeAssessmentShow = () => {
  return (
    <ShowWrapper
      show={{
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
                <DownLabledInput i={record.id} label="id" />
                <ReferenceField source="assessment_id" reference="assessment">
                  <FunctionField
                    render={(record: any) => (
                      <DownLabledInput i={record.type} label="Type" />
                    )}
                  />
                </ReferenceField>
                <ReferenceField source="school_id" reference="school">
                  <FunctionField
                    render={(record: any) => (
                      <DownLabledInput i={record.name} label="School Name" />
                    )}
                  />
                </ReferenceField>

                <DownLabledInput i={record.section} label="Section" />
                <DownLabledInput i={record.grade_number} label="Grade Number" />
                <ReferenceField source="streams_id" reference="stream">
                  <FunctionField
                    render={(record: any) => (
                      <DownLabledInput i={record.tag} label="Tag" />
                    )}
                  />
                </ReferenceField>
                <DownLabledInput
                  i={record.created.split("T")[0]}
                  label="Created"
                />
                <DownLabledInput
                  i={record.updated.split("T")[0]}
                  label="Updated"
                />
              </InputFlexWrapper>
            </>
          );
        }}
      />
    </ShowWrapper>
  );
};

export default GradeAssessmentShow;
