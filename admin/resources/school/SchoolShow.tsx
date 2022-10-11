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

const SchoolShow = () => {
  return (
    <Show>
      <FunctionField
        render={(record: any) => {
          return (
            <>
              <InputFlexWrapper flex>
                <CustomTextField label="UDISE" i={record?.udise} />
                <ReferenceField
                  source="location_id"
                  label="District"
                  reference="location"
                >
                  <FunctionField
                    render={(record: any) => {
                      return (
                        <CustomTextField
                          label="District"
                          i={record?.district}
                        />
                      );
                    }}
                  />
                </ReferenceField>
                <ReferenceField
                  source="location_id"
                  label="Block"
                  reference="location"
                >
                  <FunctionField
                    render={(record: any) => {
                      return (
                        <CustomTextField label="Block" i={record?.block} />
                      );
                    }}
                  />
                </ReferenceField>

                <ReferenceField
                  source="location_id"
                  label="Cluster"
                  reference="location"
                >
                  <FunctionField
                    render={(record: any) => {
                      return (
                        <CustomTextField label="Cluster" i={record?.cluster} />
                      );
                    }}
                  />
                </ReferenceField>
              </InputFlexWrapper>
            </>
          );
        }}
      />
    </Show>
  );
};

export default SchoolShow;
