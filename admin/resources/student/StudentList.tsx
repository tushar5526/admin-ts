import {BooleanField, Datagrid,  List, NumberField, ReferenceField, TextField} from 'react-admin';

const StudentList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <NumberField source="admission_number"/>
            <TextField source="category"/>
            <TextField source="father_name"/>
            <TextField source="gender"/>
            <NumberField source="grade_number"/>
            <TextField source="grade_year_mapping"/>
            <BooleanField source="is_cwsn"/>
            <BooleanField source="is_enabled"/>
            <TextField source="name"/>
            <TextField source="phone"/>
            <TextField source="roll"/>
            <ReferenceField source="school_id" reference="school">
                <TextField source={'name'}/>
            </ReferenceField>
            <TextField source="section"/>
            <TextField source="stream_tag"/>
        </Datagrid>
    </List>
);
export default StudentList;