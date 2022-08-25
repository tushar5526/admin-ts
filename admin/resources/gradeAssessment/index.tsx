import SchoolIcon from "@mui/icons-material/School";
import GradeAssessmentList from "./GradeAssessmentList";


export default {
  list: GradeAssessmentList,
  // edit: null,
  icon: SchoolIcon,
  permissions: {
    canEdit: ['Admin'],
    canDelete: ['Admin'],
    canCreate: ['Admin'],
    canList: ['Admin'],
  }
};
