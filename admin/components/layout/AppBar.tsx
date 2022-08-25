import * as React from "react";
import {AppBar, Logout, UserMenu, useTranslate} from "react-admin";
import {Link} from "react-router-dom";
import {
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import {forwardRef} from "react";


// eslint-disable-next-line react/display-name
const ConfigurationMenu = forwardRef((props, ref) => {
    const translate = useTranslate();
    return (
        <MenuItem
            component={Link}
            // @ts-ignore
            ref={ref}
            {...props}
            to="/configuration"
        >
            <ListItemIcon>
                <SettingsIcon/>
            </ListItemIcon>
            <ListItemText>{translate("pos.configuration")}</ListItemText>
        </MenuItem>
    );
});
const CustomUserMenu = () => (
    <UserMenu>
        <Logout/>
    </UserMenu>
);

const CustomAppBar = (props: any) => {
    return (
        <AppBar
            {...props}
            color="secondary"
            elevation={1}
            userMenu={<CustomUserMenu/>}
        >
            <Typography
                variant="h6"
                color="inherit"
                sx={{
                    flex: 1,
                }}
                id="react-admin-title"
            />
        </AppBar>
    );
};

export default CustomAppBar;
