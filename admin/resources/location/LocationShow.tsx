import React from "react";
import { FunctionField, Show, SimpleShowLayout, TextField } from "react-admin";
import InputFlexWrapper from "../../components/styleWrappers/InputFlexWrapper";
import ShowWrapper from "../../components/styleWrappers/ShowWrapper";
import DownLabledInput from "../../components/styleWrappers/DownLabledInput";

const LocationShow = () => {
  return (
    <ShowWrapper>
      <FunctionField
        render={(record: any) => {
          return (
            <>
              <InputFlexWrapper>
                <DownLabledInput i={record.id} label="Id" />
                <DownLabledInput i={record.district} label="District" />
                <DownLabledInput i={record.block} label="Block" />
                <DownLabledInput i={record.cluster} label="Cluster" />
              </InputFlexWrapper>
            </>
          );
        }}
      />
    </ShowWrapper>
  );
};

export default LocationShow;
