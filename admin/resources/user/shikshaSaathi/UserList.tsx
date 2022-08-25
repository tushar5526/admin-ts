import {FunctionField, Datagrid, List, NumberField, ReferenceField, TextField} from 'react-admin';
const ApplicationId = '1ae074db-32f3-4714-a150-cc8a370eafd1';
const displayRoles = (a: any) => {
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
            <TextField source="fullName"/>
            <NumberField source="mobilePhone" label="Mobile Phone"/>
            <FunctionField
                label="Role"
                render={record => displayRoles(record)}
            />;
        </Datagrid>
    </List>
);
export default UserList;
