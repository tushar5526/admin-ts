import SchoolIcon from "@mui/icons-material/School";

import UserList from "./UserList";
import UserEdit from "./UserEdit";
import UserCreate from "./UserCreate";
import UserShow from "./UserShow";

export default {
  list: UserList,
  edit: UserEdit,
  create: UserCreate,
  permissions: {
    canEdit: ["Admin","school"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin","school"],
  },
};
