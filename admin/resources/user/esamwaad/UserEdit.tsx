import {
    useNotify,
    Labeled,
    Edit,
    SimpleForm,
    FunctionField,
    TextInput,
    useRecordContext,
    useDataProvider,
    SelectInput
} from 'react-admin';
import {designationLevels, getLevelFromDesignation} from "./designation";

const ApplicationId = 'f0ddb3f6-091b-45e4-8c0f-889f89d4f5da';


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
const UserForm = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider();

    console.log(dataProvider);
    return (
        <>
            <span>User Details</span>

            <TextInput source="username" disabled={true}/>
            <TextInput source="firstName" label="Full Name"/>
            <TextInput source="mobilePhone" label="Mobile Phone"/>
            <Labeled label="Roles">
                <FunctionField
                    label="Role"
                    render={record => displayRoles(record)}
                />
            </Labeled>
            <SelectInput source="designation" choices={designationLevels} />
        </>
    );
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
