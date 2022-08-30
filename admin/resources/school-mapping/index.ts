import SchoolIcon from "@mui/icons-material/School";
import SchoolMappingList from "./SchoolMappingList";

export default {
  list: SchoolMappingList,
  icon: SchoolIcon,
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
};
