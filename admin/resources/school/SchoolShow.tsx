import React from "react";
import {
  FunctionField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import InputFlexWrapper from "../../components/styleWrappers/InputFlexWrapper";
import ShowWrapper from "../../components/styleWrappers/ShowWrapper";
import DownLabledInput from "../../components/styleWrappers/DownLabledInput";

const SchoolShow = () => {
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
                <DownLabledInput label="UDISE" i={record?.udise} />
                <ReferenceField
                  source="location_id"
                  label="District"
                  reference="location"
                >
                  <FunctionField
                    render={(record: any) => {
                      return (
                        <DownLabledInput
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
                        <DownLabledInput label="Block" i={record?.block} />
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
                        <DownLabledInput label="Cluster" i={record?.cluster} />
                      );
                    }}
                  />
                </ReferenceField>
              </InputFlexWrapper>
            </>
          );
        }}
      />
    </ShowWrapper>
  );
};

export default SchoolShow;
