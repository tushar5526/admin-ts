import {
    TextInput,
    useRecordContext,
    ReferenceInput,
    useDataProvider,
    SelectInput,
    Edit,
    SimpleForm,
} from "react-admin";
import {WithMyBlocks, WithMyClusters, WithMyDistricts} from "../../components/withAccesses";

export const SchoolEdit = () => {
    return <Edit mutationMode={"optimistic"}>
        <SimpleForm>
            <WithMyDistricts>
                {
                    (districts: any) => {
                        return <>Districts: {districts.length}</>
                    }
                }
            </WithMyDistricts>
            <WithMyBlocks district={"CHAMBA"}>
                {
                    (blocks: any) => {
                        return <>Hello: {blocks.length}</>
                    }
                }
            </WithMyBlocks>
            <WithMyClusters block={"CHAMBA"}>
                {
                    (clusters: any) => {
                        return <>Hello: {clusters.length}</>
                    }
                }
            </WithMyClusters>
            {/*<ReferenceInput source="id" reference="location">*/}
            {/*    <SelectInput disabled optionText={"id"}/>*/}
            {/*</ReferenceInput>*/}
            {/*<TextInput source="district"/>*/}
            {/*<TextInput source="block"/>*/}
            {/*<TextInput source="cluster"/>*/}
        </SimpleForm>
    </Edit>
};
export default SchoolEdit;
