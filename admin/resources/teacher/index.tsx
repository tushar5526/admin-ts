import SchoolIcon from "@mui/icons-material/School";
import TeacherList from "./teacherList";


export default {
  list: TeacherList,
  // edit: null,
  icon: SchoolIcon,
  permissions: {
    canEdit: ['Admin'],
    canDelete: ['Admin'],
    canCreate: ['Admin'],
    canList: ['Admin'],
  }
};
