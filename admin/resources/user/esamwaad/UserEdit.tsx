import {
    useNotify,
    Labeled,
    Edit,
    SimpleForm,
    FunctionField,
    TextInput,
    useRecordContext,
    useDataProvider,
    SelectInput, useResourceContext, ReferenceInput, AutocompleteInput, useGetList
} from 'react-admin';
import {designationLevels, getLevelFromDesignation} from "./designation";
import {useEffect, useMemo, useState} from "react";
import {Button, Input, Typography} from "@mui/material";
import {useMutation, useQuery} from "react-query";
import {useForm} from "react-hook-form";

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
    const resource = useResourceContext();
    const notify = useNotify();
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
    const form = useForm();
    useEffect(() => {
        refetch(value);
    }, [value])
    useEffect(() => {
        form.setValue('data.udise', data?.data?.udise);
        form.setValue('school', data?.data?.id);
        console.log(data?.data);
    }, [form, data])
    return <div style={{marginTop: '20px', minWidth: '300px'}}>
        <Typography>
            {
                data?.data?.name ? `School: ${data?.data?.name}` : (isLoading ? 'Loading...' : 'No School')
            }
        </Typography>
        <TextInput source={'data.udise'} label="UDISE" onChange={(e) => {
            setValue(e.target.value)
        }}/>
        <TextInput source={'school'} label="School" onChange={(e) => {
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
    const dataProvider = useDataProvider();
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
    return (

        <Edit>
            <SimpleForm onSubmit={(values) => {

                // We will get Form Values on submission
                notify(`Post updated successfully`);
                console.log(values);


            }}>
                <UserForm/>
            </SimpleForm>
        </Edit>)
};
export default UserEdit;
