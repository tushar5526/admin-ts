import SchoolIcon from "@mui/icons-material/School";
import { ListGuesser } from "react-admin";
import GradeAssessmentEdit from "./GradeAssessmentEdit";
import GradeAssessmentList from "./GradeAssessmentList";
import GradeAssessmentShow from "./GradeAssessmentShow";

export default {
  list: GradeAssessmentList,
  edit: GradeAssessmentEdit,
  icon: SchoolIcon,
  show: GradeAssessmentShow,
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
};
