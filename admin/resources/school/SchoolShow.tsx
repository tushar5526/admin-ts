import React from "react";
import {
  FunctionField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import InputFlexWrapper from "../../StyleWrappers/InputFlexWrapper/InputFlexWrapper";
import ShowWrapper from "../../StyleWrappers/ShowWrapper/ShowWrapper";
import DownLabledInput from "../../components/utilities/DownLabledInput/DownLabledInput";

const SchoolShow = () => {
  return (
    <ShowWrapper>
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
