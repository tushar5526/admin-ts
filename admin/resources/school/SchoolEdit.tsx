import {
  TextInput,
  ReferenceField,
  SelectInput,
  Edit,
  SimpleForm,
  BooleanInput,
} from "react-admin";
import EditWrapper from "../../components/styleWrappers/EditWrapper";
export const SchoolEdit = () => (
  <EditWrapper>
    <TextInput label="UDISE" source="udise" />
    <TextInput label="Name" source="name" />
    <TextInput label="Type" source="type" />
    <TextInput label="Session" source="session" />
    <ReferenceField
      source="location_id"
      label="District"
      reference="location"
    >
      <TextInput label="District" source="district" />
    </ReferenceField>
    <ReferenceField
      source="location_id"
      label="Block"
      reference="location"
    >
      <TextInput label="Block" source="block" />
    </ReferenceField>
    <ReferenceField
      source="location_id"
      label="Cluster"
      reference="location"
    >
      <TextInput label="Cluster" source="cluster" />
    </ReferenceField>
    {/* <FunctionInput
              label="Session"
              render={(record: any) => {
                const obj = config.schoolSession.find(
                  (elem: any) => elem.id === record.session
                );
                return obj?.name;
              }}
            /> */}
    <BooleanInput label="Active" source="is_active" />
  </EditWrapper>
);
export default SchoolEdit;
