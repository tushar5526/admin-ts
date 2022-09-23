import SchoolIcon from "@mui/icons-material/Map";

import LocationList from "./LocationList";
import LocationEdit from "./LocationEdit";
import LocationShow from "./LocationShow";
import LocationCreate from "./LocationCreate";

export default {
  list: LocationList,
  edit: LocationEdit,
  icon: SchoolIcon,
  show: LocationShow,
  create: LocationCreate,
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
};
