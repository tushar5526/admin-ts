import React from "react";
import { FunctionField, Show } from "react-admin";
import InputFlexWrapper from "../../components/styleWrappers/InputFlexWrapper";
// import ShowWrapper from "../../components/styleWrappers/ShowWrapper";
// import DownLabledInput from "../../components/styleWrappers/DownLabledInput";
import CustomTextField from "../../components/styleWrappers/CustomTextField";

const LocationShow = () => {
  return (
    <Show>
      <FunctionField
        render={(record: any) => {
          return (
            <>
              <InputFlexWrapper flex>
                <CustomTextField i={record.id} label="Id" />
                <CustomTextField i={record.district} label="District" />
                <CustomTextField i={record.block} label="Block" />
                <CustomTextField i={record.cluster} label="Cluster" />
              </InputFlexWrapper>
            </>
          );
        }}
      />
    </Show>
  );
};

export default LocationShow;
