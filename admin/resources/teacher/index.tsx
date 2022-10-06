import SchoolIcon from "@mui/icons-material/School";
import TeacherEdit from "./teacherEdit";
import TeacherList from "./teacherList";
<<<<<<< HEAD

export default {
  list: TeacherList,
  // edit: null,
=======
import TeacherShow from "./teacherShow";

export default {
  list: TeacherList,
  edit: TeacherEdit,
  show: TeacherShow,
  icon: SchoolIcon,
>>>>>>> ae47e25700e8d8c41f10b5529c8efc65734ca0c2
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
};
