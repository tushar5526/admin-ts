import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";

import {
  useTranslate,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";

import { useTheme } from "@mui/material";
import MenuOptions from "./MenuOptions";

type MenuName = "menuCatalog" | "menuSales" | "menuCustomers";

const Menu = ({ dense = false }: MenuProps) => {
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
        width: open ? 250 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      {MenuOptions.map((option) => {
        return (
          <MenuItemLink
            key={option.name}
            to={`/${option.resource}`}
            state={{ _scrollToTop: true }}
            primaryText={translate(option.name, {
              smart_count: 2,
            })}
            dense={dense}
            style={{
            }}
          />
        );
      })}
    </Box>
  );
};

export default Menu;
