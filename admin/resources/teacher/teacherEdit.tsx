import { TextInput, ReferenceInput, SelectInput, ReferenceField } from "react-admin";
import EditWrapper from "../../StyleWrappers/EditWrapper";

const TeacherEdit = () => {
    const statusChoices = [
        {
            id: "PENDING",
            name: "Pending", //No Action Taken
            icon: "warning",
            color: "#FEC400",
        },
        {
            id: "REJECTED",
            name: "Rejected",
            icon: "pending_actions",
            color: "#F12B2C",
            templateId: "1007409368881000345",
            template:
                "Your registration request for e-Samvad has been rejected. Please contact your school head regarding this matter.\n\nSamagra Shiksha, Himachal Pradesh",
        },
        {
            id: "ACTIVE",
            name: "Active",
            icon: "inventory",
            color: "#29CC97",
            templateId: "1007578130357765332",
            template:
                "Your registration on e-Samvad has been approved. You can login to the app to access all the features.\n\nSamagra Shiksha, Himachal Pradesh",
        },
        {
            id: "DEACTIVATED",
            name: "Deactivated",
            icon: "real_estate_agent",
            color: "#cbcbcb",
        },
    ];
    return (
        <EditWrapper>
            <TextInput source="user_id" />
            <ReferenceField label="SCHOOL" source="school_id" reference="school">
                <TextInput source="name" />
            </ReferenceField>
            <ReferenceField label="UDISE" source="school_id" reference="school">
                <TextInput source="udise" />
            </ReferenceField>
            <TextInput label="Mode of employment" source="employment" />
            <TextInput label="Designation" source="designation" />
            <SelectInput label="Account Status" source="account_status" choices={statusChoices} emptyText="NULL"/>
        </EditWrapper>
    );
};
export default TeacherEdit;
