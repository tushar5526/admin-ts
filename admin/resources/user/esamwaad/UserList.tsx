import {BooleanField, Datagrid,  List, NumberField, ReferenceField, TextField} from 'react-admin';

const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <NumberField source="firstName"/>
            <NumberField source="lastName"/>

        </Datagrid>
    </List>
);
export default UserList;