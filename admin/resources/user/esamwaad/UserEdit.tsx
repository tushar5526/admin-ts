import {
    useNotify,
    Labeled,
    Edit,
    SimpleForm,
    FunctionField,
    TextInput,
    useRecordContext,
    useDataProvider,
    SelectInput, useResourceContext, useRedirect, useRefresh,
} from 'react-admin';
import {designationLevels} from "./designation";
import {useEffect, useMemo, useState} from "react";
import {Button, Typography} from "@mui/material";
import {useMutation, useQuery} from "react-query";
import {useController} from "react-hook-form";
import {useParams} from "react-router-dom";

const ApplicationId = 'f0ddb3f6-091b-45e4-8c0f-889f89d4f5da';


export const DisplayRoles = (a: any) => {
    const registration = a.registrations?.find((r: any) => r.applicationId === ApplicationId);
    if (!registration) {
        return <span>-</span>
    }
    const {roles} = registration;
    return roles.map((role: any, index: number) => {
        return <span style={{
            border: '1px solid rgba(224, 224, 224, 1)',
            padding: '5px',
            marginRight: '5px',
            marginBottom: '5px'
        }} key={index}>{role}</span>
    })
}
export const ChangePasswordButton = ({record}: any) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const resource = useResourceContext();
    const {mutate, isLoading} = useMutation(
        ['changePassword', record.id],
        () => dataProvider.changePassword(resource, {
            loginId: record.username,
            password: resource === 'e_samwaad_user' ? 'himachal12345' : '1234abcd'
        }),
        {
            onSuccess: (data: any) => {
                notify(data?.data, {type: 'success'})
            },
            onError: (error: any) => {
                notify(error.toString(), {type: 'error'});
            }
        }
    );
    return <Button variant={'contained'} sx={{marginTop: '10px'}} onClick={() => mutate()} disabled={isLoading}>
        Change Password
    </Button>
}
export const SchoolUDISEInput = () => {
    const record = useRecordContext();
    const [value, setValue] = useState(record?.data?.udise);
    const dataProvider = useDataProvider();
    const resource = useResourceContext();
    const {data, isLoading, refetch} = useQuery(
        ['getSchoolByUDISE', record.id],
        () => dataProvider.getSchoolByUDISE(resource, value)
    );
    const i = useController({name: 'data.school'});
    useEffect(() => {
        refetch(value);
    }, [value])
    useEffect(() => {
        i.field.onChange(data?.data?.id);
    }, [data])
    return <div style={{marginTop: '20px', minWidth: '300px'}}>
        <Typography>
            {
                data?.data?.name ? `School: ${data?.data?.name}` : (isLoading ? 'Loading...' : 'No School')
            }
        </Typography>
        <TextInput source={'data.udise'} label="UDISE" onChange={(e) => {
            setValue(e.target.value)
        }}/>
    </div>
}
const SchoolModeUserForm = ({record}: any) => {
    return <>
        <TextInput source="username" disabled={true}/>
        <TextInput source="firstName" label="Full Name"/>
        <TextInput source="mobilePhone" label="Mobile Phone"/>
        <Labeled label="Roles">
            <FunctionField
                label="Role"
                render={(record: any) => DisplayRoles(record)}
            />
        </Labeled>
        <SchoolUDISEInput/>
        <ChangePasswordButton record={record}/>
    </>
}
const NonSchoolModeUserForm = (record: any) => {
    return <>
        <TextInput source="username" disabled={true}/>
        <TextInput source="firstName" label="Full Name"/>
        <TextInput source="mobilePhone" label="Mobile Phone"/>
        <Labeled label="Roles">
            <FunctionField
                label="Role"
                render={(record: any) => DisplayRoles(record)}
            />
        </Labeled>
        <SelectInput source="designation" choices={designationLevels}/>
    </>
}
const UserForm = () => {
    const record = useRecordContext();
    const roles = useMemo(() => {
        if (record?.registrations) {
            const registration = record.registrations?.find((r: any) => r.applicationId === ApplicationId);
            return registration?.roles;
        }
        return null;
    }, [record]);
    const schoolMode = useMemo(() => {
        if (roles?.length === 1) {
            return !!roles?.map((r: string) => r.toLowerCase()).find((r: string) => r === 'school');
        }
        return false;
    }, [roles]);
    if (schoolMode)
        return <SchoolModeUserForm record={record}/>;
    return <NonSchoolModeUserForm record={record}/>;
}

const UserEdit = () => {
    const notify = useNotify();
    const resource = useResourceContext();
    const dataProvider = useDataProvider();
    const redirect = useRedirect();

    const params = useParams();
    const refresh = useRefresh();

    const {mutate, isLoading} = useMutation(
        ['updateUser', params.id],
        (value) => dataProvider.updateUser(resource, value),
        {
            onSuccess: (data: any) => {
                refresh();
                redirect('/' + resource);
            },
            onError: (error: any) => {
                notify(error.toString(), {type: 'error'});
            }
        }
    );
    return (
        <Edit>
            <SimpleForm onSubmit={(values) => {
                const _v: any = {
                    mobilePhone: values['mobilePhone'],
                    firstName: values['firstName'],
                    fullName: values['firstName'],
                    data: {
                        phone: values['mobilePhone'],
                        accountName: values['firstName'],
                        school: values?.data.school,
                        udise: values?.data.udise,
                    },
                    designation: values.designation,
                    id: values.id,
                    account_status: values.account_status,
                    employment: values.employment,
                }
                _v['gql'] = {
                    designation: _v.designation,
                    cadre: _v.designation,
                    school_id: values?.data.id,
                    account_status: _v.account_status,
                    employment: _v.employment,
                };
                mutate(_v);
                notify(`Post updated successfully`, {type: "success"});
            }}>
                <UserForm/>
            </SimpleForm>
        </Edit>)
};
export default UserEdit;
