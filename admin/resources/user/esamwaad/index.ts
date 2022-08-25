import SchoolIcon from "@mui/icons-material/School";

import UserList from "./UserList";
import UserEdit from "./UserEdit";

export default {
    list: UserList,
    edit: UserEdit,
    icon: SchoolIcon,
    permissions: {
        canEdit: ['Admin'],
        canDelete: ['Admin'],
        canCreate: ['Admin'],
        canList: ['Admin'],
    }
};
