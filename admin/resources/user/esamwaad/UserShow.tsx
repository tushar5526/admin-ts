import React from "react";
import { useRecordContext } from "react-admin";
import {
  FunctionField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import InputFlexWrapper from "../../../StyleWrappers/InputFlexWrapper/InputFlexWrapper";
import ShowWrapper from "../../../StyleWrappers/ShowWrapper/ShowWrapper";
import DownLabledInput from "../../../components/utilities/DownLabledInput/DownLabledInput";

const ApplicationId = "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da";
const UserShow = () => {
  const DisplayRoles = (a: any) => {
    const registration = a.registrations?.find(
      (r: any) => r.applicationId === ApplicationId
    );
    if (!registration) {
      return <span>-</span>;
    }
    const { roles } = registration;
    return roles.map((role: any, index: number) => {
      return (
        <span
          style={{
            border: "1px solid rgba(224, 224, 224, 1)",
            padding: "5px",
            marginRight: "5px",
            marginBottom: "5px",
          }}
          key={index}
        >
          {role}
        </span>
      );
    });
  };

  return (
    <ShowWrapper>
      <FunctionField
        render={(record: any) => {
          return (
            <>
              <InputFlexWrapper>
                <DownLabledInput i={record?.username} />

                <DownLabledInput
                  label="Full Name"
                  i={`${record?.firstName} ${record?.lastName}`}
                />
                <DownLabledInput i={record?.mobilePhone} label="Mobile Phone" />
              </InputFlexWrapper>
            </>
          );
        }}
      />
      <FunctionField
        label="Role"
        render={(record: any) => DisplayRoles(record)}
      />
    </ShowWrapper>
  );
};

export default UserShow;
