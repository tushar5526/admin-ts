import SchoolIcon from "@mui/icons-material/School";
import { ListGuesser } from "react-admin";
import GradeAssessmentList from "./GradeAssessmentList";

export default {
  list: GradeAssessmentList,
  // edit: null,
  icon: SchoolIcon,
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
};
