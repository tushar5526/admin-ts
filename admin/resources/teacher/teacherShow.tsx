import { TextField, ReferenceField, DateField, BooleanField, useRecordContext, FunctionField } from "react-admin";
import { ListDataGridWithPermissions } from "../../components/lists";
import DownLabledInput from "../../components/styleWrappers/DownLabledInput";
import InputFlexWrapper from "../../components/styleWrappers/InputFlexWrapper";
import ShowWrapper from "../../components/styleWrappers/ShowWrapper";

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
        <ShowWrapper>
            <FunctionField
                render={(record: any) => {
                    return (
                        <>
                            <InputFlexWrapper>
                                {" "}
                                <DownLabledInput i={record?.id} label={"ID"} />
                                <ReferenceField label="SCHOOL" source="school_id" reference="school">
                                    <FunctionField
                                        render={(record: any) => {
                                            return (
                                                <DownLabledInput i={record?.name} label={"School"} />
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
                                                <DownLabledInput i={record?.udise} label={"Udise"} />
                                            );
                                        }}
                                    />
                                </ReferenceField>
                                <DownLabledInput i={record?.employment} label={"Employment"} />
                                <DownLabledInput i={record?.designation} label={"Designation"} />
                                <DownLabledInput i={record?.account_status} label={"Account Status"} />
                            </InputFlexWrapper>
                        </>
                    );
                }}
            />
        </ShowWrapper >
    );
};
export default TeacherList;
