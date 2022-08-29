import student from "../../resources/student";
import { Esamwaad } from "../../resources/user";
import ShikshaSaathi from "../../resources/user/shikshaSaathi";
import location from "../../resources/location";
import school from "../../resources/school";
import gradeAssessment from "../../resources/gradeAssessment";
import mapping from "../../resources/school-mapping";

const MenuOptions: any[] = [
  {
    name: "Student",
    resource: "student",
    props: student,
    permissions: ["Admin"],
  },
  {
    name: "E Samwaad Users",
    resource: "e_samwaad_user",
    props: Esamwaad,
    permissions: ["Admin"],
  },
  {
    name: "Shiksha Saathi Users",
    resource: "shiksha_saathi_user",
    props: ShikshaSaathi,
  },
  {
    name: "School",
    resource: "school",
    props: school,
  },
  {
    name: "Location",
    resource: "location",
    props: location,
  },
  {
    name: "Grade Assessment",
    resource: "gradeAssessment",
    props: gradeAssessment,
  },
  {
    name: "Assessment",
    resource: "assessment",
    props: gradeAssessment,
  },
  {
    name: "School Mapping For Monitoring",
    resource: "ss_school_allocation_data",
    props: mapping,
  },
];
export const MenuItemsWithPermissionResolver = (permissions: any) => {
  // Permissions are case In Sensitive
  if (permissions?.length) {
    return MenuOptions.filter((menuOption) => {
      return FilterWithMenuOption(permissions, menuOption);
    });
  }
  return [] as any[];
};
const FilterWithMenuOption = (permissions: string[], menuOption: any) => {
  let found = !menuOption?.permissions?.length;
  const ResourcePermissions: any = {
    canCreate: !!menuOption.props.permissions?.length,
    canDelete: !!menuOption.props.permissions?.length,
    canList: !!menuOption.props.permissions?.length,
    canEdit: !!menuOption.props.permissions?.length,
  };
  if (menuOption.props.permissions) {
    const _p = menuOption.props.permissions;
    for (let i in _p) {
      _p[i].forEach((permission: string) => {
        permissions.forEach((p: string) => {
          if (permission?.toLowerCase() === p.toLowerCase()) {
            ResourcePermissions[i] = true;
          }
        });
      });
    }
  }
  menuOption?.permissions?.forEach((permission: any) => {
    permissions.forEach((p: string) => {
      if (
        permission?.toLowerCase() === p.toLowerCase() &&
        ResourcePermissions.canList
      ) {
        found = true;
      }
    });
  });
  if (!ResourcePermissions.canEdit) {
    delete menuOption.props["edit"];
  }
  if (!ResourcePermissions.canCreate) {
    delete menuOption.props["create"];
  }
  if (!ResourcePermissions.canList) {
    delete menuOption.props["list"];
  }
  return found && menuOption.props
    ? { ...menuOption, resourcePermissions: ResourcePermissions }
    : false;
};
export const ItemWithPermissionResolver = (
  permissions: any,
  resource: string
) => {
  // Permissions are case In Sensitive
  if (permissions?.length && resource) {
    const menuOption = MenuOptions.find(
      (menuOption) =>
        menuOption.resource.toLowerCase() === resource.toLowerCase()
    );
    return FilterWithMenuOption(permissions, menuOption);
  }
  return null;
};
export default MenuOptions;
