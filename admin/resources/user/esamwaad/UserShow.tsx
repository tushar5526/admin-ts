import React from "react";
import { useGetOne } from "react-admin";
import {
  FunctionField,
  Show,
} from "react-admin";
import InputFlexWrapper from "../../../components/styleWrappers/InputFlexWrapper";
// import ShowWrapper from "../../../components/styleWrappers/ShowWrapper";
// import DownLabledInput from "../../../components/styleWrappers/DownLabledInput";
import CustomTextField from "../../../components/styleWrappers/CustomTextField";

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
    console.log(roles, "roles");
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

  const getLocationDataByRecord = (id: any) => {
    const TEACHER = "teacher";
    //@ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: teacher } = useGetOne("teacher", { user_id: id });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: school } = useGetOne("school", {
      //@ts-ignore
      school_id: teacher?.school_id,
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: location } = useGetOne("location", {
      //@ts-ignore
      id: school?.location_id,
    });
    return location;
  };
  const getCorrespondingTeacherDistrict = (record: any) => {
    const location = getLocationDataByRecord(record?.id);

    return location?.district;
  };

  const getCorrespondingTeacherBlock = (record: any) => {
    const location = getLocationDataByRecord(record?.id);

    return location?.block;
  };

  const getCorrespondingTeacherCluster = (record: any) => {
    const location = getLocationDataByRecord(record?.id);

    return location?.cluster;
  };

  return (
    <Show>
      <FunctionField
        render={(record: any) => {
          const block = getCorrespondingTeacherBlock(record);
          const district = getCorrespondingTeacherDistrict(record);
          const cluster = getCorrespondingTeacherCluster(record);
          return (
            <>
              <InputFlexWrapper flex>
                <CustomTextField i={record?.username} />

                <CustomTextField
                  label="Full Name"
                  i={`${record?.firstName} ${record?.lastName}`}
                />
                <CustomTextField i={record?.mobilePhone} label="Mobile Phone" />
                <CustomTextField i={district} label="District" />
                <CustomTextField i={block} label="Block" />
                <CustomTextField i={cluster} label="Cluster" />
              </InputFlexWrapper>
            </>
          );
        }}
      />
      <FunctionField
        label="Role"
        render={(record: any) => {
          return DisplayRoles(record);
        }}
      />
    </Show>
  );
};

export default UserShow;
