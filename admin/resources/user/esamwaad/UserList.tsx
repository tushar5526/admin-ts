import {BooleanField, Datagrid, List, NumberField, ReferenceField, TextField, FunctionField} from 'react-admin';
import {DisplayRoles} from "./UserEdit";

const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="username"/>
            <FunctionField
                label="Full Name"
                render={(record: any) => `${record.firstName} ${record.lastName}`}
            />;
            <NumberField source="mobilePhone" label="Mobile Phone"/>
            <FunctionField
                label="Full Name"
                render={(record: any) => `${record.firstName} ${record.lastName}`}
            />;
            <FunctionField
                label="Role"
                render={(record: any) => DisplayRoles(record)}
            />;

        </Datagrid>
    </List>
);
export default UserList;
