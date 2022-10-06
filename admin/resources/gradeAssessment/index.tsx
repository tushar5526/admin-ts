import SchoolIcon from "@mui/icons-material/School";
import { ListGuesser } from "react-admin";
import GradeAssessmentEdit from "./GradeAssessmentEdit";
import GradeAssessmentList from "./GradeAssessmentList";
import GradeAssessmentShow from "./GradeAssessmentShow";

export default {
  list: GradeAssessmentList,
<<<<<<< HEAD
  // edit: null,
=======
  edit: GradeAssessmentEdit,
  icon: SchoolIcon,
>>>>>>> ae47e25700e8d8c41f10b5529c8efc65734ca0c2
  show: GradeAssessmentShow,
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
};
