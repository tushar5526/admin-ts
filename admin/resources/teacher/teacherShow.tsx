import { ReferenceField, FunctionField, Show } from "react-admin";
// import { ListDataGridWithPermissions } from "../../components/lists";
import CustomTextField from "../../components/styleWrappers/CustomTextField";
// import DownLabledInput from "../../components/styleWrappers/DownLabledInput";
import InputFlexWrapper from "../../components/styleWrappers/InputFlexWrapper";
// import ShowWrapper from "../../components/styleWrappers/ShowWrapper";

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


const TeacherList = () => {
    return (
        <Show>
            <FunctionField
                render={(record: any) => {
                    return (
                        <>
                            <InputFlexWrapper flex>
                                {" "}
                                <CustomTextField i={record?.id} label={"ID"} />
                                <ReferenceField label="SCHOOL" source="school_id" reference="school">
                                    <FunctionField
                                        render={(record: any) => {
                                            return (
                                                <CustomTextField i={record?.name} label={"School"} />
                                            );
                                        }}
                                    />
                                </ReferenceField>
                                <ReferenceField
                                    label={"Udise"}
                                    source="school_id"
                                    reference="school"
                                >
                                    <FunctionField
                                        render={(record: any) => {
                                            return (
                                                <CustomTextField i={record?.udise} label={"Udise"} />
                                            );
                                        }}
                                    />
                                </ReferenceField>
                                <CustomTextField i={record?.employment} label={"Employment"} />
                                <CustomTextField i={record?.designation} label={"Designation"} />
                                <CustomTextField i={record?.account_status} label={"Account Status"} />
                            </InputFlexWrapper>
                        </>
                    );
                }}
            />
        </Show>
    );
};
export default TeacherList;
