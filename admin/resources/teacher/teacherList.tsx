import {TextField, ReferenceField, DateField, BooleanField, useRecordContext} from "react-admin";
import {ListDataGridWithPermissions} from "../../components/lists";
import {Chip} from "@mui/material";

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
const ColoredChipField = (props:any) => {
    const record = useRecordContext();

    let data = statusChoices.find(
        (elem) => elem.id === record[props.source]
    );
    return (
        <Chip
            style={{backgroundColor: data?.color, color: "#FFF"}}
            label={data?.name}
        />
    );
};


const TeacherList = () => {
    return (
        <ListDataGridWithPermissions>
            <ReferenceField source="user_id" reference="user">
                <TextField label="Username" source="username"  />
            </ReferenceField>

            {/*<TextField*/}
            {/*    label="Employee Name"*/}
            {/*    source="user.first_name"*/}
            {/*    sortable={false}*/}
            {/*/>*/}
            {/*<TextField*/}
            {/*    label="Contact Number"*/}
            {/*    source="user.mobile_phone"*/}
            {/*    sortable={false}*/}
            {/*/>*/}
            <TextField label="Mode of employment" source="employment"/>
            <TextField label="Designation" source="designation"/>
            <ColoredChipField label="Account Status" source="account_status"/>
        </ListDataGridWithPermissions>
    );
};
export default TeacherList;
