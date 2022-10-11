import React from "react";
import {
  FunctionField,
  ReferenceField,
  Show
} from "react-admin";
import InputFlexWrapper from "../../components/styleWrappers/InputFlexWrapper";
// import ShowWrapper from "../../components/styleWrappers/ShowWrapper";
// import DownLabledInput from "../../components/styleWrappers/DownLabledInput";
import CustomTextField from "../../components/styleWrappers/CustomTextField";

const GradeAssessmentShow = () => {
  return (
    <Show >
      <FunctionField
        render={(record: any) => {
          return (
            <>
              <InputFlexWrapper flex>
                <CustomTextField i={record.id} label="id" />
                <ReferenceField source="assessment_id" reference="assessment">
                  <FunctionField
                    render={(record: any) => (
                      <CustomTextField i={record.type} label="Type" />
                    )}
                  />
                </ReferenceField>
                <ReferenceField source="school_id" reference="school">
                  <FunctionField
                    render={(record: any) => (
                      <CustomTextField i={record.name} label="School Name" />
                    )}
                  />
                </ReferenceField>

                <CustomTextField i={record.section} label="Section" />
                <CustomTextField i={record.grade_number} label="Grade Number" />
                <ReferenceField source="streams_id" reference="stream">
                  <FunctionField
                    render={(record: any) => (
                      <CustomTextField i={record.tag} label="Tag" />
                    )}
                  />
                </ReferenceField>
                <CustomTextField
                  i={record.created.split("T")[0]}
                  label="Created"
                />
                <CustomTextField
                  i={record.updated.split("T")[0]}
                  label="Updated"
                />
              </InputFlexWrapper>
            </>
          );
        }}
      />
    </Show>
  );
};

export default GradeAssessmentShow;
