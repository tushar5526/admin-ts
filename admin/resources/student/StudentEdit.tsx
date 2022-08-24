import {Edit, SimpleForm, NullableBooleanInput, TextInput, useRecordContext, useDataProvider} from 'react-admin';

const StudentForm = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider();
    console.log(dataProvider)
    return <div>
        <TextInput source="name"/>
        <TextInput source="phone"/>
    </div>
}
const StudentEdit = () => (
    <Edit>
        <SimpleForm onSubmit={(values) => {
            // We will get Form Values on submission
            console.log(values);


        }}>
            <StudentForm/>
        </SimpleForm>
    </Edit>
);
export default StudentEdit;