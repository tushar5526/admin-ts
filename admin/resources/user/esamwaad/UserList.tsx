import {BooleanField, Datagrid, List, NumberField, ReferenceField, TextField, FunctionField} from 'react-admin';

const ApplicationId = 'f0ddb3f6-091b-45e4-8c0f-889f89d4f5da';
const DisplayRoles = (a: any) => {
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
const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="username"/>
            <FunctionField
                label="Full Name"
                render={record => `${record.firstName} ${record.lastName}`}
            />;
            <NumberField source="mobilePhone" label="Mobile Phone"/>
            <FunctionField
                label="Full Name"
                render={record => `${record.firstName} ${record.lastName}`}
            />;
            <FunctionField
                label="Role"
                render={record => DisplayRoles(record)}
            />;

        </Datagrid>
    </List>
);
export default UserList;
