import {
  Datagrid,
  EditButton,
  List,
  ShowButton,
  useResourceContext,
} from "react-admin";
import { usePermissions } from "ra-core";
import { ItemWithPermissionResolver } from "../layout/MenuOptions";

const ListDataGridWithPermissions = ({
  children,
  listProps,
  dataGridProps,
}: {
  children: any;
  listProps?: any;
  dataGridProps?: any;
}) => {
  const { permissions } = usePermissions();
  const resource = useResourceContext();
  const ResourceWithPermission = ItemWithPermissionResolver(
    permissions,
    resource
  );
  const _dataGridProps = dataGridProps
    ? JSON.parse(JSON.stringify(dataGridProps))
    : {};
  if (!ResourceWithPermission?.resourcePermissions?.canDelete) {
    _dataGridProps.bulkActionButtons = null;
  }

  return (
    <List {...(listProps || {})}>
      <Datagrid {...(_dataGridProps || {})}>
        {children}
        {ResourceWithPermission?.resourcePermissions?.canEdit && <EditButton />}
        {ResourceWithPermission?.resourcePermissions?.canList && <ShowButton />}
      </Datagrid>
    </List>
  );
};
export default ListDataGridWithPermissions;
