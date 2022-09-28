import SchoolIcon from "@mui/icons-material/School";
import AssessmentList from "./assessmentList";

export default {
  list: AssessmentList,
  // edit: null,
  icon: SchoolIcon,
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
};
