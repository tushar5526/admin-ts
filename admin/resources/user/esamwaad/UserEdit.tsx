import {
  useNotify,
  Labeled,
  Edit,
  SimpleForm,
  FunctionField,
  TextInput,
  useRecordContext,
  useDataProvider,
  useResourceContext,
  useRedirect,
  useRefresh,
  useGetList,
} from "react-admin";
import { designationESamwaad, designationLevels } from "./designation";
import { useEffect, useMemo, useState } from "react";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { useController } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ChangePasswordButton } from "../ChangePasswordButton";

const ApplicationId = "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da";

export const DisplayRoles = (a: any) => {
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
          padding: "7px 10px",
          margin: "5px",
          color: "white",
          borderRadius: "25px",
          backgroundColor: "#5a968b",
          display: "inline-block",
        }}
        key={index}
      >
        {role}
      </span>
    );
  });
};

export const SchoolUDISEInput = () => {
  const record = useRecordContext();
  const [value, setValue] = useState(record?.data?.udise);
  const dataProvider = useDataProvider();
  const resource = useResourceContext();
  const { data, isLoading, refetch } = useQuery(
    ["getSchoolByUDISE", record.id],
    () => dataProvider.getSchoolByUDISE(resource, value)
  );
  const i = useController({ name: "data.school" });
  useEffect(() => {
    refetch(value);
  }, [value]);
  useEffect(() => {
    i.field.onChange(data?.data?.id);
  }, [data]);
  return (
    <div style={{ marginTop: "20px", minWidth: "300px" }}>
      <Typography>
        {data?.data?.name
          ? `School: ${data?.data?.name}`
          : isLoading
          ? "Loading..."
          : "No School"}
      </Typography>
      <TextInput
        source={"data.udise"}
        label="UDISE"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};
const SchoolModeUserForm = ({ record }: any) => {
  return (
    <>
      <TextInput source="username" disabled={true} />
      <TextInput source="firstName" label="Full Name" />
      <TextInput source="mobilePhone" label="Mobile Phone" />
      <Labeled label="Roles">
        <FunctionField
          label="Role"
          render={(record: any) => {
            return DisplayRoles(record);
          }}
        />
      </Labeled>

      <SchoolUDISEInput />
      <ChangePasswordButton record={record} />
    </>
  );
};

export const GQLForm = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const { data, isLoading, error, refetch } = useGetList("teacher", {
    filter: { user_id: record.id },
  });
  const [designation, setDesignation] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [employment, setEmployment] = useState("");
  useEffect(() => {
    if (data?.length) {
      setDesignation(data?.[0]?.designation);
      setAccountStatus(data?.[0]?.account_status);
      setEmployment(data?.[0]?.employment);
      designationInput.field.onChange(data?.[0]?.designation);
      accountStatusInput.field.onChange(data?.[0]?.account_status);
      employmentStatusInput.field.onChange(data?.[0]?.employment);
    }
  }, [data]);
  const designationInput = useController({ name: "designation" });
  const accountStatusInput = useController({ name: "account_status" });
  const employmentStatusInput = useController({ name: "employment" });
  return (
    <div>
      <div style={{ marginTop: "20px", minWidth: "300px" }}>
        <Labeled label={"Designation"}>
          <Select
            value={designation}
            style={{ minWidth: "300px" }}
            onChange={(e) => {
              setDesignation(e.target.value);
              designationInput.field.onChange(e.target.value);
            }}
          >
            {designationESamwaad.map((d, index) => {
              return (
                <MenuItem value={d.designation} key={index}>
                  {d.designation}
                </MenuItem>
              );
            })}
          </Select>
        </Labeled>
      </div>
      <div style={{ marginTop: "20px", minWidth: "300px" }}>
        <Labeled label={"Mode of Employment"}>
          <Select
            value={employment}
            style={{ minWidth: "300px" }}
            onChange={(e) => {
              setEmployment(e.target.value);
              employmentStatusInput.field.onChange(e.target.value);
            }}
          >
            {["Permanent", "Contractual"].map((d, index) => {
              return (
                <MenuItem value={d} key={index}>
                  {d}
                </MenuItem>
              );
            })}
          </Select>
        </Labeled>
      </div>
      <div style={{ marginTop: "20px", minWidth: "300px" }}>
        <Labeled label={"Account Status"}>
          <Select
            value={accountStatus}
            style={{ minWidth: "300px" }}
            onChange={(e) => {
              setAccountStatus(e.target.value);
              accountStatusInput.field.onChange(e.target.value);
            }}
          >
            {["ACTIVE", "DEACTIVATED", "PENDING", "REJECTED"].map(
              (d, index) => {
                return (
                  <MenuItem value={d} key={index}>
                    {d}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </Labeled>
      </div>
    </div>
  );
};
const NonSchoolModeUserForm = (record: any) => {
  return (
    <>
      <TextInput source="username" disabled={true} />
      <TextInput source="firstName" label="Full Name" />
      <TextInput source="mobilePhone" label="Mobile Phone" />
      <Labeled label="Roles">
        <FunctionField
          label="Role"
          render={(record: any) => DisplayRoles(record)}
        />
      </Labeled>
      <GQLForm />
      <SchoolUDISEInput />
      <ChangePasswordButton record={record} />
    </>
  );
};
const UserForm = () => {
  const record = useRecordContext();
  console.log(record, "this is record");
  const roles = useMemo(() => {
    if (record?.registrations) {
      const registration = record.registrations?.find(
        (r: any) => r.applicationId === ApplicationId
      );
      return registration?.roles;
    }
    return null;
  }, [record]);
  const schoolMode = useMemo(() => {
    if (roles?.length === 1) {
      return !!roles
        ?.map((r: string) => r.toLowerCase())
        .find((r: string) => r === "school");
    }
    return false;
  }, [roles]);
  if (schoolMode) return <SchoolModeUserForm record={record} />;
  return <NonSchoolModeUserForm record={record} />;
};

const UserEdit = () => {
  const notify = useNotify();
  const resource = useResourceContext();
  const dataProvider = useDataProvider();
  const redirect = useRedirect();

  const params = useParams();
  const refresh = useRefresh();

  const { mutate, isLoading } = useMutation(
    ["updateUser", params.id],
    (value) => dataProvider.updateUser(resource, value),
    {
      onSuccess: (data: any) => {
        refresh();
        redirect("/" + resource);
      },
      onError: (error: any) => {
        notify(error.toString(), { type: "error" });
      },
    }
  );
  return (
    <Edit>
      <SimpleForm
        onSubmit={(values) => {
          const _v: any = {
            mobilePhone: values["mobilePhone"],
            firstName: values["firstName"],
            fullName: values["firstName"],
            data: {
              phone: values["mobilePhone"],
              accountName: values["firstName"],
              school: values?.data.school,
              udise: values?.data.udise,
            },
            designation: values.designation,
            id: values.id,
            account_status: values.account_status,
            employment: values.employment,
          };
          _v["gql"] = {
            designation: _v.designation,
            cadre: _v.designation,
            school_id: values?.data.school,
            account_status: _v.account_status,
            employment: _v.employment,
          };
          mutate(_v);
          notify(`User updated successfully`, { type: "success" });
        }}
      >
        <UserForm />
      </SimpleForm>
    </Edit>
  );
};
export default UserEdit;
