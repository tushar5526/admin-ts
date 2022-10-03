import SchoolIcon from "@mui/icons-material/School";
import { ListGuesser } from "react-admin";
import GradeAssessmentList from "./GradeAssessmentList";
import GradeAssessmentShow from "./GradeAssessmentShow";

export default {
  list: GradeAssessmentList,
  // edit: null,
  show: GradeAssessmentShow,
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
};
