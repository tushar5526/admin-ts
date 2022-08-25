import {
    Datagrid,
    List,
    SimpleList,
    TextField,
    FunctionField,
    ReferenceField,
} from "react-admin";

const SchoolList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField label="UDISE" source="udise"/>
                <ReferenceField source="location_id" reference="location">
                    <TextField label="District" source="district"/>
                </ReferenceField>
                <ReferenceField source="location_id" reference="location">
                    <TextField label="Block" source="block"/>
                </ReferenceField>{" "}
                <ReferenceField source="location_id" reference="location">
                    <TextField label="Cluster" source="cluster"/>
                </ReferenceField>
                {/*<FunctionField*/}
                {/*  label="Session"*/}
                {/*  render={(record: any) => {*/}
                {/*    const obj = config.schoolSession.find(*/}
                {/*      (elem) => elem.id === record.session*/}
                {/*    );*/}
                {/*    return obj?.name;*/}
                {/*  }}*/}
                {/*/>*/}
            </Datagrid>
        </List>
    );
};
export default SchoolList;
