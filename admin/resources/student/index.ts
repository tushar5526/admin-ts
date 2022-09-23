import SchoolIcon from "@mui/icons-material/School";

import StudentList from "./StudentList";
import StudentEdit from "./StudentEdit";
import StudentShow from "./StudentShow";

export default {
    list: StudentList,
    edit: StudentEdit,
    icon: SchoolIcon,
    show: StudentShow,
    permissions: {
        canEdit: ['Admin'],
        canDelete: ['Admin'],
        canCreate: ['Admin'],
        canList: ['Admin'],
    }
};
