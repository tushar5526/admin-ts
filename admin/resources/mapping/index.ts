import SchoolIcon from "@mui/icons-material/School";
import MappingList from "./MappingList";

export default {
  list: MappingList,
  icon: SchoolIcon,
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
};
