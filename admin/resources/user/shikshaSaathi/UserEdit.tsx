import {Edit, SimpleForm,  TextInput, useRecordContext, useDataProvider} from 'react-admin';

const UserForm = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider();

    return <div>
        <TextInput source="name"/>
        <TextInput source="phone"/>
    </div>
}
const UserEdit = () => (
    <Edit>
        <SimpleForm onSubmit={(values) => {
            // We will get Form Values on submission
            console.log(values);


        }}>
            <UserForm/>
        </SimpleForm>
    </Edit>
);
export default UserEdit;