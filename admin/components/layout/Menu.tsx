import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";

import {
    useTranslate,
    MenuItemLink,
    MenuProps,
    useSidebarState,
} from "react-admin";

import {useTheme} from "@mui/material";
import MenuOptions, {MenuItemsWithPermissionResolver} from "./MenuOptions";
import {usePermissions} from "ra-core";

type MenuName = "menuCatalog" | "menuSales" | "menuCustomers";

const Menu = ({dense = false,}: MenuProps) => {
    const {permissions} = usePermissions();
    const [state, setState] = useState({
        menuCatalog: true,
        menuSales: true,
        menuCustomers: true,
    });
    const translate = useTranslate();
    const [open] = useSidebarState();

    const theme = useTheme();
    return (
        <Box
            sx={{
                marginLeft : -0.5,
                backgroundColor: "#d9d9d9",
                height: "100%",
                width: open ? 250 : 50,
                transition: (theme) =>
                    theme.transitions.create("width", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
            }}
        >
            {MenuItemsWithPermissionResolver(permissions).map((option) => {
                return (

                    <MenuItemLink
                        key={option.name}
                        to={`/${option.resource}`}
                        state={{_scrollToTop: true}}
                        primaryText={translate(option.name, {
                            smart_count: 2,
                        })}
                        dense={dense}
                        style={{}}
                    />
                );
            })}
        </Box>
    );
};

export default Menu;
