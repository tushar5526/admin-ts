import SchoolMappingList from "./SchoolMappingList";

export default {
  list: SchoolMappingList,
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"],
  },
};
