import SchoolIcon from "@mui/icons-material/Map";

import LocationList from "./LocationList";
import LocationEdit from "./LocationEdit";

export default {
  list: LocationList,
  edit: LocationEdit,
  icon: SchoolIcon,
  permissions: {
    canEdit: ['Admin'],
    canDelete: ['Admin'],
    canCreate: ['Admin'],
    canList: ['Admin'],
  }
};
