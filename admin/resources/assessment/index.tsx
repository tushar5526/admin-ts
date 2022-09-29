import SchoolIcon from "@mui/icons-material/School";
import AssessmentList from "./assessmentList";
import AssessmentEdit from "./assessmentEdit";
import AssessmentShow from "./assessmentShow";

export default {
  list: AssessmentList,
  edit: AssessmentEdit,
  show: AssessmentShow,
  icon: SchoolIcon,
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
};
