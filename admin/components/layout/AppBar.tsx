import * as React from "react";
import { AppBar, Logout, UserMenu, useTranslate } from "react-admin";
import { Link } from "react-router-dom";
import {
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { forwardRef } from "react";


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
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText>{translate("pos.configuration")}</ListItemText>
        </MenuItem>
    );
});
const CustomUserMenu = () => (
    <UserMenu>
        <Logout />
    </UserMenu>
);

const CustomAppBar = (props: any) => {
    return (
        <AppBar
            {...props}
            elevation={1}
            userMenu={<CustomUserMenu />}
            sx={{
                ".RaUserMenu-userButton": {
                    backgroundColor: "#5a968b"
                }
            }}
        >
            <img id="samarth-logo" src="https://himachal.nic.in/WriteReadData/l892s/16_l892s/samarth-logo-v9---lowres-22244626.png" />
            <Typography sx={{flex: 1}}/>
        </AppBar>
    );
};

export default CustomAppBar;
