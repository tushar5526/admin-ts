import SchoolIcon from "@mui/icons-material/School";
import { ListGuesser } from "react-admin";

import StudentList from "./MappingList";

export default {
    list: ListGuesser,
    icon: SchoolIcon,
    permissions: {
        canEdit: ['Admin'],
        canDelete: ['Admin'],
        canCreate: ['Admin'],
        canList: ['Admin'],
    }
};
