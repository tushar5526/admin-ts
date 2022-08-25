import SchoolIcon from "@mui/icons-material/School";

import StudentList from "./StudentList";
import StudentEdit from "./StudentEdit";

export default {
    list: StudentList,
    edit: StudentEdit,
    icon: SchoolIcon,
    permissions: {
        canEdit: ['Admin'],
        canDelete: ['Admin'],
        canCreate: ['Admin'],
        canList: ['Admin'],
    }
};
