import {Datagrid, List} from 'react-admin';
import {usePermissions} from "ra-core";
import {ItemWithPermissionResolver} from "../layout/MenuOptions";

const ListDataGridWithPermissions = ({
                                         children,
                                         listProps,
                                         dataGridProps
                                     }: { children: any, listProps?: any, dataGridProps?: any }) => {
    const {permissions} = usePermissions();
    const ResourceWithPermission = ItemWithPermissionResolver(permissions, 'e_samwaad_user')
    const _dataGridProps = dataGridProps ? JSON.parse(JSON.stringify(dataGridProps)) : {};
    if (!ResourceWithPermission?.resourcePermissions?.canDelete) {
        _dataGridProps.bulkActionButtons = null;
    }
    return <List {...(listProps || {})}>
        <Datagrid {...(_dataGridProps || {})}>
            {
                children
            }
        </Datagrid>
    </List>
}
export default ListDataGridWithPermissions;